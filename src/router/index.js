import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return VueRouterPush.call(this, location, onResolve, onReject)
    return VueRouterPush.call(this, location).catch(err => err)
}

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/403',
        component: () => import('@/views/error-page/403'),
        hidden: true
    },
    {
        path: '/500',
        component: () => import('@/views/error-page/500'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        meta: { title: '工作台', icon: 'dashboard', affix: true },
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: '仪表盘', icon: 'documentation', affix: true }
            }
        ]
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
