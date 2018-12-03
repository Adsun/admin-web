import request from '@/utils/request'

export function getConstantList(params) {
  return request({
    url: '/constant',
    method: 'get',
    params
  })
}
export function getArticleList(params) {
  return request({
    url: '/article',
    method: 'get',
    params
  })
}
