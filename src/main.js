// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import VueClipboard from 'vue-clipboard2'
import store from './store/store.js'
import {Alert, Confirm, Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true 
Vue.use(VueClipboard)
Vue.use(Alert)
Vue.use(Confirm)
Vue.use(Toast)

//重置样式
import './assets/css/reset.css'
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
      document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
