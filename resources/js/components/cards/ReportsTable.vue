<template>
    <!-- Table -->
    <div class="bg-gray-800 rounded-lg shadow-xl">
        <table class="min-w-full divide-y divide-gray-700">
            <thead>
                <tr class="bg-gray-800">
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Full Name
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Subject
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date
                        Received</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
                <tr v-if="loading" class="border-b border-gray-700">
                    <td colspan="14" class="text-center py-6 text-gray-400">Loading Reports...</td>
                </tr>
                <tr v-else-if="reports.length === 0" class="border-b border-gray-700">
                    <td colspan="14" class="text-center py-6 text-gray-400">No Reports found</td>
                </tr>
                <tr v-for="report in reports" :key="report.id" class="hover:bg-gray-700">
                    <td class="px-4 py-4 text-sm">{{ report.name }}</td>
                    <td class="px-4 py-4 text-sm text-gray-400">{{ report.phone }}</td>
                    <td class="px-4 py-4 text-sm text-gray-400">{{ report.email }}</td>
                    <td class="px-4 py-4 text-sm">{{ report.subject }}</td>
                    <td class="px-4 py-4 text-sm">
                        <span :class="{
                            'py-1 px-2.5 rounded-full text-sm font-medium': true,
                            'bg-blue-900/50 text-blue-400': report.status === 'New',
                            'bg-purple-900/50 text-purple-400': report.status === 'Received',
                            'bg-green-900/50 text-green-400': report.status === 'Resolved'
                        }">
                            {{ report.status }}
                        </span>
                    </td>
                    <td class="px-4 py-4 text-sm text-gray-400">{{ report.date }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <div class="group inline-block relative">
                            <button class="text-gray-400 hover:text-teal-500" @click="toggleDropdown(reports.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                            <div v-if="activeDropdown === reports.id"
                                class="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                                <div class="py-1">
                                    <button @click="respondToReports(reports)"
                                        class="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">
                                        Response
                                    </button>
                                    <button @click="deleteReports(reports)"
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
    name: 'ReportsTable',
    props: {
        reports: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            activeDropdown: null
        };
    },
    computed: {
        allSelected() {
            return this.reports.length > 0 && this.reports.every(report => report.selected);
        }
    },
    methods: {
        toggleSelectAll(event) {
            const isChecked = event.target.checked;
            this.reports.forEach(report => {
                report.selected = isChecked;
                this.$emit('toggle-select', report.id);
            });
        },
        toggleDropdown(id) {
            if (this.activeDropdown === id) {
                this.activeDropdown = null;
            } else {
                this.activeDropdown = id;
            }
        },
        respondToReports(reports) {
            this.$emit('respond', reports);
            this.activeDropdown = null;
        },
        deleteReports(reports) {
            this.$emit('delete', reports);
            this.activeDropdown = null;
        },
        closeDropdownOnOutsideClick(event) {
            if (!event.target.closest('button')) {
                this.activeDropdown = null;
            }
        },
        showOptions(reportId) {
            // Implement action menu functionality here
            console.log('Show options for report:', reportId);
        }
    }
};
</script>