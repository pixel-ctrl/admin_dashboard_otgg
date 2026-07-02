<template>
    <DashboardLayout>
        <div class="bg-gray-900 text-gray-200 rounded-lg p-6 w-full">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-semibold dark:text-white">Reviews ({{ reviews.length }})</h2>
            </div>

            <!-- Search and Filters Bar -->
            <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div class="relative">
                    <input type="text" placeholder="Search by name..."
                        class="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 w-64"
                        v-model="searchQuery" />
                </div>

                <div class="flex gap-4">
                    <div class="relative">
                        <select
                            class="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            v-model="selectedRating">
                            <option value="all">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                        <div
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>

                    <div class="relative">
                        <select
                            class="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            v-model="selectedStatus">
                            <option value="all">All Status</option>
                            <option value="response sent">Response Sent</option>
                            <option value="pending">Pending</option>
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

            <!-- Reviews Table Component -->
            <ReviewsTable :filteredReviews="paginatedReviews" @selection-changed="updateSelectedCount"
                @respond="openResponseModal" @delete="deleteReview" />

            <!-- Pagination -->
            <div class="flex justify-between items-center mt-6">
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-gray-400">Rows per page:</span>
                        <select
                            class="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                            v-model="rowsPerPage">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>

                    <div class="text-sm text-gray-400">
                        Page {{ currentPage }} of {{ totalPages }}
                    </div>

                    <div class="flex gap-1">
                        <button class="p-1 rounded hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent"
                            :disabled="currentPage === 1" @click="currentPage = 1">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <button class="p-1 rounded hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent"
                            :disabled="currentPage === 1" @click="currentPage--">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <button class="p-1 rounded hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent"
                            :disabled="currentPage === totalPages" @click="currentPage++">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                                </path>
                            </svg>
                        </button>
                        <button class="p-1 rounded hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent"
                            :disabled="currentPage === totalPages" @click="currentPage = totalPages">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Response Modal -->
            <ResponseModal :isOpen="isResponseModalOpen" :review="currentReview" @close="closeResponseModal"
                @submit="submitResponse" />
        </div>
    </DashboardLayout>
</template>

<script>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import ReviewsTable from '../components/cards/ReviewsTable.vue';
import ResponseModal from '../modal/ResponseModal.vue';

export default {
    name: 'Review',
    components: {
        DashboardLayout,
        ReviewsTable,
        ResponseModal
    },
    data() {
        return {
            searchQuery: '',
            selectedRating: 'all',
            selectedStatus: 'all',
            currentPage: 1,
            rowsPerPage: 10,
            isResponseModalOpen: false,
            currentReview: {},
            // Sample review data - expanded with comments
            reviews: [
                {
                    id: 1,
                    name: "John Smith",
                    rating: 4,
                    orderId: "ORD-12345",
                    date: "2025-03-28",
                    responseStatus: "Response Sent"
                },
                {
                    id: 2,
                    name: "Sarah Johnson",
                    rating: 5,
                    orderId: "ORD-67890",
                    date: "2025-04-01",
                    responseStatus: "No Response"
                },
                {
                    id: 3,
                    name: "Michael Brown",
                    rating: 2,
                    orderId: "ORD-24680",
                    date: "2025-04-03",
                    responseStatus: "No Response"
                },
                {
                    id: 4,
                    name: "Emily Williams",
                    rating: 5,
                    orderId: "ORD-13579",
                    date: "2025-04-05",
                    responseStatus: "Response Sent"
                }
            ]
        };
    },
    computed: {
        filteredReviews() {
            let result = [...this.reviews];

            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(
                    (review) =>
                        review.name.toLowerCase().includes(query) ||
                        review.orderId.toLowerCase().includes(query)
                );
            }

            // Filter by rating
            if (this.selectedRating !== 'all') {
                result = result.filter(
                    (review) => review.rating === parseInt(this.selectedRating)
                );
            }

            // Filter by status
            if (this.selectedStatus !== 'all') {
                result = result.filter(
                    (review) => review.responseStatus.toLowerCase() === this.selectedStatus.toLowerCase()
                );
            }

            return result;
        },
        paginatedReviews() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.filteredReviews.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredReviews.length / this.rowsPerPage) || 1;
        },
        selectedCount() {
            return this.reviews.filter((review) => review.selected).length;
        }
    },
    methods: {
        updateSelectedCount() {
            // This method is just a placeholder to handle the 'selection-changed' event
        },
        openResponseModal(review) {
            this.currentReview = review;
            this.isResponseModalOpen = true;
        },
        closeResponseModal() {
            this.isResponseModalOpen = false;
            this.currentReview = {};
        },
        submitResponse({ reviewId, responseText }) {
            const review = this.reviews.find(r => r.id === reviewId);
            if (review) {
                review.responseStatus = 'Response Sent';
                review.response = responseText;
                this.closeResponseModal();
            }
        },
        deleteReview(review) {
            const index = this.reviews.findIndex(r => r.id === review.id);
            if (index !== -1) {
                this.reviews.splice(index, 1);
            }
        }
    }
};
</script>