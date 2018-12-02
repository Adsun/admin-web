import request from '@/utils/request'
import md5 from 'js-md5'
// 登陆
export function login(userName, loginMsg, rememberMe) {
    const passWord = md5(loginMsg)
    return request({
        url: '/login',
        method: 'post',
        data: {
            userName,
            passWord,
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