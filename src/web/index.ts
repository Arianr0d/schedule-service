import {
    createApp,
    defineComponent,
    h
} from 'vue'

import { createPinia } from 'pinia'

import {
    RouterLink,
    RouterView,
    createRouter,
    createWebHistory
} from 'vue-router'

import vuetifyPlugin from './plugins/vuetify'

import { useUserStore } from './stores/user'

import AuthorizationPage from './pages/AuthorizationPage.vue'

const pinia = createPinia()
const vuetify = vuetifyPlugin

const Home = defineComponent({
    setup () {
        return () => [
            h('h1', 'Home!'),
            h(RouterLink, {
                to: '/about'
            }, () => 'About')
        ]
    }
})

const About = defineComponent({
    setup () {
        return () => [
            h('h1', 'About!'),
            h(RouterLink, {
                to: '/'
            }, () => 'Home')
        ]
    }
})

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: AuthorizationPage
    }
]

const router = createRouter({
    history: createWebHistory(), 
    routes
})

router.beforeEach(async (to) => {
    const loginPages = ['/login']
    const authRequired = !loginPages.includes(to.path)
    const auth = useUserStore()

    /*if (authRequired && !auth.login()) {
        auth.returnUrl = to.fullPath
        return '/login'
    }*/
})

const app = createApp({
    setup () {
        return () => h(RouterView) 
    }
})

app.use(pinia)
app.use(vuetify)
app.use(router)

app.mount('#app')
