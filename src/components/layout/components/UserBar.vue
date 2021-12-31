<!--The component of user bar-->
<template>
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
            {{ username }}
          </v-list-item-title>
          <v-list-item-subtitle>Kimi_RAI07@formula1.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "UserBar",
  data() {
    return {

    }
  },
  props:{
    username: String
  }
}
</script>

<style scoped>
.menu-navigation-drawer {
  z-index: 9999;
}
</style>