<template>
  <div id='app'>
   <el-select v-model="Cabinet" clearable placeholder="请选择" @change="changeHost">
    <el-option
      v-for="cabinet in cabinets"
      :value="cabinet">
    </el-option>
  </el-select>
   <el-select v-model="Host" clearable placeholder="请选择" @change="changeUser">
    <el-option
      v-for="host in hosts"
      :value="host">
    </el-option>
  </el-select>
  <el-select v-model="User" clearable placeholder="请选择" @change="listCron">
    <el-option
      v-for="user in users"
      :value="User">
    </el-option>
  </el-select>
    <div>
        <ul>
            <li v-for="cron in crons">{{cron}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'app',
    data(){
        return {
            cabinets: null,
            hosts: null,
            users: null,
            crons: null,
            Host: null,
            Cabinet: null,
            User: null
        }
    },
    methods:{
        listCron(){
            if(this.cabinets&&this.hosts){
              axios
              .get('http://127.0.0.1:5000/api/show/' + this.Host + '/' + this.User)
              .then(response => (this.crons = response.data))
            }
        },
        changeHost(e){
            // console.log(e.target.value);
            // console.log(this.User,this.Host,"========")
            if(this.cabinets){
              axios
              .get('http://127.0.0.1:5000/api/show/' + this.Cabinet)
              .then(response => (this.hosts = response.data))
            }
        },
        changeUser(e){
            if(this.cabinets){
              axios
              .get('http://127.0.0.1:5000/api/show/cabinet/' + this.Host)
              .then(response => (this.users = response.data))
            }
        },
        listCabinets(){
        axios
        .get('http://127.0.0.1:5000/api/show/cabinet')
        .then(response => (this.cabinets = response.data))
        }
    },
    mounted() { 
      this.listCabinets()
    }
}
</script>

<style scope>
.cabinet {
position:absolute;
left:12px;
top:59px
}
.host {
position:absolute;
left:100px;
top:59px
}
.user {
position:absolute;
left:230px;
top:59px
}


</style>

