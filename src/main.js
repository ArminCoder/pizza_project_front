import Vue from 'vue'
import App from './App.vue'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// tailwind
import '@/assets/css/tailwind.css'

// sweet alert
import VueSwal from 'vue-swal'

// font awesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import router from './router'

Vue.use(VueAxios, axios)
Vue.use(VueSwal)
Vue.config.productionTip = false

export const eventBus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
