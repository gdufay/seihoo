<template>
  <el-main class="flex">
    <router-view></router-view>
  </el-main>
  <el-footer>Made by Gaëtan</el-footer>
</template>

<script>
export default {
  name: "App",
  
  mounted() {
    this.$store.dispatch("initApp");
  }
};
</script>

<style>
/* TODO: normalize browser */
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.el-main.flex {
  display: flex;
}
</style>
