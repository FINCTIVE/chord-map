import Vue from 'vue'
import App from './App.vue'
import AntDesign from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // or 'ant-design-vue/dist/antd.less'
Vue.use(AntDesign)

Vue.config.productionTip = true

new Vue({
  render: h => h(App)
}).$mount('#app')
