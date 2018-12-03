import request from '@/utils/request'
import md5 from 'js-md5'

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
  params.passWord = md5(params.passWord)
  return request({
    url: '/userManager',
    method: 'post',
    data: params
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
