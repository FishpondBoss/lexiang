 <template>
 <div>
    <!-- 占位 -->
    <div class="top"></div>
    <!-- 头部 -->
    <main-title @show="del"></main-title>
    <!-- 视频 -->
    <video-show v-show="choose"></video-show>
    <!-- 图片 -->
    <img-show v-show="!choose"></img-show>
 </div>   
 </template>
 <script>
 import video from './video.vue'
 import img from './img.vue'
 import main_title from './title'
 export default {
     components:{
      "video-show":video,
      "main-title":main_title,
      "img-show":img
     },
    data() {
      return {
        choose:false
      }
    },
     methods: {
       del(d){
       this.choose=d
       console.log("父组件"+d);
     }
     },
 }
 </script>
 
 
 <style scoped>
 .top{
  height: 60px;
  width: 100%;
}
 </style>
 
 