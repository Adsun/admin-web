import request from '@/utils/request'

// 获取用户列表数据
export function getConstantList(params) {
  return request({
    url: '/userManager',
    method: 'get',
    params
  })
}
