<template>
<el-container style="height: 780px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>主机管理</template>
          <el-menu-item index="1-1" v-for="cabinet in cabinets" v-model="Cabinet"><router-link to='/hosts'>{{ cabinet }}</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>任务计划</template>
          <el-menu-item index="2-1"><router-link to='/crontab'>用户计划</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to='/crontab'>全局计划</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>kubernetes</template>
        <el-menu-item-group>
          <template slot="title">服务</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
  <router-view></router-view>

</el-container>
</template>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        cabinets: null,
        Cabinet: null
      }
    },
    methods:{
      listCabinets(){
        axios
        .get('http://127.0.0.1:5000/api/show/cabinet')
        .then(response => (this.cabinets = response.data))
        }
    },
    mounted(){
      this.listCabinets()
    }
  };
</script>