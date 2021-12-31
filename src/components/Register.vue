<template>
  <div class="container">
    <h1>REGISTER</h1>
    <el-form ref="registerForm" status-icon :rules="registerRules" :model="registerForm" class="login_form"
             label-width="0">
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" prefix-icon="el-icon-user" placeholder="username"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerForm.password" type="password" prefix-icon="el-icon-lock"
                  placeholder="password"/>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input v-model="registerForm.checkPassword" type="password" prefix-icon="el-icon-lock"
                  placeholder="check password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">Sign up</el-button>
        Already have an account?
        <el-link type="primary" @click="backToLogIn">Sign in</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {registerAPI} from "../api/loginAPI";

export default {
  name: "Register",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('The two passwords are inconsistent!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        checkPassword: ""
      },
      registerRules: {
        username: [
          {required: true, message: 'Enter Username', trigger: 'blur'},
          {min: 1, max: 10, message: 'Username between 1 - 10 long', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Enter Password', trigger: 'blur'},
          {min: 6, max: 20, message: 'Password between 6 - 20 long', trigger: 'blur'}
        ],
        checkPassword: [
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    backToLogIn() {
      this.$emit("handleClose")
    },
    register() {
      this.$refs.registerForm.validate(async valid => {
        if (!valid) return;
        let registerForm1 = {
          username: this.registerForm.username,
          password: this.registerForm.password,
        };
        console.log(registerForm1)
        registerAPI(registerForm1).then(res => {
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
            this.backToLogIn()
          }
        }).catch(err => {
          this.$store.dispatch('message/openSnackbar', {
            msg: err,
            color: 'error',
          })
        })
      })
    }
  }
}
</script>

<style scoped>
h1 {
  color: #7E7E7E;
}

.container {
  width: 400px;
  height: 400px;
  padding: 20px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

el-link {
  margin-left: 10px;
  line-height: 20px
}
</style>
