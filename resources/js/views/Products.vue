<template>
    <DashboardLayout>
        <div class="p-6 bg-gray-900 w-[1288px] text-white">
            <!-- Add Tab Navigation Component -->
            <TabNavProduct :products-count="products.length" :blog-count="articles.length" :draft-count="0"
                @tab-change="handleTabChange" />

            <!-- Products Content - Only shown when activeTab is 'products' -->
            <div v-if="activeTab === 'products'">
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-semibold dark:text-white">Products</h1>

                    <div class="relative flex items-center">
                        <!-- Search Icon -->
                        <div class="absolute left-3 z-10 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <!-- Search Input -->
                        <input type="text" v-model="productSearchQuery" placeholder="Search by name..."
                            class="bg-gray-700/30 text-white px-4 py-2 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500" />

                        <!-- Add Products -->
                        <div class="ml-4 text-teal-500 cursor-pointer hover:text-teal-400 transition-colors">
                            <button @click="openAddProductModal"
                                class="relative flex items-center stroke-cyan-500 text-s px-4 py-2 ml-4 text-teal-500 cursor-pointer hover:text-teal-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>

                                <span class="ml-2">Add</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="flex flex-wrap justify-end items-center mb-6 gap-4">
                    <div class="flex gap-3">
                        <div class="relative">
                            <select v-model="statusFilter"
                                class="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8">
                                <option value="">Status</option>
                                <option value="archived">Archived</option>
                                <option value="featured">Featured</option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <div class="relative">
                            <select v-model="categoryFilter"
                                class="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8">
                                <option value="">Category</option>
                                <option value="t-shirts">T-shirts</option>
                                <option value="jeans">Jeans</option>
                                <option value="hoodies">Hoodies</option>
                                <option value="joggers">Joggers</option>
                                <option value="polo shirts">Polo Shirts</option>
                                <option value="dresses">Dresses</option>
                                <option value="shoes">Shoes</option>
                                <option value="socks">Socks</option>
                                <option value="accessories">Accessories</option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Table -->
                <ProductsTable :products="products" :paginated-products="paginatedProducts" @edit="editProduct"
                    @delete="deleteProduct" @selection-changed="updateSelection" />

                <!-- Pagination -->
                <div class="flex justify-between items-center mt-6">
                    <div class="flex items-center">
                        <span class="mr-2 text-sm text-gray-400">Rows per page:</span>
                        <select v-model="productRowsPerPage"
                            class="bg-gray-800 text-white px-2 py-1 rounded border border-gray-700 text-sm">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>

                        <div class="ml-4 flex items-center">
                            <span class="mr-4 text-sm text-gray-400">Page {{ productCurrentPage }} of {{
                                productTotalPages }}</span>
                            <div class="flex space-x-1">
                                <button @click="goToProductFirstPage"
                                    class="px-2 py-1 bg-gray-800 border border-gray-700 rounded hover:bg-gray-700"
                                    :disabled="productCurrentPage === 1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z"
                                            clip-rule="evenodd" />
                                        <path fill-rule="evenodd"
                                            d="M9.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <button @click="goToProductPrevPage"
                                    class="px-2 py-1 bg-gray-800 border border-gray-700 rounded hover:bg-gray-700"
                                    :disabled="productCurrentPage === 1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <button @click="goToProductNextPage"
                                    class="px-2 py-1 bg-gray-800 border border-gray-700 rounded hover:bg-gray-700"
                                    :disabled="productCurrentPage === productTotalPages">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <button @click="goToProductLastPage"
                                    class="px-2 py-1 bg-gray-800 border border-gray-700 rounded hover:bg-gray-700"
                                    :disabled="productCurrentPage === productTotalPages">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" />
                                        <path fill-rule="evenodd"
                                            d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <AddProductModal :is-open="isAddProductModalOpen" @close="closeAddProductModal"
                    @save="handleSaveProduct" @save-draft="handleSaveDraft" />

                <EditProductModal :is-open="isEditProductModalOpen" :product="currentEditProduct"
                    @close="closeEditProductModal" @update="handleUpdateProduct" @save-draft="handleSaveDraft" />
            </div>

            <!-- Blog Content - Only shown when activeTab is 'blog' -->
            <div v-if="activeTab === 'blog'">
                <!-- Header -->
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h1 class="text-2xl font-bold">Articles ({{ articles.length }})</h1>
                        <p class="text-gray-400 text-sm">Compose and publish blog articles to your store.</p>
                    </div>
                    <ArticleModal :is-open="isArticleModalOpen" @close="closeArticleModal" @save="handleSaveArticle" />
                </div>

                <!-- Search and Filter -->
                <div class="flex justify-between items-center mb-4">
                    <div class="flex-1 max-w-xs">
                        <input v-model="blogSearchQuery" type="text" placeholder="Search by title..."
                            class="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500" />
                    </div>

                    <div class="flex space-x-2">
                        <div class="relative">
                            <button @click="toggleCategoryDropdown"
                                class="bg-gray-800 px-4 py-2 rounded-md border border-gray-700 flex items-center">
                                Category
                                <svg class="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                            <div v-if="isCategoryDropdownOpen"
                                class="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                                <div class="py-1">
                                    <a href="#" @click.prevent="setSelectedCategory('')"
                                        class="block px-4 py-2 text-white hover:bg-gray-700">All Categories</a>
                                    <a href="#" @click.prevent="setSelectedCategory('Sample')"
                                        class="block px-4 py-2 text-white hover:bg-gray-700">Sample</a>
                                    <a href="#" @click.prevent="setSelectedCategory('News')"
                                        class="block px-4 py-2 text-white hover:bg-gray-700">News</a>
                                    <a href="#" @click.prevent="setSelectedCategory('Tutorial')"
                                        class="block px-4 py-2 text-white hover:bg-gray-700">Tutorial</a>
                                </div>
                            </div>
                        </div>

                        <div class="relative">
                            <button @click="toggleColumnsDropdown"
                                class="bg-gray-800 px-4 py-2 rounded-md border border-gray-700 flex items-center">
                                Columns
                                <svg class="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                            <div v-if="isColumnsDropdownOpen"
                                class="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                                <div class="py-1">
                                    <div class="px-4 py-2 flex items-center">
                                        <input type="checkbox" id="col-title" checked disabled class="mr-2" />
                                        <label for="col-title" class="text-white">Title</label>
                                    </div>
                                    <div class="px-4 py-2 flex items-center">
                                        <input type="checkbox" id="col-category" v-model="showCategoryColumn"
                                            class="mr-2" />
                                        <label for="col-category" class="text-white">Category</label>
                                    </div>
                                    <div class="px-4 py-2 flex items-center">
                                        <input type="checkbox" id="col-status" v-model="showStatusColumn"
                                            class="mr-2" />
                                        <label for="col-status" class="text-white">Status</label>
                                    </div>
                                    <div class="px-4 py-2 flex items-center">
                                        <input type="checkbox" id="col-date" v-model="showDateColumn" class="mr-2" />
                                        <label for="col-date" class="text-white">Date</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Table Component -->
                <ArticleTable :articles="paginatedArticles" :show-category-column="showCategoryColumn"
                    :show-status-column="showStatusColumn" :show-date-column="showDateColumn"
                    @update:selected-count="articleSelectedCount = $event" @select="handleArticleSelection" />

                <!-- Pagination -->
                <div class="mt-4 flex items-center justify-between">
                    <div class="text-sm text-gray-400">
                        <span>{{ articleSelectedCount }} of {{ filteredArticles.length }} row(s) selected.</span>
                    </div>

                    <div class="flex items-center space-x-2">
                        <div class="flex items-center">
                            <span class="text-sm text-gray-400 mr-2">Rows per page:</span>
                            <select v-model="blogRowsPerPage"
                                class="bg-gray-800 border border-gray-700 text-white rounded-md text-sm px-2 py-1 focus:outline-none focus:border-blue-500">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                        </div>

                        <div class="text-sm text-gray-400">
                            Page {{ blogCurrentPage }} of {{ blogTotalPages }}
                        </div>

                        <div class="flex">
                            <button @click="goToBlogFirstPage" :disabled="blogCurrentPage === 1"
                                :class="[blogCurrentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700']"
                                class="px-2 py-1 rounded-md border border-gray-700 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                </svg>
                            </button>
                            <button @click="goToBlogPrevPage" :disabled="blogCurrentPage === 1"
                                :class="[blogCurrentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700']"
                                class="px-2 py-1 rounded-md border border-gray-700 border-l-0 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button @click="goToBlogNextPage" :disabled="blogCurrentPage === blogTotalPages"
                                :class="[blogCurrentPage === blogTotalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700']"
                                class="px-2 py-1 rounded-md border border-gray-700 border-l-0 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button @click="goToBlogLastPage" :disabled="blogCurrentPage === blogTotalPages"
                                :class="[blogCurrentPage === blogTotalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700']"
                                class="px-2 py-1 rounded-md border border-gray-700 border-l-0 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                
            </div>

            <!-- Draft Content - Only shown when activeTab is 'draft' -->
            <div v-if="activeTab === 'draft'">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-semibold dark:text-white">Drafts</h1>

                    <div class="relative flex items-center">
                        <div class="absolute left-3 z-10 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input type="text" placeholder="Search drafts..."
                            class="bg-gray-700/30 text-white px-4 py-2 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>
                </div>

                <div class="py-8 text-center text-gray-400">
                    <p>Draft content will be displayed here</p>
                </div>
            </div>
        </div>

    </DashboardLayout>
</template>

<script>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import ProductsTable from '../components/cards/ProductsTable.vue';
import AddProductModal from '../modal/AddProductModal.vue';
import EditProductModal from '../modal/EditProductModal.vue';
import TabNavProduct from '../tabs/TabNavProduct.vue.vue';
import ArticleTable from '../components/cards/ArticlesTable.vue';
import ArticleModal from '../modal/ArticleModal.vue';

export default {
    name: 'Products',
    components: {
        DashboardLayout,
        ProductsTable,
        AddProductModal,
        EditProductModal,
        TabNavProduct,
        ArticleTable,
        ArticleModal
    },
    data() {
        return {
            activeTab: 'products',
            // Product-related data
            products: [
                {
                    id: 1,
                    name: "Classic Cotton T-Shirt",
                    archived: false,
                    featured: true,
                    price: 499.99,
                    cost: 199.50,
                    quantity: 128,
                    category: "t-shirts",
                    size: "M",
                    color: "#2563EB", // Blue
                    width: "20 cm",
                    height: "30 cm",
                    material: "100% Cotton",
                    condition: "New",
                    date: "2025-02-15",
                    selected: false
                },
                {
                    id: 2,
                    name: "Premium Denim Jeans",
                    archived: false,
                    featured: false,
                    price: 1299.99,
                    cost: 650.00,
                    quantity: 62,
                    category: "jeans",
                    size: "32",
                    color: "#1F2937", // Dark blue
                    width: "36 cm",
                    height: "110 cm",
                    material: "Denim",
                    condition: "New",
                    date: "2025-01-22",
                    selected: false
                },
                {
                    id: 3,
                    name: "Thermal Hoodie",
                    archived: true,
                    featured: false,
                    price: 899.99,
                    cost: 350.75,
                    quantity: 0,
                    category: "hoodies",
                    size: "L",
                    color: "#4B5563", // Gray
                    width: "52 cm",
                    height: "68 cm",
                    material: "80% Cotton, 20% Polyester",
                    condition: "New",
                    date: "2024-12-05",
                    selected: false
                },
                {
                    id: 4,
                    name: "Athletic Running Shoes",
                    archived: false,
                    featured: true,
                    price: 2499.99,
                    cost: 1100.00,
                    quantity: 45,
                    category: "shoes",
                    size: "9",
                    color: "#DC2626", // Red
                    width: "28 cm",
                    height: "12 cm",
                    material: "Synthetic mesh",
                    condition: "New",
                    date: "2025-03-10",
                    selected: false
                }
            ],
            productSearchQuery: '',
            statusFilter: '',
            categoryFilter: '',
            productCurrentPage: 1,
            productRowsPerPage: 10,
            isAddProductModalOpen: false,
            isEditProductModalOpen: false,
            currentEditProduct: {},

            // Blog-related data
            articles: [
                { id: 1, title: 'Sample Post Title', category: 'Sample', status: 'Published', date: '02/23/2025', selected: false },
                { id: 2, title: 'Sample Post Title', category: 'Sample', status: 'Draft', date: '02/23/2025', selected: false },
                { id: 3, title: 'Sample Post Title', category: 'News', status: 'Published', date: '02/23/2025', selected: false },
                { id: 4, title: 'Sample Post Title', category: 'Tutorial', status: 'Published', date: '02/23/2025', selected: false },
            ],
            blogSearchQuery: '',
            selectedCategory: '',
            blogCurrentPage: 1,
            blogRowsPerPage: 10,
            articleSelectedCount: 0,
            isArticleModalOpen: false,

            // Column visibility controls
            showCategoryColumn: true,
            showStatusColumn: true,
            showDateColumn: true,

            // Dropdown states
            isCategoryDropdownOpen: false,
            isColumnsDropdownOpen: false
        }
    },

    computed: {
        // Product-related computed properties
        filteredProducts() {
            return this.products.filter(product => {
                const nameMatch = !this.productSearchQuery ||
                    product.name.toLowerCase().includes(this.productSearchQuery.toLowerCase());

                const statusMatch = !this.statusFilter ||
                    (this.statusFilter === 'archived' && product.archived) ||
                    (this.statusFilter === 'featured' && product.featured);

                const categoryMatch = !this.categoryFilter ||
                    product.category.toLowerCase() === this.categoryFilter.toLowerCase();

                return nameMatch && (statusMatch && categoryMatch);
            });
        },

        paginatedProducts() {
            const start = (this.productCurrentPage - 1) * this.productRowsPerPage;
            const end = start + parseInt(this.productRowsPerPage);
            return this.filteredProducts.slice(start, end);
        },

        productTotalPages() {
            return Math.ceil(this.filteredProducts.length / this.productRowsPerPage) || 1;
        },

        productSelectedCount() {
            return this.products.filter(product => product.selected).length;
        },

        // Blog-related computed properties
        filteredArticles() {
            return this.articles.filter(article => {
                const titleMatch = !this.blogSearchQuery ||
                    article.title.toLowerCase().includes(this.blogSearchQuery.toLowerCase());

                const categoryMatch = !this.selectedCategory ||
                    article.category === this.selectedCategory;

                return titleMatch && categoryMatch;
            });
        },

        paginatedArticles() {
            const start = (this.blogCurrentPage - 1) * this.blogRowsPerPage;
            const end = start + parseInt(this.blogRowsPerPage);
            return this.filteredArticles.slice(start, end);
        },

        blogTotalPages() {
            return Math.ceil(this.filteredArticles.length / this.blogRowsPerPage) || 1;
        }
    },

    methods: {
        // Product-related methods
        handleTabChange(tab) {
            this.activeTab = tab;
        },

        // Product pagination methods
        goToProductFirstPage() {
            this.productCurrentPage = 1;
        },

        goToProductPrevPage() {
            if (this.productCurrentPage > 1) {
                this.productCurrentPage--;
            }
        },

        goToProductNextPage() {
            if (this.productCurrentPage < this.productTotalPages) {
                this.productCurrentPage++;
            }
        },

        goToProductLastPage() {
            this.productCurrentPage = this.productTotalPages;
        },

        // Product modal methods
        openAddProductModal() {
            this.isAddProductModalOpen = true;
        },

        closeAddProductModal() {
            this.isAddProductModalOpen = false;
        },

        editProduct(product) {
            this.currentEditProduct = JSON.parse(JSON.stringify(product));
            this.isEditProductModalOpen = true;
        },

        closeEditProductModal() {
            this.isEditProductModalOpen = false;
        },

        handleSaveProduct(newProduct) {
            newProduct.id = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
            newProduct.date = new Date().toISOString().split('T')[0];
            newProduct.selected = false;
            this.products.push(newProduct);
            this.closeAddProductModal();
        },

        handleUpdateProduct(updatedProduct) {
            const index = this.products.findIndex(p => p.id === updatedProduct.id);
            if (index !== -1) {
                this.products[index] = updatedProduct;
            }
            this.closeEditProductModal();
        },

        handleSaveDraft(draft) {
            // This would save to a drafts array in a real application
            console.log('Draft saved:', draft);
            this.closeAddProductModal();
            this.closeEditProductModal();
        },

        deleteProduct(productId) {
            const index = this.products.findIndex(p => p.id === productId);
            if (index !== -1) {
                this.products.splice(index, 1);
            }
        },

        updateSelection(selectedProductIds) {
            this.products.forEach(product => {
                product.selected = selectedProductIds.includes(product.id);
            });
        },

        // Blog-related methods
        toggleCategoryDropdown() {
            this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
            if (this.isCategoryDropdownOpen) {
                this.isColumnsDropdownOpen = false;
            }
        },

        toggleColumnsDropdown() {
            this.isColumnsDropdownOpen = !this.isColumnsDropdownOpen;
            if (this.isColumnsDropdownOpen) {
                this.isCategoryDropdownOpen = false;
            }
        },

        setSelectedCategory(category) {
            this.selectedCategory = category;
            this.isCategoryDropdownOpen = false;
            this.blogCurrentPage = 1; // Reset to first page when filtering
        },

        // Blog pagination methods
        goToBlogFirstPage() {
            this.blogCurrentPage = 1;
        },

        goToBlogPrevPage() {
            if (this.blogCurrentPage > 1) {
                this.blogCurrentPage--;
            }
        },

        goToBlogNextPage() {
            if (this.blogCurrentPage < this.blogTotalPages) {
                this.blogCurrentPage++;
            }
        },

        goToBlogLastPage() {
            this.blogCurrentPage = this.blogTotalPages;
        },

        // Blog article methods
        openArticleModal() {
            this.isArticleModalOpen = true;
        },

        closeArticleModal() {
            this.isArticleModalOpen = false;
        },

        handleSaveArticle(newArticle) {
            newArticle.id = this.articles.length > 0 ? Math.max(...this.articles.map(a => a.id)) + 1 : 1;
            newArticle.date = new Date().toLocaleDateString();
            newArticle.selected = false;
            this.articles.push(newArticle);
            this.closeArticleModal();
        },

        handleArticleSelection(selectedIds) {
            this.articles.forEach(article => {
                article.selected = selectedIds.includes(article.id);
            });
        }
    }
}
</script>