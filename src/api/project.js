import request from '@/utils/request'

// 新增項目
export function addProject(params) {
    return request({
        url: '/project/projectCreate',
        method: 'post',
        data:params
    })
}

// 获取所有进行中项目列表
export function projectUpdate(params) {
    return request({
        url: '/project/projectUpdate',
        method: 'get',
        params
    })
}

// 获取所有已归档项目列表
export function finishProjects(params) {
    return request({
        url: '/project/finishProjects',
        method: 'get',
        params
    })
}

// 获取所有已删除项目列表
export function deleteProjects(params) {
    return request({
        url: '/project/deleteProjects',
        method: 'get',
        params
    })
}

// 修改项目状态以及节点信息
export function projectState(params) {
    return request({
        url: '/project/' + params.projectId,
        method: 'post',
        data: params.state
    })
}

// 修改节点状态
export function projectNodeState(params) {
    return request({
        url: '/project/' + params.projectId + "/" +params.nodeId,
        method: 'post',
        data: params.state
    })
}

// 查看项目详情
export function projectDetails(params) {
    return request({
        url: '/project/' + params.projectId,
        method: 'get',
    })
}

//协作邀请表单提交
export function generalLink(params) {
    return request({
        url: '/cooper/generalLink',
        method: 'post',
        data: params
    })
}

// 查看协作任务邀请详情
export function getCooper(params) {
  return request({
      url: '/cooper/' + params.cooperId,
      method: 'get',
  })
}

// 提交协作任务
export function submitCooper(params) {
  return request({
      url: '/cooper/' + params.cooperId,
      method: 'post',
      data:params.requestNode
  })
}