import {
  login,
  logout,
  checkAuth
} from '@/api/login'

const user = {
  state: {},
  mutations: {},

  actions: {
    // 登录
    Login(commit, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.rememberMe).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    CheckAuth(commit) {
      return new Promise((resolve, reject) => {
        checkAuth().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit
    }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
