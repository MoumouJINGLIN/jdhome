import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */'../views/home/Home')
  }, {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */'../views/login/Login'),
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  }, {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "Shop" */'../views/Shop/Shop')
  }, {
    path: '/CartList/',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "CartList" */'../views/catrList/CartList')
  },
  {
    path: '/Confirmorder/:id',
    name: 'Confirmorder',
    component: () => import(/* webpackChunkName: "CartList" */'../views/Confirmorder/Confirm order')
  }, {
    path: '/OrderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "COrderList" */'../views/OrderList/OrderList')
  }, {
    path: '/My',
    name: 'My',
    component: () => import(/* webpackChunkName: "My" */'../views/My/My')

  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  if (isLogin || to.name === 'Login' || to.name === 'Register') {
    next()
  } else {
    next({ name: 'Login' })
  }
})
export default router
