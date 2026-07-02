<template>
    <DashboardLayout>
        <div class="bg-gray-900 text-gray-200 rounded-lg p-6 w-full">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-semibold dark:text-white">Reports ({{ reports.length }})</h1>
            </div>

            <!-- Search and Filters -->
            <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div class="relative">
                    <input type="text" v-model="searchQuery" placeholder="Search by subject..."
                        class="bg-gray-800/50 rounded-md py-2 px-4 pl-10 text-gray-200 w-64 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div class="relative">
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-400">Status:</span>
                        <select v-model="statusFilter"
                            class="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500">
                            <option value="all">All</option>
                            <option value="new">New</option>
                            <option value="received">Received</option>
                            <option value="resolved">Resolved</option>
                        </select>
                        <div
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reports Table Component -->
            <ReportsTable :loading="loading" :reports="filteredReports" @toggle-select="toggleSelect"  @respond="openResponseModal" @delete="deleteReports" />

            <!-- Pagination -->
            <div class="p-4 flex items-center justify-between border-t border-gray-800">
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-gray-400">Rows per page:</span>
                        <select v-model="rowsPerPage"
                            class="bg-gray-800/50 rounded-md py-1 px-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                    </div>

                    <div class="text-sm text-gray-400">
                        Page {{ currentPage }} of {{ totalPages }}
                    </div>

                    <div class="flex gap-1">
                        <button class="p-1 rounded hover:bg-gray-700" :disabled="currentPage === 1"
                            @click="goToFirstPage">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                        <button class="p-1 rounded hover:bg-gray-700" :disabled="currentPage === 1"
                            @click="previousPage">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button class="p-1 rounded hover:bg-gray-700" :disabled="currentPage === totalPages"
                            @click="nextPage">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button class="p-1 rounded hover:bg-gray-700" :disabled="currentPage === totalPages"
                            @click="goToLastPage">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>

<script>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import ReportsTable from '../components/cards/ReportsTable.vue';

export default {
    name: 'Reports',
    components: {
        DashboardLayout,
        ReportsTable
    },
    data() {
        return {
            loading: false,
            reports: [
                {
                    id: 1,
                    selected: false,
                    name: 'Joe Doe',
                    phone: '+1 (000) 000-0000',
                    email: 'example@gmail.com',
                    subject: 'Missing Item',
                    status: 'Resolved',
                    date: '01/05/2025'
                }
            ],
            rowsPerPage: 10,
            currentPage: 1,
            searchQuery: '',
            statusFilter: 'all'
        };
    },
    computed: {
        selectedCount() {
            return this.reports.filter(r => r.selected).length;
        },
        totalPages() {
            return Math.ceil(this.filteredReports.length / this.rowsPerPage);
        },
        filteredReports() {
            let filtered = [...this.reports];

            // Apply search filter
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(report =>
                    report.subject.toLowerCase().includes(query) ||
                    report.name.toLowerCase().includes(query) ||
                    report.email.toLowerCase().includes(query)
                );
            }

            // Apply status filter
            if (this.statusFilter !== 'all') {
                filtered = filtered.filter(report =>
                    report.status.toLowerCase() === this.statusFilter.toLowerCase()
                );
            }

            return filtered;
        }
    },
    methods: {
        openResponseModal(reports) {
            this.currentReports = reports;
            this.isResponseModalOpen = true;
        },
        closeResponseModal() {
            this.isResponseModalOpen = false;
            this.currentReports = {};
        },
        toggleSelect(reportId) {
            const report = this.reports.find(r => r.id === reportId);
            if (report) {
                report.selected = !report.selected;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        goToFirstPage() {
            this.currentPage = 1;
        },
        goToLastPage() {
            this.currentPage = this.totalPages;
        },
        deleteReports(reports) {
            const index = this.reports.findIndex(r => r.id === reports.id);
            if (index !== -1) {
                this.reports.splice(index, 1);
            }
        },
    }
};
</script>