import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



/* 
import axios from "axios"
axios({
  url: 'http://123.207.32.32:8000/home/multidata'
}).then(res=>console.log(res))
 */