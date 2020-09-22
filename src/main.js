import Vue from 'vue'
import App from './App.vue'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// tailwind
import '@/assets/css/tailwind.css'

// font awesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

export const eventBus = new Vue(); 

new Vue({
  render: h => h(App),
}).$mount('#app')
