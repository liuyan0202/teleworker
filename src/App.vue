<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import home from './components/login/home.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    home
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
html,body{
  width:100%;
  height:100%;
}
#app {
  width:100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

</style>
