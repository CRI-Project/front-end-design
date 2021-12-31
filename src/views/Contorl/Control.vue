<template>
  <div>

    <v-data-table
        :headers="headers"
        :items="sensorTable"
        :items-per-page="10"
        class="elevation-1"
    >
      <template v-slot:item.switch="{item}">
        <v-switch
            v-model="item.switchState"
            @click="changeSensorState"
        ></v-switch>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {getList, changeState, getState} from "../../api/homeAPI";

export default {
  name: "Control",
  data() {
    return {
      headers: [
        {text: 'Device Name', value: 'processorCode'},
        {text: 'Update Time', value: 'dateTime'},
        {text: 'Temp(˚C)', value: 'temperature'},
        {text: 'CO2(ppm)', value: 'ppm'},
        {text: 'Humidity(%)', value: 'humidity'},
        {text: 'Switch', value: 'switch', sortable: false},
      ],
      sensorTable: [],
      switchState: true,
    }
  },
  methods: {
    query() {
      getList().then(res => {
        // this.sensorTable[parseInt(res.data.processorCode)-1] = res.data;
        this.sensorTable.pop()
        this.sensorTable.push(res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    changeSensorState() {
      changeState().then(res => {
        console.log(res)
        if (res.data === 1) {
          this.$store.dispatch("message/openSnackbar", {
            msg: "Sensor Engaged Success!",
            color: "success",
          })
        } else {
          this.$store.dispatch("message/openSnackbar", {
            msg: "You Close the Sensor!",
            color: "error",
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },

  },
  mounted() {
    this.query()
    getState().then(res => {
      let data = res.data;
      this.switchState = data === 1;
    }).catch(err => {
      console.log(err);
    })
    this.timer = setInterval(() => {
      setTimeout(this.query, 0)
    }, 1000 * 10)
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
}
</script>

<style scoped>

</style>