<template>
  <el-main class="flex">
    <router-view></router-view>
  </el-main>
  <el-footer>Made by Gaëtan</el-footer>
</template>

<script>
import { User } from "./models";

export default {
  name: "App",

  mounted() {
    const sessionToken = window.localStorage.getItem("sessionToken");

    if (sessionToken) {
      User.current(sessionToken)
        .then(() => this.$store.dispatch("initApp"))
        .catch(() => {
          window.localStorage.removeItem("sessionToken");
          this.$router.replace("/login");
        });
    } else {
      window.localStorage.removeItem("sessionToken");
      this.$router.replace("/login");
    }
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
}

@media screen and (min-width: 1500px) {
  .el-main.flex {
    justify-content: center;
  }
}
</style>
