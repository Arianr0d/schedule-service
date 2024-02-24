
import { createPinia } from 'pinia';
import {
	createApp,
	h
} from 'vue';
import {
	RouterView,
	createRouter,
	createWebHistory
} from 'vue-router';
import AuthorizationPage from './pages/AuthorizationPage.vue';
import HomePage from './pages/HomePage.vue';
import vuetifyPlugin from './plugins/vuetify';

const pinia = createPinia();
const vuetify = vuetifyPlugin;

const routes = [
	{
		path: '/',
		component: HomePage
	},
	{
		path: '/login',
		component: AuthorizationPage
	}
];

const router = createRouter({
	history: createWebHistory(), 
	routes
});

/*router.beforeEach(async (to) => {
    const loginPages = ['/login']
    const authRequired = !loginPages.includes(to.path)
    const auth = useUserStore()

    if (authRequired && !auth.login()) {
        auth.returnUrl = to.fullPath
        return '/login'
    }
})*/

const app = createApp({
	setup () {
		return () => h(RouterView); 
	}
});

app.use(pinia);
app.use(vuetify);
app.use(router);

app.mount('#app');
