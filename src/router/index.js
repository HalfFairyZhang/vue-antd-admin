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
    },
    {
        path: '/documentation',
        component: Layout,
        redirect: 'noRedirect',
        meta: { title: '文档', icon: 'snippets', affix: true },
        children: [
            {
                path: 'index',
                component: () => import('@/views/documentation/index'),
                name: 'Documentation',
                meta: { title: 'Documentation', icon: 'documentation', affix: true }
            }
        ]
    }
]

export const asyncRoutes = [
    {
        path: '/error',
        component: Layout,
        redirect: 'noRedirect',
        name: 'ErrorPages',
        meta: {
            title: '错误页面',
            icon: 'warning'
        },
        children: [
            {
                path: '500',
                component: () => import('@/views/error-page/500'),
                name: 'Page500',
                meta: { title: '500', noCache: true }
            },
            {
                path: '404',
                component: () => import('@/views/error-page/404'),
                name: 'Page404',
                meta: { title: '404', noCache: true }
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: 'noRedirect',
        name: 'user',
        meta: {
            title: '用户管理',
            icon: 'user'
        },
        children: [
            {
                path: 'index',
                component: () => import('@/views/user/index'),
                name: 'user',
                meta: { title: '用户信息', noCache: true }
            },
        ]
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
