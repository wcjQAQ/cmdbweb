<template>
  <el-container>
    <el-header></el-header>
    <el-aside width=200px>
      <el-menu :default-active="$route.path" router>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>主机管理</span>
          </template>
        <el-menu-item v-for="cabinet in cabinets" index="hosts">{{cabinet}}</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>任务计划</span>
        </template>
          <el-menu-item v-for="cabinet in cabinets" @click="PushCabinet(cabinet),LocalstorgeCabinet(cabinet)" index="crontab">{{cabinet}}</el-menu-item>
      </el-submenu>
     </el-menu>
    </el-aside>
</el-container>
</template>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 80px;
  }
  
  .el-aside {
    color: #409EFF;
  }

</style>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        cabinets: '',
        cabinet: ''
      }
    },
    methods:{
      listCabinets(){
        axios
        .get('http://127.0.0.1:5000/api/show/cabinet')
        .then(response => (this.cabinets = response.data))
        },
      PushCabinet(cabinet){
        this.$router.push({path:'/crontab', query:{
          id:cabinet
        }})
      },
      LocalstorgeCabinet(cabinet){
        var obj = {
            cabinet: cabinet
        }
        localStorage.setItem('type', JSON.stringify(obj));
      }
    },
    mounted(){
      this.listCabinets()
      var obj = localStorage.getItem('type');
      obj = JSON.parse(obj);
      this.cabinet = obj.cabinet
    }
  };
</script>