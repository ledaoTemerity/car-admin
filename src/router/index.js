import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },

  {
    path: '/changePassword',
    component: () => import('@/views/changePassword/index'),
    hidden: true
  },
  // {
  //   path: '/userData',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'userData',
  //       component: () => import('@/views/dashboard/userData'),
  //       meta: { title: '我的任务', icon: 'dashboard', noCache: true }
  //     }     
  //   ]   
  // },
  {
    path: '',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    redirect: 'dashboard',
    meta: {
      title: '我的任务',
      icon: 'form'
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '我的任务', icon: 'dashboard', noCache: true },
        children: []
      },
       {
        hidden: true,
        path: 'userData',
        name: 'userData',
        component: () => import('@/views/dashboard/userData'),
        meta: { title: '任务处理', noCache: true }
      }             
    ]
  },
  {
    path: '/carDealerManage',
    component: Layout,
    redirect: '/carDealerManage/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '车商管理',
      icon: 'table'
    },
    children: [
      {
        path: 'carDealer',
        component: () => import('@/views/carDealerManage/carDealer'),
        name: 'PagePermission',
        meta: {
          title: '车商管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'carType',
        component: () => import('@/views/carDealerManage/carType'),
        name: 'carType',
        meta: {
          title: '车型管理'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'vehicleAnchored',
        component: () => import('@/views/carDealerManage/vehicleAnchored'),
        name: 'vehicleAnchored',
        meta: {
          title: '车辆挂靠管理'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        hidden: true,
        path: 'carDealerdetail',
        name: 'CarDealerdetail',
        component: () => import('@/views/carDealerManage/detail'),
        meta: { title: '车商详情', noCache: true }
      }
      // {
      //   path: 'brand',
      //   component: () => import('@/views/carDealerManage/brand'),
      //   name: 'brand',
      //   meta: {
      //     title: '品牌管理'
      //     // if do not set roles, means: this page does not require permission
      //   }
      // }
    ]
  },
  {
    path: '/preloan',
    component: Layout,
    redirect: '/preloan/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '贷前管理',
      icon: 'tab',
    },
    children: [
      {
        path: 'preSurch',
        component: () => import('@/views/dashboard/index'),
        name: 'PreSurch',
        meta: {
          title: '贷款查询'
        }
      },
      {
        path: 'preSurch1',
        component: () => import('@/views/dashboard/index'),
        name: 'PreSurch1',
        meta: {
          title: '贷款审批'
        }
      },  
      {
        hidden: true,
        path: 'preSurch2',
        component: () => import('@/views/dashboard/userData'),
        name: 'PreSurch2',
        meta: {
          title: '贷款处理'
        }
      },
      {
        hidden: true,
        path: 'preSurch3',
        component: () => import('@/views/dashboard/userData'),
        name: 'PreSurch3',
        meta: {
          title: '贷款查询详情'
        }
      }                
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '系统管理',
      icon: 'lock',
    },
    children: [
      {
        path: 'process',
        component: () => import('@/views/system/process'),
        name: 'Process',
        meta: {
          title: '流程管理'
        }
      },
      {
        path: 'userManagement',
        component: () => import('@/views/system/user'),
        name: 'userManagement',
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'organizational',
        component: () => import('@/views/system/organizational'),
        name: 'organizational',
        meta: {
          title: '机构管理'
        }
      },
      {
        path: 'roleManagement',
        component: () => import('@/views/system/roleManagement'),
        name: 'roleManagement',
        meta: {
          title: '角色管理'
        }
      }                  
    ]
  }     
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
