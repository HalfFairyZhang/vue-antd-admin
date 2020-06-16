import store from '@/store'

//控制按钮显示权限
export function hasBtnPermission(permission) {
    const myBtns = store.getters.buttons
    return myBtns.indexOf(permission) > -1
}