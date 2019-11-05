import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   当设置为true的时候该路由不会再侧边栏出现 如401,login等页面,或者如一些编辑页面/edit/1 (默认false)
 * alwaysShow: true               如果设置为true,将始终显示根菜单
 *                                如果没有设置alwaysShow,当item有多个子路径时,它将成为嵌套模式,否则不会显示根菜单
 * redirect: noRedirect           当设置noRedirect的时候该路由在面包屑导航中不可被点击
 * name: 'router-name'            设定路由的名字,一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin', 'editor']    设置该路由进入的权限,支持多个权限叠加
    title: 'title'                设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'              设置该路由的图标
    breadcrumb: false             如果设置为false,则不会在breadcrumb面包屑中显示
    activeMenu: '/example/list    如果设置路径,侧边栏将突出显示您设置的路径
  }
 */


/**
 * constantRoutes
 * 所有权限通用路由表, 所有角色都可以访问（不用验证权限）
 * 
 */
export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component: () => import('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '政务看板', icon: 'dashboard', affix: true }
        }]
    },

    {
        path: '/example',
        component: Layout,
        // redirect: '/example/table',
        redirect: 'noRedirect',
        name: 'Example',
        meta: { title: '分类设置', icon: 'example' },
        children: [{
                path: 'table',
                name: 'Table',
                component: () => import('@/views/table/index'),
                meta: { title: '报表', icon: 'table' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () => import('@/views/tree/index'),
                meta: { title: '关系树', icon: 'tree' }
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Form',
            component: () => import('@/views/form/index'),
            meta: { title: '表单中心', icon: 'form' }
        }]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: '多级菜单',
            icon: 'nested'
        },
        children: [{
                path: 'menu1',
                component: () => import('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [{
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [{
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () => import('@/views/nested/menu2/index'),
                meta: { title: 'menu2' }
            }
        ]
    },

    {
        path: '/external-link',
        component: Layout,
        children: [{
            path: 'https://www.baidu.com',
            meta: { title: '外部链接', icon: 'link' }
        }]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [{
        path: '/permission',
        component: Layout,
        redirect: '/permission/page',
        alwaysShow: true, // will always show the root menu
        name: 'Permission',
        meta: {
            title: 'Permission',
            icon: 'lock',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
            path: 'page',
            component: () => import('@/views/permission/test'),
            name: 'PagePermission',
            meta: {
                title: 'Page Permission',
                roles: ['admin'] // or you can only set roles in sub nav
            }
        }]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

//实例化vue的时候只挂载constantRouter
const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
