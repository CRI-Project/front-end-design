<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="sensorTable"
        :items-per-page="10"
        class="elevation-1"
    >
    </v-data-table>
    <v-btn @click="changeSensorState(1)">
      OPEN/CLOSE
    </v-btn>
  </div>
</template>

<script>
import {getList, changeState} from "../../api/homeAPI";

export default {
  name: "Control",
  data() {
    return {
      headers: [
        {text: 'Device Name', value:'processorCode'},
        {text: 'Update Time', value:'dateTime'},
        {text: 'Temp(˚C)', value:'temperature'},
        {text: 'CO2(ppm)', value:'ppm'},
        {text: 'Humidity(%)', value:'humidity'},
      ],
      sensorTable:[],
      page: 1,
      URL: "/generator/sensordatatest/testInfo/",
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
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.query()
    this.changeSensorState()
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