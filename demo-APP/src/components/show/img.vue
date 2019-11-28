<template>
<div class="img">
  <!-- 全部图文区 -->
   <row   
     v-for="(item,index) in data" 
     :index="item.uid"
     :item="item"
     :key="index"
     :auimg="axios.defaults.baseURL+item.uimg"
     :imgSrc="item.psrc"
     :aunick="item.nickname"
     :desc="item.pdesc"
     :uptime="item.upTime|filter_time"
     :pfavour="item.pfavour"
     :pinlunCount="item.pinlunCount"
     :z=true
     :isLogin="isLogin"
     ></row>
     
  <mt-button size="large" @click="addmore">加载更多</mt-button>
  <div class="bottom"></div>
</div>  
</template>
<script>
import row from './img_row.vue'
export default {
  components:{
    "row":row,
  },
  data(){
    return{
      data:[],
      pno:2,
      isLogin:""   //获取此时登录的uid
    }
  },    
  filters:{
    // 调整显示时间  
    filter_time(time){
      var year=time.slice(0,4);
      var month=time.slice(5,7);
      var data=time.slice(8,10);
      var hour=time.slice(11,16)
      if(year>2018){
        return `${month}月${data}日${hour}`
      }else{
       return `${year}年${month}月${data}日`
      }
    },
  },

  methods: {
    addVideo(pno){
      var obj={pno:pno,pageSize:4}
      this.axios.get("img/find",{params:obj})
      .then(res=>{
        console.log(res.data)
        this.data=this.data.concat(res.data);
      }).catch(err=>{
        console.log(err)
      })
     },
     addmore(){
      this.addVideo(this.pno);
      this.pno++;
     },  
    //  判断是否登录
    getIsLongin(){
      this.axios.get("img/isLogin")
      .then(res=>{
        var result=res.data.code;
        if(result==200){
          this.isLogin=res.data.msg;
        }else{
          this.isLogin=""
        }
      })
    }
  },
  
  // 初始化页面时加载数据
  created() {
    this.addVideo(1)
    this.getIsLongin();
  } ,

}
</script>
<style scoped>
.img{
  margin-bottom: 60px;
}
.video_bottom{
  display: none;
}
</style>

