<template>
  <div>
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
     :pfavour="item.pfavour"
     :pinlunCount="item.pinlunCount"
     :z=true
      ></imgrow>
  </div>
</template>
<script>
 import row from '../components/show/img_row.vue'
export default {
  components:{
    "imgrow":row
  },
  data() {
    return {
      data:[],
    }
  },
   filters:{
    // 调整显示时间  
    // filter_time(time){
    //   var year=time.slice(0,4);
    //   var month=time.slice(5,7);
    //   var data=time.slice(8,10);
    //   var hour=time.slice(11,16)
    //   if(year>2018){
    //     return `${month}月${data}日${hour}`
    //   }else{
    //    return `${year}年${month}月${data}日`
    //   }
    // },
  },
  methods: {
    addVideo(pno){

      this.axios.get("img/focus")
      .then(res=>{
        this.data=res.data;
        console.log(this.data)
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
  margin-top:10px 
}
</style>
