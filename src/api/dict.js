import request from '@/utils/request'


/**
 * 字典分页列表
 * @param {参数} params 
 */
export function queryList(params) {
    return request({
        url: '/dict/list',
        method: 'get',
        params
    })
}

/**
 * 字典下拉列表
 * @param {参数} params 
 */
export function querySelect(params) {
    return request({
        url: '/dict/select',
        method: 'get',
        params
    })
}

/**
 * 字典信息
 * @param {主键} id 
 */
export function queryInfo(id) {
    return request({
        url: `/dict/info/${id}`,
        method: 'get'
    })
}

/**
 * 新增字典
 * @param {数据} data 
 */
export function saveDict(data) {
    return request({
        url: '/dict/save',
        method: 'post',
        data
    })
}

/**
 * 修改字典
 * @param {数据} data 
 */
export function updateDict(data) {
    return request({
        url: '/dict/update',
        method: 'post',
        data
    })
}

/**
 * 删除字典
 * @param {主键} id 
 */
export function deleteDict(id) {
    return request({
        url: `/dict/delete/${id}`,
        method: 'delete'
    })
}