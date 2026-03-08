import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import websiteLayout from '../website/layouts/LayoutOne'
import adminRoutes from './admin'

const routes = [
    ...adminRoutes,
    {
        path: '/',
        name: 'LandingPage',
        component: () => import('../website/pages/LandingPage.vue'),
        meta: { layout: websiteLayout }
    },
    {
        path: '/countries',
        name: 'CountriesPage',
        component: () => import('../website/pages/CountriesPage.vue'),
        meta: { layout: websiteLayout }
    },
    {
        path: '/program/:id',
        name: 'ServiceDetailsPage',
        component: () => import('../website/pages/ServiceDetailsPage.vue'),
        meta: { layout: websiteLayout }
    },
    {
        path: '/country/:id',
        name: 'CountryDetailsPage',
        component: () => import('../website/pages/CountryDetailsPage.vue'),
        meta: { layout: websiteLayout }
    },
    {
        path: '/contact',
        name: 'ContactPage',
        component: () => import('../website/pages/ContactPage.vue'),
        meta: { layout: websiteLayout }
    },
    {
        path: '/faq',
        name: 'FaqPage',
        component: () => import('../website/pages/FaqPage.vue'),
        meta: { layout: websiteLayout }
    },
    {
        path: '/:pathmatch(.*)*',
        name: 'notFound',
        component: () => import('../website/pages/NotFound.vue'),
        meta: { layout: websiteLayout }
    }
]

var router = createRouter({
    history: createWebHistory('/'),
    routes
})


function isLoggedIn()
{
    return localStorage.getItem('token')
}

router.beforeEach((to, from, next) => {
   if(to.matched.some(record => record.meta.requiresAuth)) {
     if(!isLoggedIn()) {
        next({
            name: 'loginPage'
        })
     } else {
        next()
     }
   } else if(to.matched.some(record => record.meta.isAuthenticated)) {
     if(isLoggedIn()) {
        next({
            name: 'dashboardPage'
        })
     } else {
        next()
     }
   } else {
     next()
   }
})

export default router