<template>
    <DashboardLayout>
        <div class="p-6 bg-gray-900 min-h-screen">
            <!-- Dashboard Header -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-semibold dark:text-white">Dashboard Overview</h1>

                <div class="relative flex items-center">
                    <!-- Search Icon -->
                    <div class="absolute left-3 z-10 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <!-- Search Input -->
                    <input type="text" placeholder="Search for anything"
                        class="bg-gray-700/30 text-white px-4 py-2 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500" />

                    <!-- Notification Bell -->
                    <div class="ml-4 text-teal-500 cursor-pointer hover:text-teal-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatsCard title="Today's Revenue" value="" change="" isPositive color="teal"
                    @loaded="fetchRevenueData" />

                <StatsCard title="Today's Orders" value="" change="" :isPositive="false" color="teal"
                    @loaded="fetchOrdersData" />

                <StatsCard title="Today's Visitors" value="" change="" isPositive color="teal"
                    @loaded="fetchVisitorsData" />
            </div>

            <!-- Charts Row -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div class="col-span-2 bg-gray-800 rounded-lg p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-white">Sales Analytics</h2>
                        <div class="flex space-x-2">
                            <button v-for="period in ['Daily', 'Weekly', 'Monthly', 'Yearly']" :key="period" :class="[
                                'px-4 py-1 text-sm rounded-md transition',
                                selectedPeriod === period
                                    ? 'bg-gray-600 text-white'
                                    : 'text-gray-400 hover:text-white'
                            ]" @click="selectedPeriod = period">
                                {{ period }}
                            </button>
                        </div>
                    </div>
                    <div class="h-64">
                        <LineChart :chartData="salesChartData" />
                    </div>
                </div>

                <div class="bg-gray-800 rounded-lg p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-white">Returns</h2>
                        <div class="relative">
                            <select
                                class="bg-gray-700 text-gray-300 px-4 py-1 pr-8 text-sm rounded-md appearance-none focus:outline-none">
                                <option>Jan-Jun</option>
                                <option>Jul-Dec</option>
                            </select>
                            <div class="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="h-64">
                        <BarChart :chartData="returnsChartData" />
                    </div>
                </div>
            </div>

            <!-- Products Table -->
            <div class="bg-gray-800 rounded-lg p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-semibold text-white">Best Selling Products</h2>
                    <div class="flex space-x-4">
                        <div class="relative">
                            <select
                                class="bg-gray-700 text-gray-300 px-4 py-1 pr-8 text-sm rounded-md appearance-none focus:outline-none">
                                <option>Sort By: Relevance</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Sales: High to Low</option>
                            </select>
                            <div class="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <BestSellingProductTable :products="products" @fetch-products="fetchProducts" />
            </div>
        </div>
    </DashboardLayout>
</template>

<script>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import StatsCard from '../components/cards/StatsCard.vue';
import LineChart from '../components/charts/LineChart.vue';
import BarChart from '../components/charts/BarChart.vue';
import BestSellingProductTable from '../components/cards/BestSellingProductTable.vue';

export default {
    name: 'Dashboard',
    components: {
        DashboardLayout,
        StatsCard,
        LineChart,
        BarChart,
        BestSellingProductTable
    },
    data() {
        return {
            selectedPeriod: 'Yearly',
            products: [],
            salesChartData: {},
            returnsChartData: {}
        };
    },
    methods: {
        fetchRevenueData() {
            // API call to fetch real-time revenue data
        },

        fetchOrdersData() {
            // API call to fetch real-time orders data
        },

        fetchVisitorsData() {
            // API call to fetch real-time visitors data
        },

        fetchProducts() {
            // API call to fetch best selling products
        },

        fetchSalesData() {
            // API call to fetch sales chart data based on selected period
        },

        fetchReturnsData() {
            // API call to fetch returns chart data
        }
    },
    watch: {
        selectedPeriod() {
            this.fetchSalesData();
        }
    },
    created() {
        this.fetchProducts();
        this.fetchSalesData();
        this.fetchReturnsData();
    }
};
</script>