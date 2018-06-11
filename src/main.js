import Vue from 'vue'
import router from './router/router'
import store from './store/store'
import App from './App.vue'
import ElementUI from 'element-ui'
import http from './http/http'//封装的http方法
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
Vue.use(http)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
