<template>
<!--  -->
  <v-list dense :nav="!enableMini">
    <div v-for="(menu, index) in menus" :key="index">
      <v-list-item
          :color="color"
          ripple="ripple"
          @click="nav2(menu.menu)"
      >
        <v-list-item-icon>
          <v-icon v-if="menu.icon" style="color: white">{{ menu.icon }}</v-icon>
          <v-avatar v-else size="20">
            <span style="font-size: 24px">{{ menu.text.substring(0, 1) }}</span>
          </v-avatar>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="white--text" style="font-size: 18px">
            {{ menu.text || menu }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
export default {
  name: "MenuList",
  props: {
    enableMini: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      color: "#17ACA3",
      menus:[
        {
          menu: "/main",
          text: "Dashboard",
          icon: "mdi-view-dashboard"
        },
        {
          menu: "/control",
          text: "Control",
          icon: "mdi-table"
        },
      ],
    }
  },
  methods: {
    nav2(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>

</style>