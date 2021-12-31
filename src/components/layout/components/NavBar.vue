<!--The component of navigation bar-->
<template>
  <v-navigation-drawer
      app
      :color="color"
      permanent
      class="menu-navigation-drawer"
      mini-variant
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar
            rounded="0"
            size="40px"
        >
          <v-img src="../../../assets/images/homepage_bg/logo_white.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
    <MenuList></MenuList>
  </v-navigation-drawer>
</template>

<script>
import MenuList from "./MenuList";

export default {
  name: "NavBar",
  props: {
    isRight:{
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      dark: false,
      color: "#17ACA3",
      enableMini: true,
      menuLogoSrc: "",
      menuTitle: "123123",
    }
  },
  components: {
    MenuList
  }
}
</script>

<style scoped>
.menu-navigation-drawer {
  z-index: 9999;
}
</style>