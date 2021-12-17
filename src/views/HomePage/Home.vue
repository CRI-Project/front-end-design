<template>
  <div>
    <v-row>
      <v-container>
        <Module1></Module1>
      </v-container>
    </v-row>
    <v-row>
      <v-container>
        <v-row>
          <v-col
              cols="12"
              sm="7"
          >
            <Module2></Module2>
          </v-col>
          <v-col
              cols="12"
              sm="5"
          >
            <Module3></Module3>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </div>
</template>

<script>
import Module1 from '@/components/Module/Module1'
import Module2 from '@/components/Module/Module2'
import Module3 from '@/components/Module/Module3'

export default {
  name: "Home",
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      baseURL: "http://8.141.56.170:8082",
      listURL: "/generator/sensordatatest/list"
    }
  },
  components: {
    Module1,
    Module2,
    Module3,
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>

</style>