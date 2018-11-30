import request from '@/utils/request'

export function login(userName, passWord) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      userName,
      passWord
    }
  })
}

export function checkAuth() {
  return request({
    url: '/checkAuth',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
