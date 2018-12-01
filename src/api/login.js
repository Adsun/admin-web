import request from '@/utils/request'
// 登陆
export function login(userName, loginMsg, rememberMe) {
    return request({
        url: '/login',
        method: 'post',
        data: {
            userName,
            loginMsg,
            rememberMe
        }
    })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// 登出
export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}
// 判断登录状态
export function checkAuth() {
    return request({
        url: '/checkAuth',
        method: 'get'
    })
}