import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

//一级路由
import Crontab from './components/Crontab'
import Hosts from './components/Host'


// 二级路由

Vue.use(VueRouter)
Vue.use(ElementUI)
// Vue.user(axios)

const routes = [
  {path:"/crontab", name:"crontab", component:Crontab},
  {path:"/hosts", name:"hosts", component:Hosts}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
