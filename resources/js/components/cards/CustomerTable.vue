<template>
    <!-- Table -->
    <div class="bg-gray-800 rounded-lg shadow-xl">
        <table class="min-w-full divide-y divide-gray-700">
            <thead>
                <tr class="bg-gray-800">
                    <th v-if="getColumnVisibility('name')" scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Name
                    </th>
                    <th v-if="getColumnVisibility('phone')" scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Phone
                    </th>
                    <th v-if="getColumnVisibility('email')" scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Email
                    </th>
                    <th v-if="getColumnVisibility('address')" scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Address</th>
                    <th v-if="getColumnVisibility('repeat')" scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Repeat</th>
                    <th v-if="getColumnVisibility('highestOrder')" scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                        @click="$emit('sort', 'highestOrder')">
                        Order</th>
                    <th v-if="getColumnVisibility('since')" scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                        @click="$emit('sort', 'since')">
                        Since
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
                <tr v-if="loading" class="border-b border-gray-700">
                    <td colspan="14" class="text-center py-6 text-gray-400">Loading products...</td>
                </tr>
                <tr v-else-if="paginatedCustomers.length === 0" class="border-b border-gray-700">
                    <td colspan="14" class="justify-center text-center py-6 text-gray-400">No products found</td>
                </tr>
                <tr v-for="(customer, index) in paginatedCustomers" :key="index" class="hover:bg-gray-750">
                    <td v-if="getColumnVisibility('name')" class="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{{
                        customer.name }}</td>
                    <td v-if="getColumnVisibility('phone')" class="px-4 py-4 text-sm text-gray-400">{{
                        customer.phone }}</td>
                    <td v-if="getColumnVisibility('email')" class="px-4 py-4 text-sm text-gray-400">{{
                        customer.email }}</td>
                    <td v-if="getColumnVisibility('address')" class="px-4 py-4 text-sm text-gray-400">{{
                        customer.address }}
                    </td>
                    <td v-if="getColumnVisibility('repeat')" class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {{ customer.repeat }}</td>
                    <td v-if="getColumnVisibility('highestOrder')"
                        class="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-medium">${{
                            customer.highestOrder }}</td>
                    <td v-if="getColumnVisibility('since')" class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{
                        customer.since }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <div class="group inline-block relative">
                            <button @click="$emit('toggle-action-menu', index)"
                                class="text-gray-400 hover:text-teal-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                            <!-- Dropdown menu -->
                            <div v-if="activeMenu === index"
                                class="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                                <div class="py-1">
                                    <a href="#" @click.prevent="$emit('edit-customer', customer)"
                                        class="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Edit</a>
                                    <a href="#" @click.prevent="$emit('issue-gift-card', customer)"
                                        class="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Issue
                                        Gift Card</a>
                                    <a href="#" @click.prevent="$emit('send-promo', customer)"
                                        class="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Send
                                        Promo</a>
                                    <a href="#" @click.prevent="handleDeleteCustomer(customer)"
                                        class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700">Delete</a>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-sm">
        <div class="text-gray-400">{{ selectedCount }} of {{ totalCustomers }} row(s) selected.</div>
        <div class="flex items-center space-x-4">
            <div class="flex items-center text-gray-300">
                <span>Rows per page</span>
                <select v-model="rowsPerPageModel" class="ml-2 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
            </div>
            <div class="text-gray-300">Page {{ currentPage }} of {{ totalPages }}</div>
            <div class="flex space-x-2">
                <button @click="$emit('go-to-first-page')"
                    class="p-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400" :disabled="currentPage === 1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
                <button @click="$emit('previous-page')"
                    class="p-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400" :disabled="currentPage === 1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button @click="$emit('next-page')" class="p-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400"
                    :disabled="currentPage === totalPages">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                <button @click="$emit('go-to-last-page')"
                    class="p-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400"
                    :disabled="currentPage === totalPages">
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
    name: 'CustomerTable',
    props: {
        customers: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        activeMenu: {
            type: Number,
            default: null
        },
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        rowsPerPage: {
            type: Number,
            required: true
        },
        selectAll: {
            type: Boolean,
            default: false
        },
        selectedCount: {
            type: Number,
            required: true
        },
        totalCustomers: {
            type: Number,
            required: true
        },
        paginatedCustomer: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        selectAllModel: {
            get() {
                return this.selectAll;
            },
            set(value) {
                this.$emit('update:selectAll', value);
            }
        },
        rowsPerPageModel: {
            get() {
                return this.rowsPerPage;
            },
            set(value) {
                this.$emit('update:rowsPerPage', value);
            }
        },
        paginatedCustomers() {
            return this.paginatedCustomer.length > 0 ? this.paginatedCustomer : this.customers;
        }
    },
    methods: {
        getColumnVisibility(key) {
            const column = this.columns.find(col => col.key === key);
            return column ? column.visible : true;
        },
        handleDeleteCustomer(customer) {
            // Emit the delete-customer event with the customer object
            this.$emit('delete-customer', customer);
        }
    },
    mounted() {
        // Set loading to false after component is mounted
        this.loading = false;
    }
};
</script>