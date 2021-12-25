<template>
  <v-container id="composition">
      <div id="chart1"></div>
  </v-container>
</template>

<script>
import * as echarts from 'echarts';
import {getAirQuality} from "../../api/homeAPI";

export default {
  name: "Module3",
  data(){
    return {
    }
  },
  methods: {
    query() {
      getAirQuality().then(res => {
        this.init(res.data.data.iaqi)
      }).catch(err => {
        console.log(err)
      })
    },
    init(data) {
      let CO = data.co.v
      let O3 = data.no2.v
      let NO2 = data.no2.v
      let PM10 = data.pm10.v
      let PM25 = data.pm25.v
      let SO2 = data.so2.v
       const option= {
         title: {
           text: 'Air Composition',
           left: 'center'
         },
         tooltip: {
           trigger: 'item',
           formatter: '{a} <br/>{b} : {c} ({d}%)'
         },
         legend: {
           type: 'scroll',
           orient: 'vertical',
           right: 10,
           top: 20,
           bottom: 20,
           data: ['CO', 'NO2', 'O3', 'PM10', 'PM2.5', 'SO2'],
           // selected: data.selected
         },
         series: [
           {
             name: 'Pollution Source:',
             type: 'pie',
             radius: '55%',
             center: ['40%', '50%'],
             data: [
               {value: CO, name: 'CO'},
               {value: NO2, name: 'NO2'},
               {value: O3, name: 'O3'},
               {value: PM10, name: 'PM10'},
               {value: PM25, name: 'PM2.5'},
               {value: SO2, name: 'SO2'},
             ],
             emphasis: {
               temStyle: {
                 shadowBlur: 10,
                 shadowOffsetX: 0,
                 shadowColor: 'rgba(0, 0, 0, 0.5)'
               }
             }
           }
         ]
       }
      var myChart = echarts.init(document.getElementById('chart1'));
      myChart.setOption(option);
    }
  },
  mounted() {
    this.query()
    this.timer = setInterval(() => {
      setTimeout(this.query, 0)
    }, 1000 * 6)
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
}
</script>

<style scoped>
  #chart1 {
    margin-top: 40px;
    width: 100%;
    height: 100%;
  }
  #composition {
    width: 100%;
    height: 430px;

    background: linear-gradient(180deg, #d9b8f1 0%, rgba(184, 241, 204, 0) 100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
  }
</style>