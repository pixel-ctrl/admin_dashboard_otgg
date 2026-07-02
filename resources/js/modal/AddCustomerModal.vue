<!-- AddCustomerModal -->
<template>
    <div>
        <!-- Modal Backdrop -->
        <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click.self="$emit('close')">
            <!-- Modal Content -->
            <div class="bg-gray-850 rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
                <!-- Modal Header -->
                <div class="p-6 border-b border-gray-700">
                    <h2 class="text-2xl font-semibold text-white">Add Customer</h2>
                    <p class="text-gray-400 text-sm mt-1">Add a new customer here.</p>
                </div>

                <!-- Modal Body / Form -->
                <div class="p-6">
                    <form @submit.prevent="saveCustomer">
                        <!-- Name Fields -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">First Name</label>
                                <input type="text" v-model="customer.firstName"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="First Name">
                            </div>
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">Last Name</label>
                                <input type="text" v-model="customer.lastName"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Last Name">
                            </div>
                        </div>

                        <!-- Country and State -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">Country</label>
                                <div class="relative">
                                    <select v-model="customer.country"
                                        class="appearance-none w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="" disabled>Select</option>
                                        <option v-for="country in countries" :key="country" :value="country">{{ country
                                            }}</option>
                                    </select>
                                    <div
                                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">Region</label>
                                <div class="relative">
                                    <select v-model="customer.region"
                                        class="appearance-none w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="" disabled>Select</option>
                                        <option v-for="region in region" :key="region" :value="region">{{ region }}</option>
                                    </select>
                                    <div
                                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Email and Phone -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">Email</label>
                                <input type="email" v-model="customer.email"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="example@gmail.com">
                            </div>
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">Phone Number</label>
                                <input type="tel" v-model="customer.phone"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="+63 000-000-0000">
                            </div>
                        </div>

                        <!-- Address and Apartment -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">Address</label>
                                <input type="text" v-model="customer.address"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="1234 Main St, Barangay 1, City">
                            </div>
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">Apartment / Suite</label>
                                <input type="text" v-model="customer.apartment"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Apartment, suite, unit, etc.">
                            </div>
                        </div>

                        <!-- Notes -->
                        <div class="mb-6">
                            <label class="block text-gray-400 text-sm font-medium mb-2">Notes</label>
                            <textarea v-model="customer.notes"
                                class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                                placeholder="Customer related notes..."></textarea>
                        </div>

                        <!-- City and Postal Code -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">City</label>
                                <div class="relative">
                                    <select v-model="customer.city"
                                        class="appearance-none w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="" disabled>Select</option>
                                        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                                    </select>
                                    <div
                                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">Postal Code</label>
                                <input type="text" v-model="customer.postalCode"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="00000">
                            </div>
                        </div>

                        <!-- Company and Secondary Phone -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">Company</label>
                                <input type="text" v-model="customer.company"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Company Name">
                            </div>
                            <div>
                                <label class="block text-gray-400 text-sm font-medium mb-2">Secondary Phone</label>
                                <input type="tel" v-model="customer.secondaryPhone"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="+63 000-000-0000">
                            </div>
                        </div>

                        <!-- Promotions -->
                        <div class="mb-6">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="promotions" type="checkbox" v-model="customer.promotions"
                                        class="h-4 w-4 rounded bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2 text-blue-600">
                                </div>
                                <div class="ml-3">
                                    <label for="promotions" class="text-gray-300 font-medium">Promotions</label>
                                    <p class="text-gray-400 text-sm">Customer agreed to receive promotional emails,
                                        promo codes, and other newsletters.</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Modal Footer -->
                <div class="p-6 border-t border-gray-700 flex justify-end space-x-4">
                    <button @click="$emit('close')"
                        class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer">
                        Cancel
                    </button>
                    <button @click="saveCustomer" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer">
                        Save Customer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddCustomerModal',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showModal: false,
            customer: {
                firstName: '',
                lastName: '',
                country: '',
                region: '',
                email: '',
                phone: '',
                address: '',
                apartment: '',
                notes: '',
                city: '',
                postalCode: '',
                company: '',
                secondaryPhone: '',
                promotions: false
            },
            countries: ['Philippines'],
            region: ['Metro Manila'],
            cities: ['Caloocan', 'Las Piñas', 'Malabon', 'Mandaluyong', 'Manila', 'Marikina', 'Muntinlupa', 'Makati', 'Navotas', 'Parañaque', 'Pasay', 'Pasig', 'Pateros (municipality)', 'Quezon City', 'San Juan', 'Taguig', 'Valenzuela'],
        }
    },
    methods: {
        saveCustomer() {
            // Add customer logic here
            this.$emit('customer-added', {
                name: `${this.customer.firstName} ${this.customer.lastName}`,
                email: this.customer.email,
                phone: this.customer.phone,
                address: `${this.customer.address}, ${this.customer.city}, ${this.customer.region}`,
                repeat: 'No',
                highestOrder: 0,
                since: new Date().toISOString().split('T')[0],
                type: 'retail'
            });

            // Reset form and close modal
            this.resetForm();
            this.$emit('close');
        },
        resetForm() {
            this.customer = {
                firstName: '',
                lastName: '',
                country: '',
                region: '',
                email: '',
                phone: '',
                address: '',
                apartment: '',
                notes: '',
                city: '',
                postalCode: '',
                company: '',
                secondaryPhone: '',
                promotions: false
            };
        }
    }
}
</script>

<style scoped>
/* Add custom styles here */
.bg-gray-850 {
    background-color: #1a1e2a;
}
</style>