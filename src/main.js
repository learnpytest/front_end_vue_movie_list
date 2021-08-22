import Vue from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap";
import { BootstrapVue, IconsPlugin, BootstrapVueIcons  } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css"

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
//test
export const bus = new Vue()