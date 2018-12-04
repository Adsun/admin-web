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

export function editArticle(params) {
  return request({
    url: '/article',
    method: 'post',
    data: params
  })
}

export function deleteArticle(params) {
  return request({
    url: '/article',
    method: 'delete',
    params
  })
}

export function getPictureList(params) {
  return request({
    url: '/picture',
    method: 'get',
    params
  })
}

export function editPicture(params) {
  return request({
    url: '/picture',
    method: 'post',
    data: params
  })
}

export function deletePicture(params) {
  return request({
    url: '/picture',
    method: 'delete',
    params
  })
}

export function getCourseList(params) {
  return request({
    url: '/course',
    method: 'get',
    params
  })
}

export function editCourse(params) {
  return request({
    url: '/course',
    method: 'post',
    data: params
  })
}

export function deleteCourse(params) {
  return request({
    url: '/course',
    method: 'delete',
    params
  })
}

export function getCoursePlanList(params) {
  return request({
    url: '/course/plan',
    method: 'get',
    params
  })
}

export function editCoursePlan(params) {
  return request({
    url: '/course/plan',
    method: 'post',
    data: params
  })
}

export function deleteCoursePlan(params) {
  return request({
    url: '/course/plan',
    method: 'delete',
    params
  })
}

export function getResourceList(params) {
  return request({
    url: '/resource',
    method: 'get',
    params
  })
}

export function editResource(params) {
  return request({
    url: '/resource',
    method: 'post',
    data: params
  })
}

export function deleteResource(params) {
  return request({
    url: '/resource',
    method: 'delete',
    params
  })
}

export function getJobList(params) {
  return request({
    url: '/job',
    method: 'get',
    params
  })
}

export function editJob(params) {
  return request({
    url: '/job',
    method: 'post',
    data: params
  })
}

export function deleteJob(params) {
  return request({
    url: '/job',
    method: 'delete',
    params
  })
}

export function getFeedbackList(params) {
  return request({
    url: '/feedback',
    method: 'get',
    params
  })
}

export function deleteFeedback(params) {
  return request({
    url: '/feedback',
    method: 'delete',
    params
  })
}
