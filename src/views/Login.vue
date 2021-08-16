<template>
  <el-form ref="form" :model="form" :rules="rules">
    <h1 class="form-header">Please sign in</h1>

    <el-form-item prop="username">
      <el-input
        v-model.trim="form.username"
        placeholder="Username"
        required
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model.trim="form.password"
        placeholder="Password"
        show-password
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Signin</el-button>
      <el-button @click="onCancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "Please input username", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Please input password", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$Parse.User.logIn(this.form.username, this.form.password)
            .then(() => this.$router.replace("/"))
            .catch((e) => {
              console.log("Error logging in: " + e.message);
              // TODO: show Dialog when catch error
            });
        }
      });
    },

    onCancel() {
      console.log("onCancel");
      this.$refs["form"].resetFields();
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