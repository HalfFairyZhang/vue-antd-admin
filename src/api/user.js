import request from '@/utils/request'

/**
 * 用户登录
 */
export function login(data) {
  return request({
    url: '/web-api/account/login',
    method: 'post',
    data
  })
}

/**
 * 获取当前登录用户信息
 */
export function getInfo() {
  return request({
    url: '/account/info',
    method: 'get'
  })
}

/**
 * 退出登录
 */
export function logout() {
  return request({
    url: '/account/logout',
    method: 'post'
  })
}

/**
 * 用户分页列表
 * @param {参数} params 
 */
export function queryList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

/**
 * 用户下拉列表
 * @param {参数} params 
 */
export function querySelect(params) {
  return request({
      url: '/user/select',
      method: 'get',
      params
  })
}

/**
* 用户信息
* @param {主键} id 
*/
export function queryInfo(id) {
  return request({
    url: `/user/info/${id}`,
    method: 'get'
  })
}

/**
* 新增用户信息
* @param {数据} data 
*/
export function saveUser(data) {
  return request({
    url: '/user/save',
    method: 'post',
    data
  })
}

/**
* 修改用户信息
* @param {数据} data 
*/
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

/**
* 删除用户信息
* @param {主键} id 
*/
export function deleteUser(id) {
  return request({
    url: `/user/delete/${id}`,
    method: 'delete'
  })
}