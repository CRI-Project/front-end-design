<template>
  <v-container
      fill-height
      fluid
  >
    <v-row
      align="center"
      justify="center"
      class="px-12"
    >
      <v-card
          elevation="24"
          width="100%"
      >
        <v-system-bar lights-out></v-system-bar>
        <v-carousel
            :continuous="false"
            :cycle="cycle"
            :show-arrows="false"
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            height="400"
        >
          <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
          >
            <v-sheet
                :color="colors[i]"
                height="100%"
                tile
            >
              <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
              >
                <div class="text-h2">
                  <v-img src="../../../public/img/lighthouse-2542726.jpg" width="600"></v-img>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <v-list two-line>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="../../../public/img/author.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Jian Wei Zhao</v-list-item-title>
              <v-list-item-subtitle>Photographer</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-switch
                  v-model="cycle"
                  label="Cycle Slides"
                  inset
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "slide",
  data () {
    return {
      colors: [
        'green',
        'secondary',
        'yellow darken-4',
        'red lighten-2',
        'orange darken-1',
      ],
      cycle: false,
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  },
}
</script>

<style scoped>

</style>