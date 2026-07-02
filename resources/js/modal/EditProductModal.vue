<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Modal Backdrop -->
        <div class="fixed inset-0 bg-black/70" @click="close"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-3xl bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 class="text-xl font-semibold text-white">Edit Product</h2>
                <button @click="close" class="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 max-h-[70vh] overflow-y-auto">
                <form @submit.prevent="updateProduct">
                    <!-- Images Section -->
                    <div class="mb-6">
                        <label class="block text-gray-400 mb-2">Images</label>
                        <div class="flex items-center">
                            <button type="button"
                                class="flex items-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Upload an image
                            </button>
                        </div>
                    </div>

                    <!-- Basic Info -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label for="name" class="block text-gray-400 mb-2">Name</label>
                            <input id="name" v-model="editedProduct.name" type="text" placeholder="Product name"
                                class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                        </div>

                        <div>
                            <label for="category" class="block text-gray-400 mb-2">Category</label>
                            <div class="relative">
                                <select id="category" v-model="editedProduct.category"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500">
                                    <option value="">Select category</option>
                                    <option value="t-shirts">T-shirts</option>
                                    <option value="hoodies">Hoodies</option>
                                    <option value="Joggers">Joggers</option>
                                    <option value="poloshirts">Polo Shirts</option>
                                    <option value="dresses">Dresses</option>
                                    <option value="shorts">Shorts</option>
                                    <option value="socks">Socks</option>
                                    <option value="shoes">Shoes</option>
                                </select>
                                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label for="size" class="block text-gray-400 mb-2">Size</label>
                            <div class="relative">
                                <select id="size" v-model="editedProduct.size"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500">
                                    <option value="">Select size</option>
                                    <option value="S">Small</option>
                                    <option value="M">Medium</option>
                                    <option value="L">Large</option>
                                </select>
                                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label for="color" class="block text-gray-400 mb-2">Color</label>
                            <div class="flex items-center">
                                <input id="color" v-model="editedProduct.color" type="text" placeholder="#000000"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-l-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <input type="color" v-model="editedProduct.color"
                                    class="h-10 w-10 bg-gray-800 border border-gray-700 rounded-r-md" />
                            </div>
                        </div>

                        <div class="md:col-span-2">
                            <label for="description" class="block text-gray-400 mb-2">Description</label>
                            <textarea id="description" v-model="editedProduct.description" rows="2"
                                placeholder="Product description..."
                                class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
                        </div>
                    </div>

                    <!-- Price and Cost -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div>
                            <label for="salePrice" class="block text-gray-400 mb-2">Sale Price</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">₱</span>
                                <input id="salePrice" v-model="editedProduct.price" type="number" step="0.01"
                                    placeholder="0.00"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-8 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                            </div>
                        </div>

                        <div>
                            <label for="productionCost" class="block text-gray-400 mb-2">Production Cost</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">₱</span>
                                <input id="productionCost" v-model="editedProduct.cost" type="number" step="0.01"
                                    placeholder="0.00"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-8 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                            </div>
                        </div>

                        <div>
                            <label for="profit" class="block text-gray-400 mb-2">Profit</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">₱</span>
                                <input id="profit" :value="calculateProfit" type="text" readonly
                                    class="w-full bg-gray-700 border border-gray-700 rounded-md py-2 pl-8 pr-3 text-white placeholder-gray-500 focus:outline-none" />
                            </div>
                        </div>

                        <div>
                            <label for="margin" class="block text-gray-400 mb-2">Margin</label>
                            <div class="relative">
                                <input id="margin" :value="calculateMargin" type="text" readonly
                                    class="w-full bg-gray-700 border border-gray-700 rounded-md py-2 pl-3 pr-8 text-white placeholder-gray-500 focus:outline-none" />
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">%</span>
                            </div>
                        </div>
                    </div>

                    <!-- Status Options -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div class="flex items-center">
                            <input id="featured" v-model="editedProduct.featured" type="checkbox"
                                class="h-4 w-4 rounded-sm border-gray-700 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900" />
                            <div class="ml-3">
                                <label for="featured" class="text-white font-medium">Featured</label>
                                <p class="text-sm text-gray-400">This product will appear on homepage.</p>
                            </div>
                        </div>

                        <div class="flex items-center">
                            <input id="archived" v-model="editedProduct.archived" type="checkbox"
                                class="h-4 w-4 rounded-sm border-gray-700 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900" />
                            <div class="ml-3">
                                <label for="archived" class="text-white font-medium">Archived</label>
                                <p class="text-sm text-gray-400">This product will not appear anywhere.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Shipping & Stock -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div class="flex items-center">
                            <input id="requiresShipping" v-model="editedProduct.requiresShipping" type="checkbox"
                                class="h-4 w-4 rounded-sm border-gray-700 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900" />
                            <div class="ml-3">
                                <label for="requiresShipping" class="text-white font-medium">Requires Shipping</label>
                                <p class="text-sm text-gray-400">This is a physical product.</p>
                            </div>
                        </div>

                        <div>
                            <label for="weight" class="block text-gray-400 mb-2">Weight</label>
                            <div class="relative">
                                <input id="weight" v-model="editedProduct.weight" type="number" step="0.01"
                                    placeholder="0.00"
                                    class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">lb</span>
                            </div>
                        </div>

                        <div>
                            <label for="stock" class="block text-gray-400 mb-2">Available In Stock</label>
                            <input id="stock" v-model="editedProduct.quantity" type="number" placeholder="0"
                                class="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                        </div>
                    </div>

                    <!-- Specifications -->
                    <div class="mb-6">
                        <label class="block text-gray-400 mb-2">Specifications</label>
                        <div class="bg-gray-800 border border-gray-700 rounded-md p-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="material" class="block text-gray-400 mb-1 text-sm">Material</label>
                                    <input id="material" v-model="editedProduct.material" type="text"
                                        placeholder="Material"
                                        class="w-full bg-gray-700 border border-gray-600 rounded-md py-1 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                </div>
                                <div>
                                    <label for="condition" class="block text-gray-400 mb-1 text-sm">Condition</label>
                                    <div class="relative">
                                        <select id="condition" v-model="editedProduct.condition"
                                            class="w-full bg-gray-700 border border-gray-600 rounded-md py-1 px-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500">
                                            <option value="">Select condition</option>
                                            <option value="New">New</option>
                                            <option value="Used">Used</option>
                                            <option value="Refurbished">Refurbished</option>
                                        </select>
                                        <div
                                            class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label for="width" class="block text-gray-400 mb-1 text-sm">Width</label>
                                    <input id="width" v-model="editedProduct.width" type="text" placeholder="Width"
                                        class="w-full bg-gray-700 border border-gray-600 rounded-md py-1 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                </div>
                                <div>
                                    <label for="height" class="block text-gray-400 mb-1 text-sm">Height</label>
                                    <input id="height" v-model="editedProduct.height" type="text" placeholder="Height"
                                        class="w-full bg-gray-700 border border-gray-600 rounded-md py-1 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Modal Footer -->
            <div class="flex items-center justify-end p-6 border-t border-gray-800 bg-gray-900">
                <button @click="close" class="px-4 py-2 mr-2 text-gray-300 hover:text-white transition-colors">
                    Cancel
                </button>
                <button @click="saveDraft"
                    class="px-4 py-2 mr-2 border border-gray-600 rounded-md hover:bg-gray-800 text-white transition-colors">
                    Save Draft
                </button>
                <button @click="updateProduct"
                    class="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-md text-white transition-colors">
                    Update Product
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditProductModal',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        product: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            editedProduct: {
                id: '',
                name: '',
                category: '',
                size: '',
                color: '#000000',
                description: '',
                price: '',
                cost: '',
                featured: false,
                archived: false,
                requiresShipping: true,
                weight: '',
                quantity: 0,
                material: '',
                condition: '',
                width: '',
                height: '',
                date: new Date().toISOString().split('T')[0]
            }
        };
    },
    computed: {
        calculateProfit() {
            const price = parseFloat(this.editedProduct.price) || 0;
            const cost = parseFloat(this.editedProduct.cost) || 0;
            return (price - cost).toFixed(2);
        },
        calculateMargin() {
            const price = parseFloat(this.editedProduct.price) || 0;
            const cost = parseFloat(this.editedProduct.cost) || 0;

            if (price === 0) return '0.00';

            const margin = ((price - cost) / price) * 100;
            return margin.toFixed(2);
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        updateProduct() {
            this.$emit('update', this.editedProduct);
            this.close();
        },
        saveDraft() {
            this.$emit('save-draft', this.editedProduct);
            this.close();
        },
        resetForm() {
            // This will reset the form when the modal closes
            this.editedProduct = { ...this.product };
        }
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                document.body.style.overflow = 'hidden';
                // Populate the form with the product data when the modal opens
                this.editedProduct = { ...this.product };
            } else {
                document.body.style.overflow = '';
            }
        },
        product: {
            handler(newVal) {
                // Update local data when product prop changes
                if (this.isOpen) {
                    this.editedProduct = { ...newVal };
                }
            },
            deep: true
        }
    }
};
</script>