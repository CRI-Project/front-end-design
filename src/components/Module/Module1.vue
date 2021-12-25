<template>
<!--  -->
  <v-card
      style="border-radius: 50px; width: 2000px"
  >
    <v-row>
      <v-col
          cols="12"
          sm="1"
      ></v-col>
      <v-col
          cols="12"
          sm="3"
      >
        <v-menu
            ref="menu"
            :close-on-content-click="true"
            min-width="auto"
            offset-y
            transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                class="picker"
                label="Date:"
                outlined
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date"
              no-title
              scrollable
          >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col
          cols:="12"
          sm="3"
      >
        <v-select
            label="Area:"
            outlined
        >
        </v-select>
      </v-col>
      <v-col
          cols="12"
          sm="3"
      >
        <v-text-field
            v-model="searchKey"
            label="ID:"
            outlined
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-btn style="background-color: #17ACA3; color: white; width: 100px; height: 40px; margin-top: 8px"
               @click="query">
          QUERY
        </v-btn>
      </v-col>
    </v-row>
    <!--        <line-chart2></line-chart2>-->
    <!--        <line-chart3></line-chart3>-->
    <v-row>
      <v-col>
        <v-container>
          <v-card class="lineChart1"
                  style="border-radius: 50px"
          >
            <v-row>
              <v-container id="linear1" style="margin: 29px auto">
                <div id="chart"></div>
              </v-container>
            </v-row>
          </v-card>
        </v-container>
      </v-col>
      <v-col>
        <v-container>
          <v-card class="lineChart2"
                  style="border-radius: 50px"
                  v-bind:style="{background: this.weather.color}"
          >
            <v-row>
              <v-col
                  cols="12"
                  sm="3"
              >
                <v-container>
          <span id="temp">{{ this.temp }}
          </span>
                </v-container>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-container>
                  <v-row>
                    <v-container>
                      <v-row>
                        <v-col>
                          <span class="title2">Air Quality</span>
                        </v-col>
                        <v-col>
                          <v-card v-if="this.ppm<500" id="airQ" align="center">
                            <span class="qLevel">BEST</span>
                          </v-card>
                          <v-card v-else id="airQ2" align="center">
                            <span class="qLevel">BAD</span>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-row>
                  <v-row>
                    <v-container>
                      <v-row>
                        <v-col>
                          <span class="title2">Humidity</span>
                        </v-col>
                        <v-col>
                          <v-card id="humL" align="left" v-bind:style="{width: this.humWidth}">
                            <span id="hLevel">{{ this.hum }}</span>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-row>
                </v-container>
              </v-col>
              <v-col align-self="center">
                <v-img v-if="this.weatherVal==='多云' || this.weatherVal==='晴'" src="@/assets/images/Home/Sun.png"
                       style="width: 88px; height: 68px"></v-img>
                <v-img v-else src="@/assets/images/Home/rain.png" style="width: 90px; height: 88px"></v-img>
              </v-col>
            </v-row>
          </v-card>
          <v-container class="lineChart3" style="border-radius: 50px">
            <div id="forecastChart" style="margin-top: 20px"></div>
          </v-container>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import * as echarts from 'echarts';
import {getList, getWeather} from "../../api/homeAPI";


export default {
  name: "Module1",
  data() {
    return {
      searchKey: "",
      URL: "/generator/sensordatatest/testInfo/",
      temp: 0,
      hum: 0,
      ppm: 0,
      date: '',
      picker: '',
      dataNow: {},
      timer: null,
      weatherVal: '',
      page: 1,
      sensorData:[],
    }
  },
  computed: {
    humWidth: function () {
      const width = (this.hum / 100) * 105
      return width + "px"
    },
    weather: function () {
      const weatherCom = {
        color: 'linear-gradient(180deg, #F1F1B8 0%, rgba(255, 255, 255, 0) 100%)',
        src: '@/assets/images/Home/Sun.png'
      }
      if (this.weatherVal === '多云' || this.weatherVal === '晴') {
        weatherCom.color = 'linear-gradient(180deg, #F1F1B8 0%, rgba(255, 255, 255, 0) 100%)'
        weatherCom.src = '@/assets/images/Home/Sun.png'
      } else {
        weatherCom.color = 'linear-gradient(180deg, #569AFF 0%, rgba(255, 255, 255, 0) 100%)'
        weatherCom.src = '@/assets/images/Home/rain.png'
      }
      return weatherCom
    }
  },
  methods: {
    query() {
      getList().then(res => {
        this.sensorData.push(res.data)
        if(this.sensorData.length > 7) {
          this.sensorData.shift();
        }
        console.log(this.sensorData)
        this.dataNow = res.data
        this.temp = this.dataNow.temperature
        this.hum = this.dataNow.humidity
        this.ppm = this.dataNow.ppm
        this.initBarChart()
      }).catch(err => {
        console.log(err)
      })
    },
    initBarChart() {
      let xAxisData = []
      let seriesTemp = []
      let seriesHum = []
      let seriesPpm = []
      for (let i = this.sensorData.length - 1; i >= 0; i--) {
        let item = this.sensorData[i]
        console.log(this.sensorData[i])
        xAxisData[i] = item.dateTime
        seriesTemp[i] = item.temperature
        seriesHum[i] = item.humidity
        seriesPpm[i] = item.ppm
      }
      const option = {
        title: {
          text: 'Real Time Sensor Data Display',
          x: 'center'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Temperature',
            data: seriesTemp,
            type: 'bar'
          },
          {
            name: 'Humidity',
            data: seriesHum,
            type: 'bar'
          },
          {
            name: 'CO2',
            data: seriesPpm,
            type: 'bar'
          }
        ]
      }
      var myChart = echarts.init(document.getElementById('chart'));
      myChart.setOption(option);
    },
    initLineChart(data) {
      let xAxisData = []
      let seriesHigh = []
      let seriesLow = []
      for (let i = 0; i < data.forecast.length; i++) {
        xAxisData.push(data.forecast[i].date)
        seriesHigh.push(data.forecast[i].high.slice(3, 5))
        seriesLow.push(data.forecast[i].low.slice(3, 5))
      }

      const option = {
        title: {
          text: data.city + ": " + data.ganmao,
          x: 'center'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'low',
            data: seriesLow,
            type: 'line'
          },
          {
            name: 'High',
            data: seriesHigh,
            type: 'line'
          },
        ]
      }
      var myChart = echarts.init(document.getElementById('forecastChart'));
      myChart.setOption(option);
    },
    weatherGet() {
      getWeather().then(res => {
        this.weatherVal = res.data.data.forecast[0].type
        console.log(res.data.data)
        this.initLineChart(res.data.data)
      })
    },
  },
  mounted() {
    this.weatherGet()
    this.query()
    this.timer = setInterval(() => {
      setTimeout(this.query, 0)
    }, 1000 * 6)
    this.timer = setInterval(() => {
      setTimeout(this.weatherGet, 0)
    }, 1000 * 60)
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
}
</script>

<style lang="scss" scoped>
.lineChart1 {
  background: linear-gradient(180deg, #B8F1CC 0%, rgba(184, 241, 204, 0) 100%);
  height: 392px;
  min-width: 252px;
}

#title {
  margin-top: 23.81px;
  margin-left: 31.7px;
  font-family: Alibaba PuHuiTi;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
}

#linechart1 {
  margin: 14.28px auto;
  width: 85%;
  height: 286.23px;
}

#chart {
  width: 100%;
  height: 350px;
}

.lineChart2 {
  min-width: 539px;
  height: 135px;
  border-radius: 50px
}

#temp {
  margin-left: 10px;
  font-family: Alibaba PuHuiTi;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 66px;
  letter-spacing: 0em;
  text-align: left;
}

.title2 {
  height: 16px;
  width: 80px;
}

#airQ {
  height: 26px;
  width: 105px;
  border-radius: 100px;
  box-shadow: 0px 4px 4px 0px #00000040 inset;
  background: linear-gradient(90deg, #17ACA3 0%, rgba(196, 196, 196, 0) 182.86%);
}

#airQ2 {
  height: 26px;
  width: 105px;
  border-radius: 100px;
  box-shadow: 0px 4px 4px 0px #00000040 inset;
  background: linear-gradient(90deg, tomato 0%, rgba(196, 196, 196, 0) 182.86%);
}

.qLevel {
  height: 26px;
  width: 39px;
  color: white;
  font-family: Alibaba PuHuiTi;
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;

}

#humL {
  height: 26px;
  width: 105px;
  border-radius: 100px;
  box-shadow: 0px 4px 4px 0px #00000040 inset;
  background-color: #f1f1f1;
}

#hLevel {
  display: block;
  color: white;
  height: 26px;
  background-color: #1989FA;
  font-family: Alibaba PuHuiTi;
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: center;
  box-shadow: 0px 4px 4px 0px #00000040 inset;
}

.lineChart3 {
  background: linear-gradient(180deg, #B8F1ED 0%, rgba(184, 241, 204, 0) 100%);
  margin-top: 13px;
  height: 243px;
  box-shadow: 0px 4px 4px 0px #00000040;
}

#forecastChart {
  width: 100%;
  height: 250px;
}
</style>