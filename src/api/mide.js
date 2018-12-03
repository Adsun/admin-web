import request from '@/utils/request'

export function getConstantList(params) {
    debugger
  return request({
    url: '/constant',
    method: 'get',
    params
  })
}
export function getArticleList(params) {
    debugger
  return request({
    url: '/article',
    method: 'get',
    params
  })
}
