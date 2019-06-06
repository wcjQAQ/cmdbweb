<template>
  <div id="app">
    <div>
      <appHeader></appHeader>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';
export default {
  components:{
    appHeader: Header
  }
}
</script>

<style>
</style>
