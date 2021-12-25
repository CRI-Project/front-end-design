<template>
  <v-app>
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
    <message />
  </v-app>
</template>

<script>
import Message from "./components/message";

export default {
  name: 'App',
  components: {
    Message,
  },
  computed: {
    cachedViews() {
      return this.$store.state.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
}
</script>

<style>
@import url("assets/css/global.css");
</style>
