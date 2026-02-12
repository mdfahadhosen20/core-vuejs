import adminLayout from '@/admin/layouts/LayoutOne.vue'
import neutralLayout from '@/admin/layouts/LayoutTwo.vue'

export default [
    {
        path: '/admin/login',
        name: 'LoginPage',
        component: () => import('@/admin/modules/LoginPage'),
        meta: { layout: neutralLayout }
    },
    {
        path: '/admin/dashboard',
        name: 'DashboardPage',
        component: () => import('@/admin/modules/DashboardPage'),
        meta: { layout: adminLayout }
    },
    {
        path: '/admin/dashboard/services',
        name: 'ServiceModule',
        component: () => import('@/admin/modules/services/ServiceModule'),
        meta: { layout: adminLayout }
    },
    {
        path: '/admin/dashboard/countries',
        name: 'CountryModule',
        component: () => import('@/admin/modules/services/CountryModule'),
        meta: { layout: adminLayout }
    }
];