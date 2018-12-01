import request from '@/utils/request'

// 获取供应商列表数据
export function updateConstant(params) {
  return request({
    url: '/constantManager',
    method: 'post',
    params
  })
}
// 获取权限管理列表数据-->用户新增或编辑权限
export function getUserLimit(params) {
  return request({
    url: '/permissionManager',
    method: 'get',
    params
  })
}
// 获取用户列表数据
export function getUserList(params) {
  return request({
    url: '/userManager',
    method: 'get',
    params
  })
}
// 新增修改用户信息
export function addUser(params) {
  return request({
    url: '/userManager',
    method: 'post',
    data: params
  })
}

// 权限页面列表
export function getLimits(params) {
  return request({
    url: '/userManager/basePermission',
    method: 'get'
  })
}
// 删除用户
export function deleteUser(params) {
  return request({
    url: '/userManager',
    method: 'delete',
    params
  })
}
// 更新用户页面编辑查看权限
export function updateUserLimit(params) {
  debugger
  return request({
    url: '/permissionManager',
    method: 'post',
    data: params
  })
}

