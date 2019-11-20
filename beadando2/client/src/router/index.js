import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import ListMoney from '@/components/ListMoney'
import CreateMoney from '@/components/CreateMoney'
import Login from '@/components/Login'
import Logout from '@/components/Logout'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'ListMoney',
      component: ListMoney,
      meta: {
        requiresAuth: true,
        title: "Money registry"
      },
    },
    {
      path: '/create-money',
      name: 'CreateMoney',
      component: CreateMoney,
      meta: {
        requiresAuth: true,
        title: "Money registry "
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false,
        title: "Money registry"
      },
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {
        requiresAuth: false,
        title: "Money registry"
      },
    },
  ]
})
