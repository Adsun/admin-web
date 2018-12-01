import request from '@/utils/request'
// 用户日志列表
export function userHandleLog() {
  return request({
    url: '/userHandleLog',
    method: 'get'
  })
}
