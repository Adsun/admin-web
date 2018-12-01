import request from '@/utils/request'
// 获取供应商列表数据
export function getList(params) {
  return request({
    url: '/supplier/supplierList',
    method: 'get',
    params
  })
}

// 获取省市区
export function getAreaList(params) {
  return request({
    url: '/supplier/area',
    method: 'get',
    params
  })
}

// 获取结算方式/附加服务/行业/品牌
export function getConstantList(params) {
  return request({
    url: '/supplier/constant',
    method: 'get',
    params
  })
}

// 新增供应商
export function addSupplier(params) {
  return request({
    url: '/supplier/supplierCreate',
    method: 'post',
    data: params
  })
}
// 编辑供应商
export function editSupplier(params) {
  return request({
    url: '/supplier/' + params.id,
    method: 'post',
    data: params
  })
}
// 供应商详情
export function getSupplier(params) {
  return request({
    url: '/supplier/' + params.supplierId,
    method: 'get'
  })
}
// 删除供应商
export function deleteSupplier(params) {
  return request({
    url: '/supplier/' + params.suplierId,
    method: 'delete'
  })
}

// 附件列表
export function getFileList(params) {
  return request({
    url: '/supplier/addFileList',
    method: 'get',
    params
  })
}

