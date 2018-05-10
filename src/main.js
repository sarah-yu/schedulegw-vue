import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'

import App from './App.vue'
import store from './store/store'
import { routes } from './routes'

import './assets/sass/main.scss'

Vue.use(VueRouter)
const router = new VueRouter({ routes })

axios.defaults.baseURL = 'http://localhost:3001/api'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
