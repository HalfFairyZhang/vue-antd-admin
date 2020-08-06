import request from '@/utils/request'


/**
 * 计划任务分页列表
 * @param {参数} params 
 */
export function queryList(params) {
    return request({
        url: '/scheduleJob/list',
        method: 'get',
        params
    })
}

/**
 * 任务日志分页列表
 * @param {参数} params 
 */
export function queryLogList(params) {
    return request({
        url: '/scheduleJobLog/list',
        method: 'get',
        params
    })
}

/**
 * 计划任务信息
 * @param {主键} id 
 */
export function queryInfo(id) {
    return request({
        url: `/scheduleJob/info/${id}`,
        method: 'get'
    })
}

/**
 * 任务日志信息
 * @param {主键} id 
 */
export function queryLogInfo(id) {
    return request({
        url: `/scheduleJobLog/info/${id}`,
        method: 'get'
    })
}

/**
 * 新增计划任务
 * @param {数据} data 
 */
export function saveSchedule(data) {
    return request({
        url: '/scheduleJob/save',
        method: 'post',
        data
    })
}

/**
 * 修改计划任务
 * @param {数据} data 
 */
export function updateSchedule(data) {
    return request({
        url: '/scheduleJob/update',
        method: 'post',
        data
    })
}

/**
 * 删除计划任务
 * @param {主键} id 
 */
export function deleteSchedule(id) {
    return request({
        url: `/scheduleJob/delete/${id}`,
        method: 'delete'
    })
}

/**
 * 删除任务日志
 * @param {主键} id 
 */
export function deleteScheduleLog(id) {
    return request({
        url: `/scheduleJobLog/delete/${id}`,
        method: 'delete'
    })
}