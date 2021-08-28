<template>
  <el-form ref="form" :model="form" :rules="rules" v-loading="loading">
    <h1 class="form-header">Please sign in</h1>

    <el-form-item prop="username" :error="loginError">
      <el-input v-model.trim="form.username" placeholder="Username"></el-input>
    </el-form-item>
    <el-form-item prop="password" :error="loginError">
      <el-input
        v-model.trim="form.password"
        placeholder="Password"
        type="password"
        autocomplete="off"
        show-password
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">Signin</el-button>
      <el-button @click="onCancel('form')">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import FetchWrapper from "../utils/FetchWrapper";

export default {
  name: "Login",

  data() {
    return {
      loading: false,
      form: {
        username: "",
        password: "",
      },
      loginError: "",
      rules: {
        username: {
          required: true,
          message: "Please input username",
          trigger: "blur",
        },
        password: {
          required: true,
          message: "Please input password",
          trigger: "blur",
        },
      },
    };
  },

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;

          const username = encodeURIComponent(this.form.username);
          const password = encodeURIComponent(this.form.password);

          new FetchWrapper(
            `https://parseapi.back4app.com/login?username=${username}&password=${password}`
          )
            .fetch()
            .then(({ sessionToken }) => {
              window.localStorage.setItem("sessionToken", sessionToken);
              this.$router.replace("/");
            })
            .catch((e) => {
              this.loginError = "";
              this.loginError = e.message;
              this.loading = false;
            });
        }
      });
    },

    onCancel(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.el-form {
  width: 100%;
  max-width: 330px;
  margin: auto;
}

.form-header {
  margin-bottom: 1.5rem;
}
</style>