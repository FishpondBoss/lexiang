<template>
<div>
  <!-- 全部视频区 -->
  <video-show   
     v-for="(item,index) in data" 
     :key="index"
     :auimg="axios.defaults.baseURL+item.uimg"
     :videoSrc="axios.defaults.baseURL+item.vsrc"
     :aunick="item.nickname"
     :desc="item.vdesc"
     ></video-show>
  <mt-button size="large" @click="addmore">加载更多</mt-button>
</div>  
</template>
<script>
import video_show from './row.vue'
export default {
  components:{
    "video-show":video_show,
  },
  data(){
    return{
      data:[],
      pno:0,
    }
  },
  methods: {
    addVideo(pno){  
      var obj={pno:pno,pageSize:2}
      this.axios.get("video/findAll",{params:obj})
      .then(res=>{
        // var result=res.data.row;
        this.data=this.data.concat(res.data);
        console.log()
      }).catch(err=>{
        console.log(err)
      })
     },
     addmore(){
       this.pno++;
       this.addVideo(this.pno);
     },  
  },
  created() {
    this.addVideo(1)
    console.log(this.choose)
  } ,
}
</script>
<style>

</style>

