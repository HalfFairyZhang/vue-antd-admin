import store from '@/store'

//判断是否有权限
export function hasPermission(permission) {
    const perms = store.getters.perms
    return perms.indexOf(permission) > -1
}