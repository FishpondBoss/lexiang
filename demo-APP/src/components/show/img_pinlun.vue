<template>
   <div class="img_pinglun">
      <mt-header fixed :title="title" class="bigbox">
        <router-link to="" slot="left">
          <mt-button icon="back" @click.native="$router.back(-1)">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right" @click.native="more"></mt-button>
      </mt-header>
  <!-- 左上角弹出框 -->
    <mt-actionsheet
      :actions= "data"
      v-model="sheetVisible">
    </mt-actionsheet>
    <div id="main">
  <!-- 图文消息 -->
        <row   
          :item="item"
        ></row> 
  <!-- 评论 -->
      <div class="pinlun_main" v-for="(pitem,index) in pdata" :key="index">
        <div class="left">
            <img :src="axios.defaults.baseURL+pitem.uimg">
          </div>
          <div class="right">
            <p class="name">{{pitem.nickname}}</p>
            <p class="desc">{{pitem.cdetails}}</p>
            <p class="time">{{pitem.uptime}}</p>
          </div>
      </div>
    </div>
    <!-- 底部评论点赞图标 -->
    <div class="pinlun_bottom">
      <div class="pinlun">
         <div @click="showPopup"> 
           <img src="../../../public/imgs/show/v_pinlun.png">
         </div>
      </div>
     <div class="zan">
       <img src="../../../public/imgs/show/v_zan.png">
     </div>
    </div>
    <!-- 底部站位 -->
    <div class="b_zhanwei"></div>
    <!-- 弹出评论框 -->
     <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="200"
            style="height: 174px;"
            placeholder="请输入留言"
            show-word-limit
          />
        <van-button type="primary" size="large" @click.native="insert">发送</van-button> 
      </van-popup>
  </div>
</template>
<script>
import row from './pinlun_row.vue'
import { Popup } from 'vant';
export default {
    props:{
      // 接收父元素数据
      zanSrc:""
    },
   components:{
     "row":row,
   },
   data() {
     return {
       show: false,
       message:"",
       display:false,
       item:{},
       pdata:{},
       data: [{
                name: '收藏',
           //   method : this.getCollect	
              }, {
                name: '关注', 
           //   method : this.guanzhu	
              }, {
                name: '屏蔽', 
           //    method : this.guanzhu	
              }, {
                name: '投诉', 
           //   method : this.guanzhu	
              }],
      sheetVisible:false,
      title:"正文"
     }
   },
   methods: {
     insert(){
       var ss=window.sessionStorage.getItem("myInfo")
       var xx=JSON.parse(ss)
       var cdetails=this.message;
       if(cdetails==""){
          this.$toast("评论不能为空")
       }else{
          var pid=this.item.pid;
          var uptime=new Date().toLocaleString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '');
          var obj={pid:pid,cdetails:cdetails,uptime:uptime}
            this.axios.get("img/addpinglun",{params:obj})
          .then(res=>{
            console.log(res.data)
            if(res.data.code==1){
              this.$toast("评论成功")
              var newPL={cdetails:cdetails,nickname:xx.nickname,uptime:uptime,uimg:xx.uimg}
              this.pdata.push(newPL)
              this.show=false;
            }
          }).catch(err=>{
            console.log(err)
          }) 
       }
     },
      showPopup() {
        this.show = true;
      },
     load(){ 
       var obj={pid:this.item.pid}
       this.axios.get("img/pinlun",{params:obj})
      .then(res=>{
        this.pdata=res.data
        console.log(this.pdata)
      }).catch(err=>{
        console.log(err)
      })  
     },
     more(){
       this.sheetVisible=this.sheetVisible?false:true
     },
     scrollToTop() { 
      　　var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      　　if(scrollTop<41){
              this.title="正文"
          }else{
            this.title=this.item.nickname;
          }
      }
   },
  
  created() {
       this.item=this.$route.query.item;
       this.load()
   },
  // 监听滚轮
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
}
</script>
<style scoped>
/* div#main{
  position: absolute;
  top:40px;
  right:0;
  left:0;
} */
.van-overlay{
  background-color: rgba(0,0,0,.5);
}
.mint-header-title{
  font-size: 14px;
}
.mint-header{
  background: #39BDF8;
}
.van-button--primary{
  background-color: #39BDF8;
}
.img_pinglun{
  padding-top:30px;
}
.bigbox{
  width: 100%;
}
.information .desc{
  padding:5px 25px 5px 5px; 
  text-align:justify;
  overflow:auto !important;
  text-overflow:inherit !important;
  white-space:normal !important;
}
.van-field__control{
  width: 100%;
  height: 130px !important;
  font-size:16px; 
  background: rgb(241, 241, 241);
}

.pinlun_bottom img{
  width: 25px;
}
.container img{
  width: 75%;
}
.container{
  text-align: left
}
.mint-actionsheet-list{
 background:rgba(65, 64, 64, 0.5);
}
.mint-actionsheet-list li:first-child{
  border-top-left-radius:12px;
  border-top-right-radius: 12px; 
}
.pinlun_bottom{
     width: 100%;
     bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    display: flex;
    background: rgb(248, 248, 248);
    text-align: center;
    box-shadow: 0px 13px 22px 6px rgb(155, 155, 166);
    font-size: 14px;
    padding: 11px 0 0 0;
}
.pinlun_bottom div{
  width: 50%;
}

.pinlun_main{
  width: 100%;
  display:flex;
  padding: 10px 10px  ;
  background: #fff;
}
.pinlun_main .left{
  width: 60px;
  height: 60px;
}
.pinlun_main .left img{
  width: 45px;
  height: 45px;
  border-radius:50% 
}
.pinlun_main .right{
  padding:1px 19px 14px 0px;
  width: 78%;
  border-bottom: 1px solid rgb(207, 204, 204);
}
.pinlun_main .name{
  font-size:14px;
  font-weight: 600;
  color: rgb(255, 187, 79) ;
  height: 30px;
}
.pinlun_main .desc{
  font-size:16px;
  color: rgb(71, 71, 71);
  padding: 7px 0;
}
.pinlun_main .time{
  font-size:12px;
  height: 10px;
  color:rgb(105, 105, 105)
}
.b_zhanwei{
  width: 100%;
  height: 40px;
}


</style>


