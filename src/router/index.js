import Vue from 'vue'
import Router from 'vue-router'
// import { checkAuth } from '@/api/login'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        name: 'dashboard',
        redirect: '/dashboard',
        meta: {
            title: '主页'
        },
        hidden: true,
        children: [{
                path: '/dashboard',
                component: () =>
                    import ('@/views/dashboard/index')
            },
            {
                path: '/login',
                component: Layout,
                name: 'login',
                hidden: true
            }
        ]
    },
    {
        path: '/mide',
        component: Layout,
        name: '米德在线',
        meta: {
            title: '米德在线'
        },
        children: [{
                path: '/article',
                name: 'article',
                component: () =>
                    import ('@/views/mide/article/index'),
                meta: {
                    title: '文字管理'
                }
            },
            {
                path: '/picture',
                name: 'picture',
                component: () =>
                    import ('@/views/mide/picture/index'),
                meta: {
                    title: '图片管理'
                }
            },
            {
                path: '/course',
                name: 'course',
                component: () =>
                    import ('@/views/mide/course/index'),
                meta: {
                    title: '课程管理'
                },
                children: [{
                    path: '/course/plan',
                    name: 'plan',
                    hidden: true,
                    component: () =>
                        import ('@/views/mide/course/plan/index'),
                    meta: {
                        title: '课程计划'
                    }
                }]
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        name: '用户管理',
        meta: {
            title: '用户管理'
        },
        children: [{
            path: 'index',
            meta: {
                title: '用户管理'
            },
            component: () =>
                import ('@/views/user/index')

        }]
    },
    {
        path: 'external-link',
        component: Layout,
        hidden: true,
        children: [{
            path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
            meta: {
                title: 'External Link',
                icon: 'link'
            }
        }]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})