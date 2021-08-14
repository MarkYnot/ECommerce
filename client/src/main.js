import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './element.js'
import VueCookies from 'vue-cookies'
import md5 from 'js-md5';

Vue.use(VueCookies)
Vue.use(ElementUI)
Vue.use(VueLazyload);
Vue.prototype.$md5 = md5
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


