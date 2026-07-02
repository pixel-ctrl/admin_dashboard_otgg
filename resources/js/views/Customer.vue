<template>
    <DashboardLayout>
        <div class="bg-gray-900 text-gray-200 rounded-lg p-6 w-full">
            <!-- Header section -->
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-2xl font-semibold dark:text-white">Customers ({{ filteredCustomers.length }})</h1>
                </div>
            </div>

            <!-- Filter section -->
            <div class="flex flex-wrap justify-end items-center mb-6 gap-4">
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <button @click="toggleFilterDropdown"
                            class="bg-gray-800 text-gray-300 hover:bg-gray-700 py-2 px-4 rounded-lg flex items-center">
                            Filter Customers By
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div v-if="showFilterDropdown"
                            class="absolute left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                            <div class="py-2 px-4">
                                <div class="mb-2">
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Customer Type</label>
                                    <select v-model="filters.customerType"
                                        class="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-md px-3 py-2 text-sm">
                                        <option value="">All Types</option>
                                        <option value="retail">Retail</option>
                                        <option value="wholesale">Wholesale</option>
                                        <option value="enterprise">Enterprise</option>
                                    </select>
                                </div>
                                <div class="mb-2">
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Repeat Customer</label>
                                    <select v-model="filters.repeat"
                                        class="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded-md px-3 py-2 text-sm">
                                        <option value="">All</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div class="pt-2 flex justify-end">
                                    <button @click="applyFilters"
                                        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative">
                        <button @click="toggleCustomerTypeDropdown"
                            class="bg-gray-800 text-gray-300 hover:bg-gray-700 py-2 px-4 rounded-lg flex items-center">
                            {{ filters.customerType || 'All Types' }}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div v-if="showCustomerTypeDropdown"
                            class="absolute left-0 mt-2 w-40 bg-gray-800 text-gray-300 border border-gray-700 rounded-md shadow-lg z-10">
                            <div class="py-1">
                                <a href="#" @click.prevent="setCustomerTypeFilter('')"
                                    class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">All Types</a>
                                <a href="#" @click.prevent="setCustomerTypeFilter('retail')"
                                    class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Retail</a>
                                <a href="#" @click.prevent="setCustomerTypeFilter('wholesale')"
                                    class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Wholesale</a>
                                <a href="#" @click.prevent="setCustomerTypeFilter('enterprise')"
                                    class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Enterprise</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Customer Table Component -->
            <CustomerTable :customers="paginatedCustomers" :columns="columns" :active-menu="activeMenu"
                :current-page="currentPage" :total-pages="totalPages" :rows-per-page="rowsPerPage"
                :select-all="selectAll" :selected-count="selectedCount" :total-customers="filteredCustomers.length"
                @update:selectAll="selectAll = $event" @update:rowsPerPage="rowsPerPage = $event"
                @toggle-select-all="toggleSelectAll" @update-selected-count="updateSelectedCount" @sort="sortBy"
                @toggle-action-menu="toggleActionMenu" @edit-customer="editCustomer" @issue-gift-card="issueGiftCard"
                @send-promo="sendPromo" @delete-customer="openDeleteModal" @previous-page="previousPage"
                @next-page="nextPage" @go-to-first-page="goToFirstPage" @go-to-last-page="goToLastPage" />

            <!-- Add Customer Modal -->
            <AddCustomerModal v-if="showAddCustomerModal" :show="showAddCustomerModal" @close="closeAddCustomerModal"
                @customer-added="handleNewCustomer" />

            <!-- Delete Customer Modal -->
            <DeleteCustomerModal v-if="showDeleteModal" :show="showDeleteModal" :customer="customerToDelete"
                @close="closeDeleteModal" @confirm-delete="processDeleteCustomer" />
        </div>
    </DashboardLayout>
</template>

<script>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import AddCustomerModal from '../modal/AddCustomerModal.vue';
import DeleteCustomerModal from '../modal/DeleteCustomerModal.vue';
import CustomerTable from '../components/cards/CustomerTable.vue';

export default {
    name: 'Customer',
    components: {
        DashboardLayout,
        AddCustomerModal,
        DeleteCustomerModal,
        CustomerTable
    },
    data() {
        return {
            customers: [
                {
                    name: "John Doe",
                    phone: "(555) 123-4567",
                    email: "john.doe@example.com",
                    address: "123 Main Street, Apt 4B, Springfield, IL 62701, United States",
                    repeat: "5 times",
                    highestOrder: 149.99,
                    since: "Jan 15, 2023"
                },
                {
                    name: "Sarah Johnson",
                    phone: "(555) 987-6543",
                    email: "sarah.j@example.com",
                    address: "456 Oak Avenue, Suite 302, Riverdale, NY 10471, United States",
                    repeat: "12 times",
                    highestOrder: 299.50,
                    since: "Mar 3, 2022"
                },
                {
                    name: "Michael Chang",
                    phone: "(555) 555-1212",
                    email: "mchang@example.com",
                    address: "789 Elm Boulevard, Portland, OR 97201, United States",
                    repeat: "3 times",
                    highestOrder: 89.95,
                    since: "Aug 22, 2023"
                },
                {
                    name: "Emma Williams",
                    phone: "(555) 222-3333",
                    email: "emma.w@example.com",
                    address: "101 Pine Court, Apartment 15C, Austin, TX 78701, United States",
                    repeat: "8 times",
                    highestOrder: 249.99,
                    since: "Dec 5, 2022"
                },
            ],
            columns: [
                { key: 'phone', label: 'Phone', visible: true },
                { key: 'email', label: 'Email', visible: true },
                { key: 'address', label: 'Address', visible: true },
                { key: 'repeat', label: 'Repeat', visible: true },
                { key: 'highestOrder', label: 'Highest Order', visible: true },
                { key: 'since', label: 'Since', visible: true }
            ],
            filters: {
                customerType: '',
                repeat: ''
            },
            sortKey: 'name',
            sortOrder: 'asc',
            currentPage: 1,
            rowsPerPage: 10,
            selectAll: false,
            selectedCount: 0,
            showFilterDropdown: false,
            showCustomerTypeDropdown: false,
            showColumnsDropdown: false,
            activeMenu: null,
            showAddCustomerModal: false,
            showEditCustomerModal: false,
            showDeleteModal: false,
            customerToDelete: null,
            currentCustomer: null
        };
    },
    computed: {
        filteredCustomers() {
            let result = [...this.customers];

            // Apply filters
            if (this.filters.customerType) {
                result = result.filter(customer => customer.type === this.filters.customerType);
            }

            if (this.filters.repeat) {
                result = result.filter(customer => customer.repeat === this.filters.repeat);
            }

            // Apply sorting
            result.sort((a, b) => {
                let modifier = this.sortOrder === 'asc' ? 1 : -1;
                if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
                if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
                return 0;
            });

            return result;
        },
        paginatedCustomers() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.filteredCustomers.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredCustomers.length / this.rowsPerPage);
        }
    },
    methods: {
        sortBy(key) {
            if (this.sortKey === key) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortKey = key;
                this.sortOrder = 'asc';
            }
        },
        toggleFilterDropdown() {
            this.showFilterDropdown = !this.showFilterDropdown;
            if (this.showFilterDropdown) {
                this.showCustomerTypeDropdown = false;
                this.showColumnsDropdown = false;
                this.activeMenu = null;
            }
        },
        toggleCustomerTypeDropdown() {
            this.showCustomerTypeDropdown = !this.showCustomerTypeDropdown;
            if (this.showCustomerTypeDropdown) {
                this.showFilterDropdown = false;
                this.showColumnsDropdown = false;
                this.activeMenu = null;
            }
        },
        toggleColumnsDropdown() {
            this.showColumnsDropdown = !this.showColumnsDropdown;
            if (this.showColumnsDropdown) {
                this.showFilterDropdown = false;
                this.showCustomerTypeDropdown = false;
                this.activeMenu = null;
            }
        },
        toggleActionMenu(index) {
            if (this.activeMenu === index) {
                this.activeMenu = null;
            } else {
                this.activeMenu = index;
                this.showFilterDropdown = false;
                this.showCustomerTypeDropdown = false;
                this.showColumnsDropdown = false;
            }
        },
        setCustomerTypeFilter(type) {
            this.filters.customerType = type;
            this.showCustomerTypeDropdown = false;
            this.currentPage = 1; // Reset to first page when filtering
        },
        applyFilters() {
            this.showFilterDropdown = false;
            this.currentPage = 1; // Reset to first page when filtering
        },
        toggleSelectAll() {
            this.paginatedCustomers.forEach(customer => {
                customer.selected = this.selectAll;
            });
            this.updateSelectedCount();
        },
        updateSelectedCount() {
            this.selectedCount = this.customers.filter(customer => customer.selected).length;
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        goToFirstPage() {
            this.currentPage = 1;
        },
        goToLastPage() {
            this.currentPage = this.totalPages;
        },
        openAddCustomerModal() {
            this.showAddCustomerModal = true;
        },
        closeAddCustomerModal() {
            this.showAddCustomerModal = false;
        },
        handleNewCustomer(customer) {
            // Generate a new ID based on the highest current ID
            const newId = Math.max(...this.customers.map(c => c.id || 0)) + 1;
            customer.id = newId;
            customer.selected = false;

            // Add the new customer to the array
            this.customers.unshift(customer);
            this.closeAddCustomerModal();
        },
        editCustomer(customer) {
            this.currentCustomer = { ...customer }; // Create a copy to avoid direct modification
            this.showEditCustomerModal = true;
            this.activeMenu = null;
        },
        closeEditCustomerModal() {
            this.showEditCustomerModal = false;
            this.currentCustomer = null;
        },
        handleUpdatedCustomer(updatedCustomer) {
            // Find and update the customer in the array
            const index = this.customers.findIndex(c => c.id === updatedCustomer.id);
            if (index !== -1) {
                this.customers[index] = { ...updatedCustomer };
            }
            this.closeEditCustomerModal();
        },
        // New methods for delete modal
        openDeleteModal(customer) {
            this.customerToDelete = customer;
            this.showDeleteModal = true;
            this.activeMenu = null;
        },
        closeDeleteModal() {
            this.showDeleteModal = false;
            this.customerToDelete = null;
        },
        processDeleteCustomer(data) {
            // This is where you would implement the email sending logic in a real application
            console.log(`Customer ${data.customer.name} will be deleted with reason: ${data.reason}`);
            if (data.additionalMessage) {
                console.log(`Additional message sent: ${data.additionalMessage}`);
            }

            // Simulate sending email
            this.sendDeleteNotificationEmail(data.customer, data.reason, data.additionalMessage);

            // Actually delete the customer from array
            const index = this.customers.findIndex(c =>
                c.email === data.customer.email && c.name === data.customer.name
            );

            if (index !== -1) {
                this.customers.splice(index, 1);
            }

            // Close the modal and show success notification
            this.closeDeleteModal();
            this.showNotification(`${data.customer.name}'s account has been deleted and a notification email has been sent.`);
        },
        sendDeleteNotificationEmail(customer, reason, additionalMessage) {
            // In a real application, you would call your API to send an email
            console.log(`Sending email to ${customer.email}:`);
            console.log(`Subject: Your account has been deleted`);
            console.log(`Dear ${customer.name},\n\nWe regret to inform you that your account has been deleted for the following reason: ${reason}\n\n${additionalMessage ? additionalMessage + '\n\n' : ''}For any questions, please contact our support team.\n\nRegards,\nCustomer Support Team`);

            // This is just a placeholder. In a real app, you would call your backend API
            // return axios.post('/api/send-email', {
            //   to: customer.email,
            //   subject: 'Your account has been deleted',
            //   body: `Dear ${customer.name},\n\nWe regret to inform you that your account has been deleted for the following reason: ${reason}\n\n${additionalMessage ? additionalMessage + '\n\n' : ''}For any questions, please contact our support team.\n\nRegards,\nCustomer Support Team`
            // });
        },
        showNotification(message) {
            // Simple alert for now - in a real app you'd use a toast or notification component
            alert(message);
        },
        issueGiftCard(customer) {
            alert(`Gift card issued to ${customer.name}`);
            this.activeMenu = null;
        },
        sendPromo(customer) {
            alert(`Promo sent to ${customer.email}`);
            this.activeMenu = null;
        }
    },
    created() {
        // Add click outside listener
        document.addEventListener('click', this.handleOutsideClick = (e) => {
            // Close dropdowns when clicking outside
            if (!e.target.closest('.relative')) {
                this.showFilterDropdown = false;
                this.showCustomerTypeDropdown = false;
                this.showColumnsDropdown = false;
                this.activeMenu = null;
            }
        });
    },
    beforeUnmount() {
        // Remove event listener when component is destroyed
        document.removeEventListener('click', this.handleOutsideClick);
    }
};
</script>