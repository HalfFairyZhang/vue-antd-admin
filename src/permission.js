import router from './router'
import store from './store'
import { Message } from 'ant-design-vue'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    document.title = getPageTitle(to.meta.title)
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    await store.dispatch('user/getInfo')
                    const roles = await store.dispatch('menu/queryUserMenu', {})
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                    router.addRoutes(accessRoutes)
                    console.log(to)
                    next({ ...to, replace: true })
                } catch (error) {
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})