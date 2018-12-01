import request from '@/utils/request'
// 新增联系人数据
export function add(params) {
  return request({
    url: '/contact/update',
    method: 'post',
    data: params
  })
}

// 获取所有员工数据
export function getUser(params) {
  return request({
    url: '/project/user',
    method: 'get',
    params
  })
}

// 获取联系人详情
export function getContact(params) {
  return request({
    url: '/contact/get',
    method: 'get',
    params
  })
}

// 更新附件状态
export function updateFile(params) {
  return request({
    url: '/addFile/update',
    method: 'post',
    data: params
  })
}

// 下载附件 暂未用到
export function downloadFile(params) {
  debugger
  return request({
    url: '/addFile/download',
    method: 'get',
    params
  })
}
