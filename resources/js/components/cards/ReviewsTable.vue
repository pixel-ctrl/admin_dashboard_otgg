<template>
    <!-- Table -->
    <div class="bg-gray-800 rounded-lg shadow-xl">
        <table class="min-w-full divide-y divide-gray-700">
            <thead>
                <tr class="bg-gray-800">
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rating
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date
                        Received</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Store
                        Response</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
                <tr v-if="loading" class="border-b border-gray-700">
                    <td colspan="14" class="text-center py-6 text-gray-400">Loading Reviews...</td>
                </tr>
                <tr v-else-if="filteredReviews.length === 0" class="border-b border-gray-700">
                    <td colspan="14" class="justify-center text-center py-6 text-gray-400">No Reviews found
                    </td>
                </tr>
                <tr v-for="review in filteredReviews" :key="review.id"
                    class="border-b border-gray-800 hover:bg-gray-800/50">
                    <td class="px-4 py-4 text-sm">{{ review.name }}</td>
                    <td class="px-4 py-4 text-sm">
                        <div class="flex">
                            <template v-for="star in 5" :key="star">
                                <svg class="w-5 h-5" :class="star <= review.rating ? 'text-amber-400' : 'text-gray-600'"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                            </template>
                        </div>
                    </td>
                    <td class="px-4 py-4 text-sm text-gray-400">{{ review.orderId }}</td>
                    <td class="px-4 py-4 text-sm text-gray-400">{{ review.date }}</td>
                    <td class="px-4 py-4 ">
                        <span v-if="review.responseStatus" class="px-3 py-1 text-xs rounded-full" :class="review.responseStatus === 'Response Sent'
                            ? 'bg-teal-900/50 text-teal-400'
                            : 'bg-gray-700/50 text-gray-400'
                            ">
                            {{ review.responseStatus }}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <div class="group inline-block relative">
                            <button class="text-gray-400 hover:text-teal-500" @click="toggleDropdown(review.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                            <!-- Dropdown Menu -->
                            <div v-if="activeDropdown === review.id"
                                class="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                                <div class="py-1">
                                    <button @click="respondToReview(review)"
                                        class="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">
                                        Response
                                    </button>
                                    <button @click="deleteReview(review)"
                                        class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'ReviewsTable',
    props: {
        filteredReviews: {
            type: Array,
            required: true
        },
        filteredReviews: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    data() {
        return {
            loading: false,
            selectAll: false,
            activeDropdown: null
        };
    },
    methods: {
        toggleSelectAll() {
            this.filteredReviews.forEach(review => {
                review.selected = this.selectAll;
            });
            this.$emit('selection-changed');
        },
        updateSelection() {
            this.$emit('selection-changed');
        },
        toggleDropdown(id) {
            if (this.activeDropdown === id) {
                this.activeDropdown = null;
            } else {
                this.activeDropdown = id;
            }
        },
        respondToReview(review) {
            this.$emit('respond', review);
            this.activeDropdown = null;
        },
        deleteReview(review) {
            this.$emit('delete', review);
            this.activeDropdown = null;
        },
        closeDropdownOnOutsideClick(event) {
            if (!event.target.closest('button')) {
                this.activeDropdown = null;
            }
        }
    },
    // Close dropdown when clicking outside
    mounted() {
        document.addEventListener('click', this.closeDropdownOnOutsideClick);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.closeDropdownOnOutsideClick);
    }
};
</script>