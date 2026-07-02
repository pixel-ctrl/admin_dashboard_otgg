// This file would contain your API service functions
// It would make actual HTTP requests to your backend server

// Example using Axios
import axios from 'axios';

// Create axios instance with common config
const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Dashboard API functions
export const dashboardApi = {
    // Get daily stats (revenue, orders, visitors)
    getDailyStats: () => apiClient.get('/stats/daily'),

    // Get sales data for charts
    getSalesData: (period = 'yearly') => apiClient.get(`/sales/${period}`),

    // Get returns data
    getReturnsData: (period = 'jan-jun-22') => apiClient.get(`/returns/${period}`),

    // Get best selling products
    getBestSellingProducts: (limit = 10) => apiClient.get(`/products/bestselling?limit=${limit}`),
};

// Products API functions
export const productsApi = {
    getProducts: (page = 1, limit = 10) => apiClient.get(`/products?page=${page}&limit=${limit}`),
    getProduct: (id) => apiClient.get(`/products/${id}`),
    createProduct: (product) => apiClient.post('/products', product),
    updateProduct: (id, product) => apiClient.put(`/products/${id}`, product),
    deleteProduct: (id) => apiClient.delete(`/products/${id}`),
    updateStock: (id, stock) => apiClient.patch(`/products/${id}/stock`, { stock })
};

// Backend with Express (server.js)
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Products API endpoint
app.get('/products', (req, res) => {
  const products = Array(14).fill().map((_, i) => ({
    id: i + 1,
    name: 'Vision Blind Guard',
    archived: false,
    featured: true,
    price: 125.00,
    cost: 85.00,
    quantity: 200,
    category: 'Suspension',
    size: 'Standard',
    color: 'Black',
    width: '12.8"',
    height: '4.9"',
    material: 'Steel',
    condition: 'Brand New',
    date: '04/18/2025'
  }));
  
  res.json(products);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});