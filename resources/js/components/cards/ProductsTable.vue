<template>
    <div class="bg-gray-800 rounded-lg shadow-xl">
        <table class="w-full">
            <thead>
                <tr class="border-b border-gray-700">
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Name</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Archived</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Featured</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Price</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Cost</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Quantity</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Category</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Size</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Color</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Width</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Height</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Material</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Condition</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="loading" class="border-b border-gray-700">
                    <td colspan="15" class="text-center py-6 text-gray-400">Loading products...</td>
                </tr>
                <tr v-else-if="paginatedProducts.length === 0" class="border-b border-gray-700">
                    <td colspan="15" class="text-center py-6 text-gray-400">No products found</td>
                </tr>
                <tr v-for="product in paginatedProducts" :key="product.id"
                    class="border-b border-gray-700 hover:bg-gray-700">
                    <td class="px-4 py-3 text-sm">{{ product.name }}</td>
                    <td class="px-4 py-3 text-sm">{{ product.archived ? 'Yes' : 'No' }}</td>
                    <td class="px-4 py-3 text-sm">{{ product.featured ? 'Yes' : 'No' }}</td>
                    <td class="px-4 py-3 text-sm">₱{{ product.price.toFixed(2) }}</td>
                    <td class="px-4 py-3 text-sm">₱{{ product.cost.toFixed(2) }}</td>
                    <td class="px-4 py-3 text-sm">{{ product.quantity }}</td>
                    <td class="px-4 py-3 text-sm">{{ product.category }}</td>
                    <td class="px-4 py-3 text-sm">{{ product.size }}</td>
                    <td class="px-4 py-3 text-sm">
                        <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: product.color }"></div>
                    </td>
                    <td class="px-4 py-3 text-sm">{{ product.width }}</td>
                    <td class="px-4 py-3 text-sm">{{ product.height }}</td>
                    <td class="px-4 py-3 text-sm">{{ product.material }}</td>
                    <td class="px-4 py-3 text-sm">{{ product.condition }}</td>
                    <td class="px-4 py-3 text-sm">{{ product.date }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <div class="group inline-block relative" @click.stop>
                            <button @click.prevent="toggleDropdown(product.id)"
                                class="text-gray-400 hover:text-teal-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                            <div v-if="activeDropdown === product.id"
                                class="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                                <div class="py-1">
                                    <a href="#" @click.prevent="editProduct(product)"
                                        class="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Edit</a>
                                    <a href="#" @click.prevent="copyProductId(product.id)"
                                        class="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Copy ID</a>
                                    <a href="#" @click.prevent="deleteProduct(product.id)"
                                        class="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Delete</a>
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
    name: 'ProductsTable',
    props: {
        products: {
            type: Array,
            required: true
        },
        paginatedProducts: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    data() {
        return {
            allSelected: false,
            activeDropdown: null, // Track which dropdown is active
            loading: false // Changed to false to avoid unnecessary loading screen
        }
    },
    methods: {
        selectAll() {
            const newValue = !this.allSelected;
            this.allSelected = newValue;
            this.products.forEach(product => {
                product.selected = newValue;
            });
            this.$emit('selection-changed', this.products);
        },

        deleteProduct(productId) {
            if (confirm('Are you sure you want to delete this product?')) {
                this.$emit('delete', productId);
                this.closeDropdowns(); // Close dropdown after action
            }
        },

        editProduct(product) {
            // Emit edit event to parent
            this.$emit('edit', product);
            this.closeDropdowns(); // Close dropdown after action
        },

        copyProductId(id) {
            navigator.clipboard.writeText(id.toString())
                .then(() => {
                    // You could add a temporary success notification here
                    console.log('Product ID copied to clipboard');
                })
                .catch(err => {
                    console.error('Failed to copy product ID', err);
                });
            this.closeDropdowns(); // Close dropdown after action
        },

        // Dropdown handling methods
        toggleDropdown(productId) {
            if (this.activeDropdown === productId) {
                this.activeDropdown = null; // Close if already open
            } else {
                this.activeDropdown = productId; // Open the clicked dropdown
            }
        },

        closeDropdowns() {
            this.activeDropdown = null;
        },

        // Click outside handler to close dropdowns
        handleClickOutside(event) {
            // Only run if there's an open dropdown
            if (this.activeDropdown !== null) {
                // Check if the click was outside dropdown elements
                const dropdownElements = document.querySelectorAll('.product-dropdown');
                let clickedInside = false;

                dropdownElements.forEach(el => {
                    if (el.contains(event.target)) {
                        clickedInside = true;
                    }
                });

                if (!clickedInside) {
                    this.closeDropdowns();
                }
            }
        }
    },

    mounted() {
        // Add global click handler for closing dropdowns
        document.addEventListener('click', this.handleClickOutside);
    },

    beforeUnmount() {
        // Clean up event listener
        document.removeEventListener('click', this.handleClickOutside);
    }
}
</script>
