// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $http from './request'
Vue.config.productionTip = false
Vue.prototype.$http = $http

router.beforeEach((to, from, next) => {
  // 当没有权限的时候
  if (to.meta.isAuthrequired && store.state.user.isLogin === false) {
    next({
      path: '/login',
      params: {
        redirect: to.path
      }
    })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
