import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../views/Dashboard.vue'; // Placeholder - create actual views

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import('../views/Products.vue')
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('../views/Order.vue')
    },
    {
        path: '/customer',
        name: 'Customer',
        component: () => import('../views/Customer.vue')
    },
    {
        path: '/review',
        name: 'Review',
        component: () => import('../views/Review.vue')
    },
    {
        path: '/reports',
        name: 'Reports',
        component: () => import('../views/Reports.vue')
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path: '/messages',
        name: 'Messages',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path: '/support',
        name: 'Support',
        component: () => import('../views/Dashboard.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;