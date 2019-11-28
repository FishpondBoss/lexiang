<template>
  <div class="img">
    <div class="focus_top">
      你的关注
    </div>
      <imgrow
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
      ></imgrow>
      <div v-if="show_kong" class="kong">你还没有关注任何人~</div>
      <div v-if="show_NoLogin" class="kong">请先登录</div>
	<tabbaricon></tabbaricon>
  </div>
</template>
<script>
 import row from '../components/show/img_row.vue'
 import TabBarIcon from '../components/index/TabBarIcon'
export default {
  components:{
    "imgrow":row,"tabbaricon":TabBarIcon
  },
  data() {
    return {
      data:[],
      show_kong:false,
      show_NoLogin:false,
    }
  },
   filters:{
    //调整显示时间  
    filter_time(time){
      if(time!==null){
        var year=time.slice(0,4);
        var month=time.slice(5,7);
        var data=time.slice(8,10);
        var hour=time.slice(11,16)
        if(year>2018){
          return `${month}月${data}日${hour}`
        }else{
        return `${year}年${month}月${data}日`
        }
      }
    },
  },
  methods: {
    addVideo(pno){
      this.axios.get("img/focus")
      .then(res=>{
        if(res.data.code==-2){
          this.show_NoLogin=true
        }else if(res.data.code==-1){
          this.show_kong=true
        }else{
          this.show_kong=false
          this.data=res.data.msg;
        }
      }).catch(err=>{
        console.log(err)
      })
     },
     addmore(){
      this.addVideo(this.pno);
      this.pno++;
     }
  },
  // 初始化页面时加载数据
  created() {
    this.addVideo(1)
  } 
}
</script>
<style scoped>
.focus_top{
  color:#4eb5f1;
  padding:15px 15px 15px 15px; 
  border-bottom:2px solid #4eb5f1;
  margin-top:10px ;
}
.kong{
  width: 100%;
  height: 500px;
  color:rgb(175, 175, 175);
  text-align: center;
  padding-top: 100px;
  background:url("../../public/imgs/show/show_kong.png") no-repeat;
  background-position: 152px 121px;
}

</style>
