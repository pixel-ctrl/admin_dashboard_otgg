<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

        <!-- Modal -->
        <div class="relative w-full max-w-md mx-auto bg-gray-800 rounded-lg shadow-xl z-10">
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-200">Delete Customer Account</h3>
                    <button @click="$emit('close')" class="text-gray-400 hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="mb-5">
                    <p class="text-gray-300 mb-2">
                        You are about to delete <span class="font-medium text-red-400">{{ customer.name }}</span>'s
                        account.
                    </p>
                    <p class="text-gray-400 text-sm mb-4">
                        An email will be sent to the customer explaining why their account has been deleted.
                    </p>

                    <div class="mb-4">
                        <label for="reason" class="block text-sm font-medium text-gray-300 mb-1">
                            Reason for deletion:
                        </label>
                        <select v-model="selectedReason" id="reason"
                            class="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="" disabled>Select a reason</option>
                            <option value="violation">Terms of Service Violation</option>
                            <option value="fraud">Fraudulent Activity</option>
                            <option value="inactive">Account Inactivity</option>
                            <option value="request">Customer Request</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div v-if="selectedReason === 'other'" class="mb-4">
                        <label for="customReason" class="block text-sm font-medium text-gray-300 mb-1">
                            Please specify:
                        </label>
                        <textarea v-model="customReason" id="customReason" rows="3" placeholder="Enter custom reason..."
                            class="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>

                    <div class="mb-4">
                        <label for="additionalMessage" class="block text-sm font-medium text-gray-300 mb-1">
                            Additional message (optional):
                        </label>
                        <textarea v-model="additionalMessage" id="additionalMessage" rows="3"
                            placeholder="Add any additional information for the customer..."
                            class="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                </div>

                <div class="flex justify-end space-x-3">
                    <button @click="$emit('close')"
                        class="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                        Cancel
                    </button>
                    <button @click="confirmDelete"
                        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        :disabled="!isFormValid || isLoading">
                        <span v-if="isLoading" class="flex items-center">
                            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Processing...
                        </span>
                        <span v-else>Delete Account</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DeleteCustomerModal',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        customer: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            selectedReason: '',
            customReason: '',
            additionalMessage: '',
            isLoading: false
        }
    },
    computed: {
        isFormValid() {
            if (!this.selectedReason) return false;
            if (this.selectedReason === 'other' && !this.customReason.trim()) return false;
            return true;
        },
        finalReason() {
            if (this.selectedReason === 'other') {
                return this.customReason.trim();
            } else {
                const reasonMap = {
                    'violation': 'Terms of Service Violation',
                    'fraud': 'Fraudulent Activity',
                    'inactive': 'Account Inactivity',
                    'request': 'Customer Request'
                };
                return reasonMap[this.selectedReason] || this.selectedReason;
            }
        }
    },
    methods: {
        confirmDelete() {
            if (!this.isFormValid) return;

            this.isLoading = true;

            // Simulate sending email and deleting account
            setTimeout(() => {
                // In a real application, you would send the email here
                console.log(`Sending email to ${this.customer.email} with reason: ${this.finalReason}`);
                if (this.additionalMessage) {
                    console.log(`Additional message: ${this.additionalMessage}`);
                }

                // Emit delete event with customer and reason information
                this.$emit('confirm-delete', {
                    customer: this.customer,
                    reason: this.finalReason,
                    additionalMessage: this.additionalMessage
                });

                this.isLoading = false;
            }, 1000);
        },
        resetForm() {
            this.selectedReason = '';
            this.customReason = '';
            this.additionalMessage = '';
        }
    },
    watch: {
        show(newVal) {
            if (newVal) {
                // Reset form when modal is opened
                this.resetForm();
            }
        }
    }
}
</script>