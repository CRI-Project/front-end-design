<template>
  <v-app class="login-main teal accent-4">
    <div class="login-left-top">
      <div class="login-left-cloud">
        <img :src="rightCloud" alt="right_cloud">
      </div>
      <div class="login-right-cloud">
        <img :src="middleCloud" alt="middle_cloud">
      </div>
    </div>
    <div class="login-left-bottom">
      <div class="login-welcome-text">
        {{ welcome }}
      </div>
      <div class="login-earth">
        <img :src="earth" alt="earth">
      </div>
    </div>
    <div class="login-right">
      <div class="login-box"></div>
      <div class="login-logo">
        <img :src="logo" alt="CRI_logo">
      </div>
      <div class="other-way-to-login">
        <div class="login-Gmail-bg"></div>
        <div class="login-Gmail-button">{{ gmail }}</div>
      </div>
      <el-form class="login-input-box" :model="loginForm" ref="loginForm" :rules="loginRules" label-width="80px">
        <el-form-item label="Account:" class="login-account-box" prop="username">
          <el-input type="text" id="account" v-model="loginForm.username"/>
        </el-form-item>
        <el-form-item label="Password:" class="login-password-box" prop="password">
          <el-input type="password" id="password" v-model="loginForm.password"/>
        </el-form-item>
      </el-form>
      <button class="login-button" @click="login">{{ logInButton }}</button>
      <button class="register-button" @click="register">REGISTER</button>
      <el-drawer
          title="register"
          size='35%'
          :visible.sync="isRegister"
          :direction="side"
          :with-header="false">
        <register @handleClose="close"/>
      </el-drawer>
    </div>
  </v-app>
</template>

<script>
import {loginAPI} from "../api/loginAPI"
import Register from "../components/Register";

export default {
  name: "Login",
  components: {
    Register
  },
  data() {
    return {
      middleCloud: require("../assets/images/login/middle_cloud.png"),
      rightCloud: require("../assets/images/login/right_cloud.png"),
      logo: require("../assets/images/login/logo_1.png"),
      earth: require("../assets/images/login/earth.png"),
      welcome: "Welcome \n to \n Climate Response Ireland",
      gmail: "login with gmail",
      logInButton: "log in",
      side: "rtl",
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          {required: true, message: 'Enter Username', trigger: 'blur'},
          {min: 1, max: 20, message: 'Username between 1 - 20 long', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Enter Password', trigger: 'blur'},
          {min: 1, max: 10, message: 'Username between 1 - 10 long', trigger: 'blur'}
        ]
      },
      isRegister: false
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return;
        loginAPI(this.loginForm).then(res => {
          if (res.data.code === 500) {
            this.$store.dispatch('message/openSnackbar', {
              msg: res.data.msg,
              color: 'warning',
            })
          } else {
            this.$store.dispatch('message/openSnackbar', {
              msg: res.data.msg,
              color: 'success',
            })
            this.$router.push({
              path: "/main",
              query: {
                username: this.loginForm.username
              }
            })
          }
        }).catch(err => {
          this.$store.dispatch('message/openSnackbar', {
            msg: err,
            color: 'error',
          })
        })
      })
    },
    register() {
      this.isRegister = true
    },
    close() {
      this.isRegister = false
    }
  },
}
</script>

<style scoped>
@import "../assets/css/login.css";
</style>