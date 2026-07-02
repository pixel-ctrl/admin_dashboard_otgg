<template>
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead>
                <tr class="text-left text-gray-400 text-sm border-b border-gray-700">
                    <th class="py-3 px-4">PRODUCT ID</th>
                    <th class="py-3 px-4">IMAGE</th>
                    <th class="py-3 px-4">PRODUCT NAME</th>
                    <th class="py-3 px-4">PRICE</th>
                    <th class="py-3 px-4">TOTAL SALES</th>
                    <th class="py-3 px-4">STOCK</th>
                    <th class="py-3 px-4">STATUS</th>
                    <th class="py-3 px-4"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="loading" class="border-b border-gray-700">
                    <td colspan="8" class="text-center py-6 text-gray-400">Loading products...</td>
                </tr>
                <tr v-else-if="products.length === 0" class="border-b border-gray-700">
                    <td colspan="8" class="text-center py-6 text-gray-400">No products found</td>
                </tr>
                <tr v-for="product in displayedProducts" :key="product.id"
                    class="border-b border-gray-700 text-white hover:bg-gray-700 transition-colors">
                    <td class="py-4 px-4 text-gray-400">{{ product.id }}</td>
                    <td class="py-4 px-4">
                        <div class="w-12 h-12 bg-gray-700 rounded-md overflow-hidden flex items-center justify-center">
                            <img v-if="product.image" :src="product.image" :alt="product.name"
                                class="w-full h-full object-cover" />
                        </div>
                    </td>
                    <td class="py-4 px-4">{{ product.name }}</td>
                    <td class="py-4 px-4">₹{{ formattedPrice(product.price) }}</td>
                    <td class="py-4 px-4">{{ product.totalSales }}</td>
                    <td class="py-4 px-4">{{ product.stock }}</td>
                    <td class="py-4 px-4">
                        <span :class="[
                            'px-3 py-1 text-xs rounded-full',
                            product.status === 'In Stock' ? 'bg-green-900/30 text-green-500' :
                                product.status === 'Out of Stock' ? 'bg-red-900/30 text-red-500' :
                                    'bg-yellow-900/30 text-yellow-500'
                        ]">
                            {{ product.status }}
                        </span>
                    </td>
                    <td class="py-4 px-4 text-right">
                        <button class="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'ProductTable',
    props: {
        products: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            loading: true,
            displayedProducts: []
        };
    },
    methods: {
        formattedPrice(price) {
            return new Intl.NumberFormat('en-IN').format(price);
        }
    },
    mounted() {
        // we would use the actual product data from the API
        this.$emit('fetch-products');

        // Simulate loading
        setTimeout(() => {
            this.loading = false;
        }, 500);
    },
    watch: {
        products: {
            handler(newProducts) {
                if (newProducts.length > 0) {
                    this.displayedProducts = newProducts;
                }
            },
            deep: true
        }
    }
};
</script>