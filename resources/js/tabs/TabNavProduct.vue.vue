<template>
    <div class="relative border-b border-gray-700 mb-6">
        <div class="flex">
            <button @click="activeTab = 'products'" class="relative px-6 py-3 text-sm font-medium transition-colors"
                :class="activeTab === 'products' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'">
                Products
                <span v-if="productsCount"
                    class="ml-2 bg-teal-400/20 text-teal-400 px-2 py-0.5 rounded-full text-xs">
                    {{ productsCount }}
                </span>
                <div v-if="activeTab === 'products'" class="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400"></div>
            </button>

            <button @click="activeTab = 'blog'" class="relative px-6 py-3 text-sm font-medium transition-colors"
                :class="activeTab === 'blog' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'">
                Blog
                <span v-if="blogCount" class="ml-2 bg-teal-400/20 text-teal-400 px-2 py-0.5 rounded-full text-xs">
                    {{ blogCount }}
                </span>
                <div v-if="activeTab === 'blog'" class="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400"></div>
            </button>

            <button @click="activeTab = 'draft'" class="relative px-6 py-3 text-sm font-medium transition-colors"
                :class="activeTab === 'draft' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'">
                Draft
                <span v-if="draftCount" class="ml-2 bg-teal-400/20 text-teal-400 px-2 py-0.5 rounded-full text-xs">
                    {{ draftCount }}
                </span>
                <div v-if="activeTab === 'draft'" class="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400"></div>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabNavProduct',
    props: {
        productsCount: {
            type: Number,
            default: 0
        },
        blogCount: {
            type: Number,
            default: 0
        },
        draftCount: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            activeTab: 'products'
        }
    },
    watch: {
        activeTab(newTab) {
            this.$emit('tab-change', newTab);
        }
    }
}
</script>