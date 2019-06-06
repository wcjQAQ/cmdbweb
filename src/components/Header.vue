<template>
   <div class="top">
       <div class="top-nav">
             <router-link to='/info'>主机管理</router-link>
             <router-link to='/crontab'>任务计划</router-link>
             <router-link to='/kubernetes'>Kubernetes</router-link>
             <router-link to='/info'>Info</router-link>
             <router-link to='/all'>All</router-link>
       </div>
  </div>  
</template>

<script >
export default {
  data() {
    return {
      homeLink:"/"
    }
  }
}
</script>

<style scope>
.top {
    height: 40px;
    background-color: #333;
}

.topbar-nav {
    float: left;
    height: 40px;
    line-height: 40px;
    font-size: 0;
}
</style>