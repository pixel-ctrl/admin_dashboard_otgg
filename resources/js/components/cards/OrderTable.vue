<template>
    <!-- Table -->
    <div class="bg-gray-800 rounded-lg shadow-xl">
        <table class="min-w-full divide-y divide-gray-700">
            <thead>
                <tr class="bg-gray-800">
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Product Names
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Customer
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Phone
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Email
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Address
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Total
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Shipping
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Payment Status
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Order Status
                    </th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-700">
                <tr v-if="loading" class="border-b border-gray-700">
                    <td colspan="14" class="text-center py-6 text-gray-400">Loading Orders...</td>
                </tr>
                <tr v-else-if="orders.length === 0" class="border-b border-gray-700">
                    <td colspan="14" class="justify-center text-center py-6 text-gray-400">No Orders found</td>
                </tr>
                <tr v-for="(order, index) in orders" :key="index" class="hover:bg-gray-700">
                    <td class="px-4 py-4 text-sm">{{ order.product }}</td>
                    <td class="px-4 py-4 text-sm">{{ order.customer }}</td>
                    <td class="px-4 py-4 text-sm text-gray-400">{{ order.date }}</td>
                    <td class="px-4 py-4 text-sm text-gray-400">{{ order.phone }}</td>
                    <td class="px-4 py-4 text-sm text-gray-400">{{ order.email }}</td>
                    <td class="px-4 py-4 text-sm text-gray-400">{{ order.address }}</td>
                    <td class="px-4 py-4 text-sm font-medium">${{ order.total }}</td>
                    <td class="px-4 py-4 text-sm">{{ order.shipping }}</td>
                    <td class="px-4 py-4 text-sm">
                        <span :class="{
                            'px-2 py-1 text-xs rounded-md': true,
                            'bg-teal-900 text-teal-300': order.paymentStatus === 'Paid',
                            'bg-purple-900 text-purple-300': order.paymentStatus === 'Pending'
                        }">
                            {{ order.paymentStatus }}
                        </span>
                    </td>
                    <td class="px-4 py-4 text-sm">
                        <span :class="{
                            'px-2 py-1 text-xs rounded-md': true,
                            'bg-orange-900 text-orange-300': order.orderStatus === 'Ready',
                            'bg-gray-900 text-gray-300': order.orderStatus === 'Shipped',
                            'bg-blue-900 text-blue-300': order.orderStatus === 'Delivered'
                        }">
                            {{ order.orderStatus }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4 text-gray-400 text-sm">
        <div class="flex items-center space-x-4">
            <span>Rows per page</span>
            <select v-model="rowsPerPageValue" @change="$emit('update:rowsPerPage', rowsPerPageValue)"
                class="bg-gray-800 text-gray-300 py-1 px-2 rounded border border-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500">
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
            </select>
            <span>Page {{ currentPageValue }} of {{ totalPages }}</span>
            <div class="flex space-x-1">
                <button @click="goToFirstPage" :disabled="currentPageValue === 1"
                    class="bg-gray-800 hover:bg-gray-700 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
                <button @click="goToPrevPage" :disabled="currentPageValue === 1"
                    class="bg-gray-800 hover:bg-gray-700 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button @click="goToNextPage" :disabled="currentPageValue === totalPages"
                    class="bg-gray-800 hover:bg-gray-700 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                <button @click="goToLastPage" :disabled="currentPageValue === totalPages"
                    class="bg-gray-800 hover:bg-gray-700 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderTable',
    props: {
        orders: {
            type: Array,
            required: true
        },
        selectAll: {
            type: Boolean,
            default: false
        },
        currentPage: {
            type: Number,
            default: 1
        },
        rowsPerPage: {
            type: Number,
            default: 10
        },
        totalOrders: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            selectAllValue: this.selectAll,
            currentPageValue: this.currentPage,
            rowsPerPageValue: this.rowsPerPage
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalOrders / this.rowsPerPageValue);
        },
        selectedCount() {
            return this.orders.filter(order => order.selected).length;
        }
    },
    watch: {
        selectAll(newVal) {
            this.selectAllValue = newVal;
        },
        currentPage(newVal) {
            this.currentPageValue = newVal;
        },
        rowsPerPage(newVal) {
            this.rowsPerPageValue = newVal;
        }
    },
    methods: {
        toggleSelectAll() {
            this.orders.forEach(order => {
                order.selected = this.selectAllValue;
            });
            this.$emit('update:selectAll', this.selectAllValue);
        },
        updateSelectAll() {
            // Check if all orders are selected
            const allSelected = this.orders.every(order => order.selected);
            if (this.selectAllValue !== allSelected) {
                this.selectAllValue = allSelected;
                this.$emit('update:selectAll', allSelected);
            }
        },
        goToFirstPage() {
            this.currentPageValue = 1;
            this.$emit('update:currentPage', 1);
        },
        goToPrevPage() {
            if (this.currentPageValue > 1) {
                this.currentPageValue--;
                this.$emit('update:currentPage', this.currentPageValue);
            }
        },
        goToNextPage() {
            if (this.currentPageValue < this.totalPages) {
                this.currentPageValue++;
                this.$emit('update:currentPage', this.currentPageValue);
            }
        },
        goToLastPage() {
            this.currentPageValue = this.totalPages;
            this.$emit('update:currentPage', this.totalPages);
        }
    }
};
</script>

<style scoped>
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>