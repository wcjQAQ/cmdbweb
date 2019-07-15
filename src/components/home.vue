<template>
    <div class="box">
        <div class="left">
            <Navigation></Navigation>
        </div>
        <div class="right">
           <router-view></router-view>
        </div>
    </div>
    
</template>
<style scoped>
.box{
    display: flex;
    flex-direction: row;
    background: #eaeaea;
}
.left{
    width: 202px;
    height: 100vh;
    background: #FFF;
}
.right{
    flex:1;
    margin: 10px;
    padding: 20px;
    background: #FFF;
}
</style>

<script>
import Navigation from './Navigation';

export default {
     data() {
        return {
            
        }
    },
    components:{Navigation},
}
</script>