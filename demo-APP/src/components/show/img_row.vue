<template>
  <div class="img">
    <div class="information">
      <div class="auto">
        <span class="title-img" @click="geren">
          <img :src="auimg">
        </span>
        <div class="title_info">
            <span class="nicname">{{aunick}}</span>
            
        </div>
      </div>
      <div class="desc"> {{desc}}</div>
    </div>
    <div class="container">
      <div class="show_img">
        <img v-show="a" :src="axios.defaults.baseURL+imgsSrc[0]" class="oneimg" @click="maginf(imgsSrc[0])">
        <bb v-show="b" :jici="imglen" :imgsSrc="imgsSrc"></bb>
        <cc v-show="c" :jici="imglen" :imgsSrc="imgsSrc"></cc>
      </div>
    </div>
    <div><p class="uptime">{{uptime}}</p></div>
    <div class="video_bottom" v-if="z">
     <div class="pinlun">
       <div>
       <img src="http://127.0.0.1:5050/material/images/v_pinlun.png" @click="pinlun">{{pinlunCount}}</div>
     </div>
     <div class="zan">
       <img :src="zan" @click="active" :class="dzan"><span class="zan_num">{{pfavour}}</span>
     </div>
    </div>
  </div>
  <!-- material/images/v_zan.png -->
</template>
<script>
import { ImagePreview } from 'vant';
import bb from './g24.vue'
import cc from './g369.vue'
export default {
  components:{
    "bb":bb,
    "cc":cc
  },
  props:{
    // 接收父元素数据
    auimg:{default:""},
    z:{deault:true},
    aunick:{default:""},
    desc:{default:""},
    imgSrc:{default:""},     //图片路径
    uptime:{default:""},
    pfavour:{default:0},
    index:{default:0},
    item:{},   //点击的图文id
    pinlunCount:{default:0}  //评论数
  },
  data(){
    return{
      imgsSrc:[],
      a:false,
      b:false,
      c:false,
      imglen:1,
      dzan:{big:false},
      zan:"http://127.0.0.1:5050/material/images/v_zan.png"
    }
  },
  methods: {
    geren(){
      this.$router.push({path:'/Myyourself',query:{uid:this.item.uid}});
    },
    pinlun(){
       this.$router.push({path:'/show_pinlun',query:{item:this.item}});
    },
     maginf(img){
           ImagePreview(["http://127.0.0.1:5050/"+img]);
     },
    addZ(){
      // var obj={pid:this.pid}
      // this.axios.get("img/addzan",{params:obj})
      // .then(res=>{
      //   var result=res.data.length;
      //   if(result>0){
      //     this.zan="http://127.0.0.1:5050/material/images/v_dzan.png";
      //   }
        
      // }).catch(err=>{
      //   console.log(err)
      // })   
    },
    active(){
      // console.log(this.$store.getters.getZanNum)
      if(this.zan=="http://127.0.0.1:5050/material/images/v_zan.png"){
       this.zan="http://127.0.0.1:5050/material/images/v_dzan.png";
       this.dzan.big=true
       this.pfavour++
      }else{
       this.zan="http://127.0.0.1:5050/material/images/v_zan.png";
       this.dzan.big=false;
       this.pfavour--
      }
    },
    findZ(){
      // var obj={pid:this.pid}
      // this.axios.get("img/findzan",{params:obj})
      // .then(res=>{
      //   var result=res.data.length;
      //   if(result>0){
      //     this.zan="http://127.0.0.1:5050/material/images/v_dzan.png";
      //   }
        
      // }).catch(err=>{
      //   console.log(err)
      // })   
    }  
  },
  created() {
    this.findZ()
    console.log(this.imgSrc)
    this.imgsSrc=this.imgSrc.split("|");
    this.imglen=this.imgsSrc.length
    switch(this.imglen){
      case 0:
        this.a=false;
        this.b=false;
        this.c=false;
        console.log("没有图片")
        break;
      case 1:
        this.a=true;
        this.b=false;
        this.c=false;
        console.log("1张图片")  
        break;
      case 2:
      case 4:
        this.a=false;
        this.b=true;
        this.c=false;
        console.log("2/4张图片")    
        break;    
      default:
        this.a=false;
        this.b=false;
        this.c=true; 
        console.log("3/6张图片")  
        break;                    
    }
  },
}
</script>

<style scoped>
    .container{
      width: 80%;
      position:relative;
      padding: 20px 0;
      margin-left:50px; 
    }

    .container .oneimg{
      width: 75%;
    }
    .container #ctrl{
      position: absolute;
      z-index: 2;
      top:39%;
      left: 44%;
      display:none;
    }
    .img{
      width: 100%;
      padding-top:10px; 
      margin-bottom: 10px; 
      background: rgb(255, 255, 255); 
    }
    .information{
      margin-left:10px; 
    }
    .information .desc{
      width: 80%;
      margin-left:50px; 
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
    }
    .auto{
      display:flex; 
    }
    .title-img img{
      width: 50px;
      height: 50px;
       border-radius:50%; 
       /* vertical-align: middle;    图片文字居中   */
    }
    .nicname{
      color: rgb(21, 22, 22);
      font-size:17px;
      font-weight: 600;
      color: rgb(218, 155, 40)
    }
    .uptime{
      color: rgb(105, 103, 103);
      font-size:14px; 
      margin-left:50px; 
    }
    .title_info{
      padding-left:10px; 
    }
    .video_bottom{
      width: 100%;
      height: 40px;
      border-top:2px solid rgb(228, 224, 224);
      margin-top:10px; 
      display:flex;
      padding-top:0.1rem; 
      justify-content:center;
      text-align: center;
      font-size:0.8rem; 
    }
    .video_bottom img{
      width:1rem;
      vertical-align:text-top;
    }
    .video_bottom span{
      margin-left:0.4rem; 
    }
    .pinlun{
      width: 50%;
      height: 40px;
      line-height:40px;
    }
    .zan{
      width: 50%;
      height: 40px;
      line-height:40px;
      position: relative;
      z-index: 10
    }
    .big{
      position: relative;
      width: 2rem !important;
      top:-18px;
      left:6px;
      /* animation:bigm 12s; */
      transition: all 0.5s;
    }
    .zan_num{
      position:absolute;
      z-index: 4
    }
    @keyframes bigm {
      0%{width: 2rem !important;;}
      100%{width: 1rem !important;;}
    }
</style>