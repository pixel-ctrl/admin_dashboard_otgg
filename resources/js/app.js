import { createApp } from 'vue';
import App from './app.vue';
import router from './routes';

// Create Vue app
const app = createApp(App);

// Use router
app.use(router);

// Mount app
app.mount('#app');

