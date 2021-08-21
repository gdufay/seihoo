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
  },
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
  background: url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x2048/f5c6b75374f1c8a0af2568dbc90a4149/photo-1519506123986-6e0397dcd754.jpg")
    no-repeat fixed center;
}

.el-main.flex {
  display: flex;
  justify-content: center;
}
</style>
