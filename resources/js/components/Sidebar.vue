<template>
    <div class="h-full w-64 fixed left-0 top-0 bg-gray-900 text-white">
        <div class="p-6">
            <div class="flex items-center mb-8">
                <div class="text-xl font-bold flex items-center">
                    OTGGG
                </div>
            </div>

            <div class="mt-12">
                <div class="text-xs font-semibold text-gray-400 mb-4">MENU</div>

                <router-link v-for="(item, index) in menuItems" :key="index" :to="item.path"
                    class="flex items-center py-3 px-4 rounded-lg mb-1 hover:bg-teal-500/20 transition-colors"
                    :class="{ 'bg-gradient-to-r from-teal-500/30 to-teal-400/10 text-white': isActivePath(item.path) }">
                    <component :is="item.icon" class="h-5 w-5 mr-3" />
                    <span>{{ item.name }}</span>
                    <div v-if="item.notifications"
                        class="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {{ item.notifications }}
                    </div>
                </router-link>
            </div>

            <div class="mt-10">
                <div class="text-xs font-semibold text-gray-400 mb-4">OTHERS</div>

                <router-link v-for="(item, index) in otherItems" :key="index" :to="item.path"
                    class="flex items-center py-3 px-4 rounded-lg mb-1 hover:bg-teal-500/20 transition-colors"
                    :class="{ 'bg-gradient-to-r from-teal-500/30 to-teal-400/10 text-white': isActivePath(item.path) }">
                    <component :is="item.icon" class="h-5 w-5 mr-3" />
                    <span>{{ item.name }}</span>
                    <div v-if="item.notifications"
                        class="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {{ item.notifications }}
                    </div>
                </router-link>
            </div>
        </div>

        <div class="absolute bottom-8 left-4 right-4">
            <div class="bg-gray-800 rounded-xl p-4">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mr-3">
                        <img v-if="user.avatar" :src="user.avatar" class="w-10 h-10 rounded-full" :alt="user.name">
                        <span v-else>{{ getInitials(user.name) }}</span>
                    </div>
                    <div>
                        <div class="font-medium">{{ user.name }}</div>
                        <button class="text-xs text-gray-400 flex items-center hover:text-teal-400">
                            View Profile <span class="ml-1">›</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            user: {
                name: '',
                avatar: null
            },
            menuItems: [
                { name: 'Overview', path: '/', icon: 'HomeIcon' },
                { name: 'Products', path: '/products', icon: 'ShoppingBagIcon' },
                { name: 'Order', path: '/order', icon: 'ShoppingCartIcon' },
                { name: 'Customer', path: '/customer', icon: 'CreditCardIcon' },
                { name: 'Review', path: '/review', icon: 'DocumentTextIcon' },
                { name: 'Reports', path: '/reports', icon: 'DocumentTextIcon' },
            ],
            otherItems: [
                { name: 'Settings', path: '/settings', icon: 'CogIcon' },
                { name: 'Messages', path: '/messages', icon: 'ChatIcon',},
                { name: 'Help & Support', path: '/support', icon: 'SupportIcon' },
            ]
        };
    },
    methods: {
        isActivePath(path) {
            return this.$route.path === path;
        },
        getInitials(name) {
            return name.split(' ').map(n => n[0]).join('');
        }
    },
    components: {
        HomeIcon: {
            template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>'
        },
        ShoppingBagIcon: {
            template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'
        },
        ShoppingCartIcon: {
            template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>'
        },
        CreditCardIcon: {
            template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>'
        },
        DocumentTextIcon: {
            template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
        },
        CogIcon: {
            template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>'
        },
        ChatIcon: {
            template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>'
        },
        SupportIcon: {
            template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
        }
    }
};
</script>