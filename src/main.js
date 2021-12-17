import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueResource from 'vue-resource'

Vue.use(VueResource);

//Echarts
import * as echarts from 'echarts'

import vuetify from './plugins/vuetify'

//amap
import VueAMap from 'vue-amap';

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
    key: 'f9aee56a4902db3576c757e7f1fcf8ec',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4',
    protocol: 'http'
});

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//     let getFlag = localStorage.getItem("Flag");
//     let getid = localStorage.getItem("Userid");
//     if (getFlag === "isLogin" && getid !== null) {
//         store.state.isLogin = true;
//         next();
//         if (!to.meta.isLogin) {
//             next({
//                 path: '/main'
//             })
//         }
//     } else {
//         if (to.meta.isLogin) {
//             next({
//                 path: '/',
//             })
//         } else {
//             next()
//         }
//     }
// });
//
// router.afterEach(() => {
//     window.scroll(0, 0);
// });

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
