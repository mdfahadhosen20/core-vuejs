import adminLayout from '@/admin/layouts/LayoutOne.vue'
import neutralLayout from '@/admin/layouts/LayoutTwo.vue'

export default [
    {
        path: '/admin/login',
        name: 'LoginPage',
        component: () => import('@/admin/modules/LoginPage'),
        meta: { layout: neutralLayout, isAuthenticated: true }
    },
    {
        path: '/admin/dashboard',
        name: 'DashboardPage',
        component: () => import('@/admin/modules/DashboardPage'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/programs',
        name: 'ProgramModule',
        component: () => import('@/admin/modules/services/ProgramModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/specializations',
        name: 'SpecializationModule',
        component: () => import('@/admin/modules/services/SpecializationModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/services',
        name: 'ServiceModule',
        component: () => import('@/admin/modules/services/ServiceModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/countries',
        name: 'CountryModule',
        component: () => import('@/admin/modules/services/CountryModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/universities',
        name: 'UniversityModule',
        component: () => import('@/admin/modules/UniversityModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/country/:id/programs',
        name: 'CountryProgramModule',
        component: () => import('@/admin/modules/services/CountryProgramModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/carousel',
        name: 'CarouselModule',
        component: () => import('@/admin/modules/website/CarouselModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/faqs',
        name: 'FaqModule',
        component: () => import('@/admin/modules/website/FaqModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/offers',
        name: 'OfferModule',
        component: () => import('@/admin/modules/website/OfferModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/appointments',
        name: 'AppointmentModule',
        component: () => import('@/admin/modules/AppointmentModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/contacts',
        name: 'ContactModule',
        component: () => import('@/admin/modules/ContactModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/general-services',
        name: 'GeneralServiceModule',
        component: () => import('@/admin/modules/services/GeneralServiceModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/settings',
        name: 'SettingsModule',
        component: () => import('@/admin/modules/auth/SettingsModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    },
    {
        path: '/admin/dashboard/setup',
        name: 'SetupModule',
        component: () => import('@/admin/modules/SetupModule'),
        meta: { layout: adminLayout, requiresAuth:true }
    }
];