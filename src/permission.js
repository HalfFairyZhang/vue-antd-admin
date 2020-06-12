import router from './router'
import store from './store'
import { Message } from 'ant-design-vue'
// import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    document.title = getPageTitle(to.meta.title)
    const hasToken = true;//getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            console.log(hasRoles)
            if (hasRoles) {
                next()
            } else {
                try {
                    const roles = await store.dispatch('user/getInfo')
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                    router.addRoutes(accessRoutes)
                    next({ ...to, replace: true })
                } catch (error) {
                    console.log(error)
                    // await store.dispatch('user/resetToken')
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