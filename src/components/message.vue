<template>
  <v-snackbar v-model="visible" :color="color" text top>
    {{ this.$store.state.message.msg }}
  </v-snackbar>
</template>

<script>
export default {
  name: "Message",
  computed: {
    visible() {
      return this.$store.state.message.visible;
    },
    color() {
      return this.$store.state.message.color;
    },
  }
}
</script>

<style scoped>

</style>  ·