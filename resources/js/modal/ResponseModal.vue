<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" @click="closeModal"></div>

        <div class="flex items-center justify-center min-h-screen p-4">
            <!-- Modal panel -->
            <div class="bg-gray-800 rounded-lg shadow-xl border border-gray-700 max-w-lg w-full transform transition-all"
                @click.stop>
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 border-b border-gray-700">
                    <h3 class="text-lg font-medium text-gray-100">
                        Respond to Review
                    </h3>
                    <button @click="closeModal" class="text-gray-400 hover:text-gray-200 focus:outline-none">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Modal content -->
                <div class="p-4">
                    <div class="mb-4">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="font-medium text-gray-200">{{ review.name }}</span>
                            <div class="flex">
                                <template v-for="star in 5" :key="star">
                                    <svg class="w-4 h-4"
                                        :class="star <= review.rating ? 'text-amber-400' : 'text-gray-600'"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                </template>
                            </div>
                            <span class="text-sm text-gray-400">{{ review.date }}</span>
                        </div>

                        <div class="text-sm text-gray-400 mb-2">
                            Order ID: {{ review.orderId }}
                        </div>

                        <!-- Display the review comment (assuming there's one) -->
                        <div v-if="review.comment" class="bg-gray-700 bg-opacity-50 p-3 rounded-md text-gray-200 mb-4">
                            {{ review.comment || "No comment provided." }}
                        </div>
                        <div v-else class="italic text-gray-500 mb-4">No comment provided with this review.</div>
                    </div>

                    <!-- Response form -->
                    <div>
                        <label for="response" class="block mb-2 text-sm font-medium text-gray-300">Your Response</label>
                        <textarea id="response" v-model="responseText"
                            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                            rows="5" placeholder="Type your response here..."></textarea>
                    </div>

                    <!-- Response templates -->
                    <div class="mt-3">
                        <label class="block mb-2 text-sm font-medium text-gray-300">Response Templates</label>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="(template, index) in responseTemplates" :key="index"
                                @click="useTemplate(template)"
                                class="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full">
                                {{ template.label }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Modal footer -->
                <div class="flex justify-end gap-3 p-4 border-t border-gray-700">
                    <button @click="closeModal"
                        class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Cancel
                    </button>
                    <button @click="submitResponse"
                        class="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        :disabled="!responseText.trim()"
                        :class="{ 'opacity-50 cursor-not-allowed': !responseText.trim() }">
                        Submit Response
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResponseModal',
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        review: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
    data() {
        return {
            responseText: '',
            responseTemplates: [
                { label: 'Thank you', text: 'Thank you for your feedback! We appreciate you taking the time to share your experience with us.' },
                { label: 'Apology', text: 'We\'re sorry to hear about your experience. We strive to provide the best service possible and clearly fell short in this instance.' },
                { label: 'Follow-up', text: 'We\'d like to follow up on your concerns. Could you please contact our customer service team at support@example.com with your order details?' },
                { label: '5-star thanks', text: 'Thank you for your wonderful 5-star review! We\'re thrilled that you had such a positive experience with us.' }
            ]
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
            this.responseText = '';
        },
        submitResponse() {
            if (!this.responseText.trim()) return;

            this.$emit('submit', {
                reviewId: this.review.id,
                responseText: this.responseText
            });

            this.responseText = '';
        },
        useTemplate(template) {
            this.responseText = template.text;
        }
    },
    watch: {
        isOpen(newVal) {
            if (newVal && this.review.rating === 5) {
                // Auto-select the 5-star template for 5-star reviews
                const fiveStarTemplate = this.responseTemplates.find(t => t.label === '5-star thanks');
                if (fiveStarTemplate) {
                    this.responseText = fiveStarTemplate.text;
                }
            }
        }
    }
};
</script>