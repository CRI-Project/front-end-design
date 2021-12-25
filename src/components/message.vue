<template>
  <v-snackbar v-model="visible" :color="color" text top>
    {{ this.$store.state.message.msg }}
    <!-- 关闭按钮 -->
    <template v-slot:action="{ attrs }">
      <v-btn v-if="showClose" :color="color" icon v-bind="attrs" @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Message",
  computed: {
    visible() {
      return this.$store.state.message.visible;
    },
    showClose() {
      return this.$store.state.message.showClose;
    },
    color() {
      return this.$store.state.message.color;
    },
  },
  methods: {
    close() {
      this.$store.commit("message/CLOSE_SNACKBAR");
    },
  },
}
</script>

<style scoped>

</style>