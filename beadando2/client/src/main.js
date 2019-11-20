import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false
Vue.use(Buefy);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && to.matched.some(record => record.meta.admin)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

Vue.prototype.checkLoggedIn = function(){
  return localStorage.getItem('token')==null?false:true
}


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
