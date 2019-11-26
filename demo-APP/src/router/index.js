import Vue from 'vue'
import Router from 'vue-router'
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify)
import Index from '../views/index.vue'
import IndexFu from '../views/indexFu.vue'
// import My from '../views/my.vue'
/*推荐*/
/*动态*/ 
// import show from '../components/video/showMain.vue'
import show_pinlun from '../components/show/img_pinlun.vue'
/*上传*/
import ss from '../views/ss.vue';
/*消息*/ 
import Inform from "../components/MsgBox/inform.vue"
import Chat from "../components/MsgBox/chat.vue"
/*我的*/
import Myset from '../components/my/mySet.vue'
import Mylogin from '../components/my/myLogin.vue'
import Myreg from '../components/my/myReg.vue'
import MyForupwd from '../components/my/myForupwd.vue'
import Myyourself from '../components/my/myYourself.vue'
import img from '../components/show/img.vue'
// import Myceshi from  '../components/my/myCeshi.vue'
import Myintr from '../components/my/myHeader/Myintr.vue' 

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component:Index},
    {path:"/IndexFu",component:IndexFu},
    {path:'/Chat',component:Chat},  
    {path:'/Inform',component:Inform},   
    {path:'/ss',component:ss},
    {path:'/Myset',component:Myset},
    {path:'/Mylogin',component:Mylogin},
    {path:'/Myreg',component:Myreg},
    // {path:'/Myceshi',component:Myceshi},
    {path:'/Myintr',component:Myintr},
    // {path:'/show',component:show},
    {path:'/MyForupwd',component:MyForupwd},
    {path:'/Myyourself',component:Myyourself},
    {path:'/show_pinlun',component:show_pinlun},
    // 帖子
    {path:'/img',component:img}
  ]
})
