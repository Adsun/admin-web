import Vue from 'vue'
import Router from 'vue-router'
// import { checkAuth } from '@/api/login'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import store from '../store'

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
        meta: { title: '主页' },
        beforeEnter: (to, form, next) => {
            store.dispatch('CheckAuth').then((resolve) => {
                // $router.push({path: '/dashboard'})
                // debugger
                sessionStorage['fullName'] = resolve.data[0].fullName
                next()
            }).catch(() => {
                console.log('error')
                next('/login')
            })
        },
        hidden: true,
        children: [{
                path: 'dashboard',
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
        path: '/supplier',
        component: Layout,
        name: 'Supplier',
        redirect: '/supplierList',
        meta: { title: '供应商管理' },
        children: [{
                path: '/createSupplier',
                name: 'createSupplier',
                component: () =>
                    import ('@/views/supplier/createSupplier/index'),
                meta: { title: '新建供应商' }
            },
            {
                path: '/supplierList/edit/:id(\\d+)',
                name: 'editSupplier',
                component: () =>
                    import ('@/views/supplier/editSupplier/index'),
                meta: { title: '修改供应商' },
                hidden: true
            },
            {
                path: '/supplierList',
                name: 'SupplierList',
                component: () =>
                    import ('@/views/supplier/supplierList/index'),
                meta: { title: '供应商列表' }
            },
            {
                path: '/appendixList',
                name: 'ApendixList',
                component: () =>
                    import ('@/views/supplier/appendixList/index'),
                meta: { title: '附件列表' }
            }
        ]
    },
    {
        path: '/project',
        component: Layout,
        redirect: '/newProject',
        name: 'Project',
        meta: { title: '项目管理' },
        children: [{
                path: '/newProject',
                name: 'NewProject',
                component: () =>
                    import ('@/views/project/newProject'),
                meta: { title: '新建项目' }
            },
            {
                path: '/going',
                name: 'Going',
                component: () =>
                    import ('@/views/project/going'),
                meta: { title: '进行中项目' }
            },
            {
                path: '/update',
                name: 'Update',
                component: () =>
                    import ('@/views/project/update'),
                meta: { title: '更新项目' },
                hidden: true
            },
            {
                path: '/already',
                name: 'Already',
                component: () =>
                    import ('@/views/project/already'),
                meta: { title: '已归档项目' }
            },
            {
                path: '/delete',
                name: 'Delete',
                component: () =>
                    import ('@/views/project/delete/index'),
                meta: { title: '已删除项目' }
            },
            {
                path: '/invitation',
                name: 'Invitation',
                component: () =>
                    import ('@/views/project/invitation/index'),
                meta: { title: '协作邀请' }
            },
            {
                path: '/projectList/edit/:id(\\d+)',
                name: 'editProject',
                component: () =>
                    import ('@/views/project/editProject/index'),
                meta: { title: '修改项目' },
                hidden: true
            },
        ]
    },
    {
        path: '/system',
        component: Layout,
        redirect: '/system/employee',
        name: 'System',
        meta: { title: '系统设置' },
        children: [{
                path: 'employee',
                name: 'Employee',
                component: () =>
                    import ('@/views/system/employee'),
                meta: { title: '员工管理' }
            },
            {
                path: 'power',
                name: 'Power',
                component: () =>
                    import ('@/views/system/power'),
                meta: { title: '项目权限管理' }
            },
            {
                path: 'supplierManagement',
                name: 'SupplierManagement',
                component: () =>
                    import ('@/views/system/supplierManagement'),
                meta: { title: '供应商管理' }
            }
        ]
    },

    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: 'Example', icon: 'example' },
        children: [{
                path: 'table',
                name: 'Table',
                component: () =>
                    import ('@/views/table/index'),
                meta: { title: 'Table', icon: 'table' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () =>
                    import ('@/views/tree/index'),
                meta: { title: 'Tree', icon: 'tree' }
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Form',
            component: () =>
                import ('@/views/form/index'),
            meta: { title: 'Form', icon: 'form' }
        }]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [{
                path: 'menu1',
                component: () =>
                    import ('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [{
                        path: 'menu1-1',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [{
                                path: 'menu1-2-1',
                                component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () =>
                    import ('@/views/nested/menu2/index'),
                meta: { title: 'menu2' }
            }
        ]
    },

    {
        path: 'external-link',
        component: Layout,
        children: [{
            path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
            meta: { title: 'External Link', icon: 'link' }
        }]
    },

    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})