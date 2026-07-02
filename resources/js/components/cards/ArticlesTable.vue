<template>
    <div class="bg-gray-800 rounded-lg overflow-hidden">
        <table class="w-full">
            <thead>
                <tr class="border-b border-gray-700">
                    <th class="w-8 px-6 py-3 text-left">
                        <input type="checkbox" class="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-0" />
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Name
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Category
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                    </th>
                    <th class="w-8 px-6 py-3"></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
                <tr v-for="(article, index) in articles" :key="index" class="hover:bg-gray-700">
                    <td class="px-6 py-4">
                        <input type="checkbox" class="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-0"
                            v-model="article.selected" @change="updateSelectedCount" />
                    </td>
                    <td class="px-6 py-4">
                        {{ article.title }}
                    </td>
                    <td class="px-6 py-4">
                        {{ article.category }}
                    </td>
                    <td class="px-6 py-4">
                        <span :class="getStatusClass(article.status)" class="px-2 py-1 text-xs rounded-full">
                            {{ article.status }}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-400">
                        {{ article.date }}
                    </td>
                    <td class="px-6 py-4 text-right">
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
    name: 'ArticleTable',
    props: {
        articles: {
            type: Array,
            required: true
        }
    },
    emits: ['update:selectedCount'],
    methods: {
        getStatusClass(status) {
            if (status === 'Published') {
                return 'bg-green-900 text-green-300';
            } else if (status === 'Draft') {
                return 'bg-gray-700 text-gray-300';
            } else if (status === 'Archived') {
                return 'bg-blue-900 text-blue-300';
            }
            return '';
        },
        updateSelectedCount() {
            const count = this.articles.filter(article => article.selected).length;
            this.$emit('update:selectedCount', count);
        }
    }
}
</script>