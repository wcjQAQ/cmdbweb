<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1"><router-link to='/hosts' tag='a'>主机管理</router-link></el-menu-item>
  <el-submenu index="2">
    <template slot="title">任务计划</router-link></template>
    <el-menu-item index="2-1"><router-link to='/crontab'>用户计划</router-link></el-menu-item>
    <el-menu-item index="2-2">全局crontab</el-menu-item>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
</el-menu>  
</template>


<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>