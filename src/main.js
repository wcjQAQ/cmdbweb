import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

//一级路由
// import Header from './components/Header'
import Crontab from './components/Crontab'


// 二级路由
// import Cabinet from './components/crontab/Cabinet'
// import Users from './components/crontab/Users'
// import Hosts from './components/crontab/Hosts'

Vue.use(VueRouter)

const routes = [
  // {path:"/",component:Header},
  {path:"/crontab",component:Crontab}
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
