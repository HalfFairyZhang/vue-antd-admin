import request from '@/utils/request'


/**
 * 角色分页列表
 * @param {参数} params 
 */
export function queryList(params) {
    return request({
        url: '/role/list',
        method: 'get',
        params
    })
}

/**
 * 角色下拉列表
 * @param {参数} params 
 */
export function querySelect(params) {
    return request({
        url: '/role/select',
        method: 'get',
        params
    })
}

/**
 * 角色信息
 * @param {主键} id 
 */
export function queryInfo(id) {
    return request({
        url: `/role/info/${id}`,
        method: 'get'
    })
}

/**
 * 新增角色
 * @param {数据} data 
 */
export function saveRole(data) {
    return request({
        url: '/role/save',
        method: 'post',
        data
    })
}

/**
 * 修改角色
 * @param {数据} data 
 */
export function updateRole(data) {
    return request({
        url: '/role/update',
        method: 'post',
        data
    })
}

/**
 * 删除角色
 * @param {主键} id 
 */
export function deleteRole(id) {
    return request({
        url: `/role/delete/${id}`,
        method: 'delete'
    })
}