<!--information of map-->
<template>
  <div class="container" style="background-color: rgb(203,223,166);border-radius: 50px">
    <el-amap
        class="amap-box"
        :vid="'amap-vue'"
        :center="center"
        style="width: 110%"
    >
      <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position">
      </el-amap-marker>
    </el-amap>
  </div>
</template>

<script>

export default {
  name: "Module2",
  data() {
    return {
      center: [119.194, 26.058],
      markers:[],
    }
  },
  mounted() {
    this.markers = [
      {
        position: [119.194, 26.058]
      },
    ];
  },
  methods: {
  }
}
</script>

<style scoped>
.amap-box {
  width: 100%;
  height: 400px;
  margin: 10px auto;
}
</style>