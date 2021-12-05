import Vue from 'vue'
import App from './App'

import {http,httpAvater} from './utils/http.js';

Vue.prototype.$request = http;
Vue.prototype.$httpAvater = httpAvater;
Vue.prototype.modifyCode = false;
Vue.config.productionTip = false;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
