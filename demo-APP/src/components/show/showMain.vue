 <template>
 <div>
    <!-- 占位 -->
    <div class="top"></div>
    <!-- 头部 -->
    <main-title></main-title>
    <!-- 图片 -->
    <img-show></img-show>
    <tabbaricon></tabbaricon>  
 </div>   
 </template>
 <script>
 import img from './img.vue'
 import main_title from './title'
 import TabBarIcon from '../index/TabBarIcon'
 export default {
     components:{
      "main-title":main_title,
      "img-show":img,
       "tabbaricon":TabBarIcon
     },

 }
 </script>
 
 
 <style scoped>
 .top{
  height: 60px;
  width: 100%;
}
 </style>
 
 