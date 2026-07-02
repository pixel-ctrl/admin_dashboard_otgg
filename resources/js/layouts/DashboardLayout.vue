<template>
    <div class="flex h-screen w-full bg-gray-100 dark:bg-gray-900">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Content -->
        <div class="flex-1 ml-64">
            <div class="p-6 h-full overflow-auto">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
    name: 'DashboardLayout',
    components: {
        Sidebar
    }
};
</script>