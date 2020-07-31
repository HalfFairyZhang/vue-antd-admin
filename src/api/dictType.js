import request from '@/utils/request'

/**
 * 字典类型分页列表
 * @param {参数} params 
 */
export function queryList(params) {
    return request({
        url: '/dictType/list',
        method: 'get',
        params
    })
}

/**
 * 字典类型下拉列表
 * @param {参数} params 
 */
export function querySelect(params) {
    return request({
        url: '/dictType/select',
        method: 'get',
        params
    })
}

/**
 * 字典类型信息
 * @param {主键} id 
 */
export function queryInfo(id) {
    return request({
        url: `/dictType/info/${id}`,
        method: 'get',
    })
}

/**
 * 新增字典类型
 * @param {数据} data 
 */
export function saveDictType(data) {
    return request({
        url: '/dictType/save',
        method: 'post',
        data
    })
}

/**
 * 修改字典类型
 * @param {数据} data 
 */
export function updateDictType(data) {
    return request({
        url: '/dictType/update',
        method: 'post',
        data
    })
}

/**
 * 删除字典类型
 * @param {主键} id 
 */
export function deleteDictType(id) {
    return request({
        url: `/dictType/delete/${id}`,
        method: 'delete'
    })
}