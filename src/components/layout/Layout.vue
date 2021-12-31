<!--The component of home page-->
<template>
  <div class="v-application--wrap" style="background-color: #17ACA3">
    <!--navigation bar-->
    <NavBar/>
    <UserBar :username="username"></UserBar>
    <!--head menu-->
    <v-app-bar
        app
        dense
        color="#fff"
        class="app-bar"
        elevation="0"
        :value="!isMain"
    >
    </v-app-bar>
    <v-main class="main-content" style="background-color: #f1f1f1;">
      <v-container fluid class="height-100pc" style="margin-top: 20px;">
        <transition name="slide-left" appear>
          <router-view class="main-router-view"/>
        </transition>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import UserBar from "./components/UserBar";

export default {
  name: 'CriProjectLayout',

  data() {
    return {
      isMain: true,
      username: ""
    };
  },

  created() {
    this.username = this.$route.query.username
    //   if (!this.$route.matched.length) {
    //     this.$router.push("/");
    //   }
    //   let getFlag = localStorage.getItem("Flag");
    //   let getid = localStorage.getItem("Userid");
    //   if ((getid===null||getFlag !== "isLogin") && this.$route.path !== '/') {
    //     this.$router.push("/");
    //   }
  },

  mounted() {

  },

  components: {
    NavBar,
    UserBar
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;
}

v-list-item:hover {
  background-color: #FFFFFF;
}
</style>