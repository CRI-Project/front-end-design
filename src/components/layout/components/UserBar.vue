<template>
<!--  -->
  <v-navigation-drawer
      app
      color="#fff"
      permanent
      class="menu-navigation-drawer"
      mini-variant
      expand-on-hover
      right
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ userInfo.userid }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ userInfo.username }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "UserBar",
  created() {
    this.getData();
  },
  data() {
    return {
      userInfo: {},
    }
  },
  methods: {
    async getData() {
      const {data: res} = await this.$http.get("/userinfo/save");
      this.userInfo = res;
    },
  }
}
</script>

<style scoped>
.menu-navigation-drawer {
  z-index: 9999;
}
</style>