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