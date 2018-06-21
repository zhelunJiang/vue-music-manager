import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api/axio_config.js'
import {dateFormat} from './common/utils.js'
import {newData} from './common/utils.js'
import {baseImgPath} from "./common/utils"
import {baseMusicPath} from "./common/utils";
import {music} from "./common/map";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import store from './store'
Vue.prototype.$axios = axios
Vue.prototype.$dateFormat = dateFormat
Vue.prototype.$newData = newData
Vue.prototype.$basePath = baseImgPath
Vue.prototype.$musicMap = music
Vue.prototype.$baseMusicFile = baseMusicPath
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
