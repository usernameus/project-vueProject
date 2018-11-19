// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 
import ElementUI from 'element-ui'
import store from './store.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
 
/* 真实环境下去掉以下两行代码即可*/
/*import Mock from './mock'
Mock.init()*/
 
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
