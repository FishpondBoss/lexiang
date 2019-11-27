// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'  
Vue.use(MintUI)
//4.引入字体图标的样式文件
import "./font/iconfont.css"
import "./font/iconfont_MsgBox.css"
import  axios from 'axios'
axios.defaults.baseURL="http://127.0.0.1:5050/";
axios.defaults.withCredentials=true;
Vue.prototype.axios=axios;
import SIdentify from './components/identify.vue'
Vue.use(SIdentify)
//==============================================引入swiper组件//
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper/* { default global options } */)
import {Uploader} from 'vant';
Vue.use(Uploader);
import { Field } from 'vant';
import 'vant/lib/index.css';
import { Popup } from 'vant';
import { Button } from 'vant';
import { Toast } from 'vant';
import { Dialog } from 'vant';

Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Popup);
Vue.use(Field);


Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
  // 聚焦元素
  el.focus()
  }
  })
import qs from 'qs'
 Vue.prototype.qs=qs
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
