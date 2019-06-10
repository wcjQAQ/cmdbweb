<template>
  <div id='Host'>
   <el-select v-model="Cabinet" clearable placeholder="请选择" @change="changeHost">
    <el-option
      v-for="cabinet in cabinets"
      :value="cabinet">
    </el-option>
  </el-select>
   <el-select v-model="Host" clearable placeholder="请选择" @change="getInfo">
    <el-option
      v-for="host in hosts"
      :value="host">
    </el-option>
  </el-select>
    <p>{{ info}}</p>
  </div>
</template>


<script>
import axios from 'axios'
export default {
    name: 'Host',
    data(){
        return {
            cabinets: null,
            hosts: null,
            info: null,
            Host: null,
            Cabinet: null
        }
    },
    methods:{
        listCabinets(){
            axios
            .get('http://127.0.0.1:5000/api/show/cabinet')
            .then(response => (this.cabinets = response.data))
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
        getInfo(){
            if(this.cabinets&&this.hosts){
                axios
                .get('http://127.0.0.1:5000/api/show/' + this.Cabinet + '/' + this.Host + '/info' )
                .then(response => (this.info = response.data))
            }
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
p{
position:absolute;
left:150px;
top:200px  
}
</style>
