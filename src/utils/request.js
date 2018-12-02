import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
// import { getToken } from '@/utils/auth'
axios.defaults.withCredentials = true
    // 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 5000 // 请求超时时间
})

// request拦截器
// service.interceptors.request.use(
//   config => {
//     debugger
//     // if (store.getters.token) {
//     //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//     // }
//     config.credentials = true
//
//     return config
//   },
//   error => {
//     // Do something with request error
//     console.log(error) // for debug
//     Promise.reject(error)
//   }
// )

// // response 拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data
        debugger
        if (response.config.url.indexOf('checkAuth') === -1) {
            if (res.code !== 200) {
                // 503代表登陆失效
                if (res.code === 503) {
                    MessageBox.confirm(
                        '你已被登出，可以取消继续留在该页面，或者重新登录',
                        '确定登出', {
                            confirmButtonText: '重新登录',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }
                    ).then(() => {
                        store.dispatch('FedLogOut').then(() => {
                            location.href = '/login'
                                // location.reload() // 为了重新实例化vue-router对象 避免bug
                        })
                    })
                } else {
                    return Promise.reject(res.desc)
                }
            }
        }
        return response.data
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service