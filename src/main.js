import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import '@/assets/css/tailwind.css'



Vue.use(VueAxios, axios)

Vue.config.productionTip = false

export const eventBus = new Vue(); 

new Vue({
  render: h => h(App),
}).$mount('#app')
