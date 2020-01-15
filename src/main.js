import Vue from 'vue'
import App from './App.vue'
// 完整导入
// import AntDesign from 'ant-design-vue'
// Vue.use(AntDesign)
// import 'ant-design-vue/dist/antd.css'

import { Button, Modal, Radio, Drawer, Icon } from 'ant-design-vue'
Vue.component(Icon.name, Icon)
Vue.component(Button.name, Button)
Vue.component(Modal.name, Modal)
Vue.component(Drawer.name, Drawer)
Vue.component(Radio.name, Radio)
Vue.component(Radio.Group.name, Radio.Group)
Vue.component(Radio.Button.name, Radio.Button)

Vue.config.productionTip = true

new Vue({
  render: h => h(App)
}).$mount('#app')
