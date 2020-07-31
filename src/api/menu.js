import request from '@/utils/request'

/**
 * 当前登录所属菜单
 */
export function userMenuList() {
    return request({
        url: '/menu/userMenuList',
        method: 'get'
    })
}

/**
 * 菜单列表
 * @param {参数} params 
 */
export function queryList(params) {
    return request({
        url: '/menu/list',
        method: 'get',
        params
    })
}

/**
 * 菜单信息
 * @param {主键} id 
 */
export function queryInfo(id) {
    return request({
        url: `/menu/info/${id}`,
        method: 'get'
    })
}

/**
 * 新增菜单
 * @param {数据} data 
 */
export function saveMenu(data) {
    return request({
        url: '/menu/save',
        method: 'post',
        data
    })
}

/**
 * 修改菜单
 * @param {数据} data 
 */
export function updateMenu(data) {
    return request({
        url: '/menu/update',
        method: 'post',
        data
    })
}

/**
 * 删除菜单
 * @param {主键} id 
 */
export function deleteMenu(id) {
    return request({
        url: `/menu/delete/${id}`,
        method: 'delete'
    })
}