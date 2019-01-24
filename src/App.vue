<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components:{
    'app-header': Header
  },
  name: 'App'
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
  }
</style>
