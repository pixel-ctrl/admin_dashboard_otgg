<template>
    <DashboardLayout>
        <div class="bg-gray-900 text-gray-200 rounded-lg p-6 w-full">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-semibold dark:text-white">Orders ({{ filteredOrders.length }})</h1>
                </div>
            </div>

            <div class="flex flex-wrap justify-end items-center mb-6 gap-4">
                <div class="relative">
                    <select v-model="statusFilter"
                        class="bg-gray-800 text-gray-300 py-2 px-4 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option value="all">All Orders</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Ready">Ready</option>
                    </select>
                </div>
                <div class="relative">
                    <select v-model="currentMonth"
                        class="bg-gray-800 text-gray-300 py-2 px-4 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option v-for="month in availableMonths" :key="month" :value="month">{{ month }}</option>
                    </select>
                </div>
            </div>

            <!-- Order Table Component -->
            <OrderTable 
                :orders="displayedOrders" 
                :select-all="selectAll" 
                :current-page="currentPage"
                :rows-per-page="rowsPerPage" 
                :total-orders="filteredOrders.length"
                @update:selectAll="selectAll = $event" 
                @update:currentPage="currentPage = $event"
                @update:rowsPerPage="rowsPerPage = $event" />
        </div>
    </DashboardLayout>
</template>

<script>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import OrderTable from '../components/cards/OrderTable.vue';

export default {
    name: 'Order',
    components: {
        DashboardLayout,
        OrderTable
    },
    data() {
        return {
            orders: [
                {
                    product: "Premium Leather Wallet + Handcrafted Pen Set",
                    customer: "Emily Johnson",
                    date: "April 2, 2025",
                    phone: "(555) 123-4567",
                    email: "emily.j@example.com",
                    address: "Quezon City, Philippines",
                    total: 89.95,
                    shipping: "Express (2-day)",
                    paymentStatus: "Paid",
                    orderStatus: "Shipped",
                    selected: false
                },
                {
                    product: "Vintage Mechanical Watch + Gift Box",
                    customer: "Michael Rodriguez",
                    date: "March 28, 2025",
                    phone: "(555) 987-6543",
                    email: "m.rodriguez@example.com",
                    address: "Quezon City, Philippines",
                    total: 249.99,
                    shipping: "Standard (5-7 days)",
                    paymentStatus: "Pending",
                    orderStatus: "Ready",
                    selected: false
                },
                {
                    product: "Artisan Coffee Subscription + Ceramic Mug",
                    customer: "Sarah Williams",
                    date: "April 5, 2025",
                    phone: "(555) 222-3333",
                    email: "sarah.w@example.com",
                    address: "Quezon City, Philippines",
                    total: 59.50,
                    shipping: "Premium (Next day)",
                    paymentStatus: "Paid",
                    orderStatus: "Delivered",
                    selected: false
                },
                {
                    product: "Handmade Leather Journal + Fountain Pen",
                    customer: "David Chen",
                    date: "March 30, 2025",
                    phone: "(555) 444-5555",
                    email: "d.chen@example.com",
                    address: "Quezon City, Philippines",
                    total: 129.95,
                    shipping: "Standard (5-7 days)",
                    paymentStatus: "Paid",
                    orderStatus: "Ready",
                    selected: false
                }
            ],
            selectAll: false,
            currentPage: 1,
            rowsPerPage: 10,
            statusFilter: 'all',
            currentMonth: 'April 2025',
            availableMonths: ['April 2025', 'March 2025', 'February 2025', 'January 2025'],
            showColumnsMenu: false
        };
    },
    computed: {
        filteredOrders() {
            let filtered = [...this.orders];

            // Filter by status if not "all"
            if (this.statusFilter !== 'all') {
                filtered = filtered.filter(order => order.orderStatus === this.statusFilter);
            }

            // Filter by month
            const month = this.currentMonth.split(' ')[0];
            filtered = filtered.filter(order => order.date.includes(month));

            return filtered;
        },
        displayedOrders() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.filteredOrders.slice(start, end);
        }
    },
    methods: {
        toggleColumnsMenu() {
            this.showColumnsMenu = !this.showColumnsMenu;
            // Additional code would go here to show/hide the columns menu dropdown
        },
        toggleSelectAll() {
            this.displayedOrders.forEach(order => {
                order.selected = this.selectAll;
            });
        }
    },
    watch: {
        statusFilter() {
            // Reset to page 1 when filters change
            this.currentPage = 1;
        },
        currentMonth() {
            this.currentPage = 1;
        },
        rowsPerPage() {
            this.currentPage = 1;
        }
    }
};
</script>