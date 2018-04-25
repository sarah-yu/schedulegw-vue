import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'
import store from './store/store'

import './assets/sass/main.scss'

axios.defaults.baseURL = 'http://localhost:3001/api'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
