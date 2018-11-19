import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/components/nav/topNav.vue'
import LeftNav from '@/components/nav/leftNav.vue'
import Home from '@/components/Home.vue'
import NotFound from '@/components/404.vue'

import System from '@/components/views/system/index.vue'
import Application from '@/components/views/system/application/index.vue'
import Dept from '@/components/views/system/dept/index.vue'
import Role from '@/components/views/system/role/index.vue'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/login'], resolve)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      type: 'login',
      component: Login
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      type: 'home',
      name: 'home',
      redirect: '/system/application',
      component: Home,
      children: [
        {
          path: '/system',
          components: {
            default: System,
            top: TopNav,
            aside: LeftNav
          },
          name: '系统管理',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/system/application', component: Application, name: '应用管理', menuShow: true },
            { path: '/system/dept', component: Dept, name: '机构管理', menuShow: true },
            { path: '/system/role', component: Role, name: '角色管理', menuShow: true }
          ]
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
     window.sessionStorage.removeItem('access-token')
    next()
  } else {
    let token = window.sessionStorage.getItem('access-token')
    if (!token) {
      next({path: '/login'})
    } else {
      next()
    }
  }
});

export default router