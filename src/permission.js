import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
// import { getToken } from '@/utils/auth' // 验权

// const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
    NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
  } else {
    store.dispatch('CheckAuth').then(res => { // 拉取用户信息
      if (res.code === 200) {
        sessionStorage['fullName'] = res.data
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }).catch(() => {
      next({
        path: '/login'
      })
    })
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
