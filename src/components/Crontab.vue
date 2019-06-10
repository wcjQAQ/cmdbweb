<template>
  <div id='app'>
    <select v-model="Cabinet" @change="changeHost" class='cabinet'>
      <option disabled value="">请选择</option>
      <option v-for="cabinet in cabinets" :value="cabinet">{{cabinet}}</option>
    </select>

    <select v-model="Host" @change="changeUser" class="host">
      <option disabled value="">请选择</option>
      <option v-for="host in hosts" :value="host">{{host}}</option>
    </select>

    <select v-model="User" @change="listCron" class='user'>
      <option disabled value="">请选择</option>
      <option v-for="user in users" :value="user">{{user}}</option>
    </select>
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
            crons: null
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

