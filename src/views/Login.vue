<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    v-loading.fullscreen.lock="loading"
  >
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
        @keyup.enter="onSubmit('form')"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">Signin</el-button>
      <el-button @click="onCancel('form')">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { User } from "../models";

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
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true;

          try {
            const { username, password } = this.form;
            const { response: { data } } = await User.login(username, password);

            window.localStorage.setItem("sessionToken", data.sessionToken);
            this.$store.dispatch("initApp");
            this.$router.replace("/");
          } catch (e) {
            // TODO: catch error before to have bad username/password
            this.loginError = e.message;
          }

          this.loading = false;
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