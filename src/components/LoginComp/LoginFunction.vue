<template>
  <v-container fluid>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-row class="px-5 my-5">
        <v-text-field
            outlined
            v-model="form.username"
            :rules="nameRules"
            label="User Name"
            placeholder="Please Enter Your User Name"
            required
        ></v-text-field>
      </v-row>

      <v-row class="px-5 my-5">
        <v-text-field
            outlined
            v-model="form.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passrules.required, passrules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
        ></v-text-field>
      </v-row>
    </v-form>

    <v-row class="d-flex justify-start px-5">
      <v-btn
          class="mr-3"
          color="#17ACA3"
          style="color: white"
          @click="login"
      >
        Sign Up
      </v-btn>
      <v-btn
          style="font-size: 12px"
          text
          color="normal"
      >Sign in</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import {loginAPI, registerAPI} from "../../api/loginAPI";

export default {
  name: "LoginFunction",
  data() {
    return {
      valid: true,
      show1: false,
      form: {
        username: '',
        password: '',
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      passrules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  },
  methods: {
    login() {
      if(this.$refs.form.validate()) {
        loginAPI(this.form).then(res => {
          if(res.data.code === 500) {
            this.$store.dispatch('message/openSnackbar', {
              msg: res.data.msg,
              color: 'warning',
            })
          }else {
            this.$store.dispatch('message/openSnackbar', {
              msg: res.data.msg,
              color: 'success',
            })
            this.$router.push("/main")
          }
          console.log(res)
        }).catch(err => {
          this.$store.dispatch('message/openSnackbar', {
            msg: err,
            color: 'error',
          })
          console.log(err)
        })
      }
    },
    register() {
       if(this.$refs.form.validate()) {
         registerAPI(this.form).then(res => {
           this.$store.dispatch('message/openSnackbar', {
             msg: res,
             color: 'success',
           }).catch(err => {
             this.$store.dispatch('message/openSnackbar', {
               msg: err,
               color: 'error',
             })
             console.log(err)
           })
         })
       }
    }
  }
}
</script>

<style scoped>

</style>