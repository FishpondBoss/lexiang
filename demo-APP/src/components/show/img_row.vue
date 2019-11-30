<template>
  <div class="img">
    <div class="information">
      <div class="auto">
        <span class="title-img" @click="geren">
          <img :src="auimg">
        </span>
        <div class="title_info">
            <span class="nicname">{{aunick}}</span><p class="uptime">{{uptime}}</p>
        </div>
      </div>
      <div class="desc"> {{desc}}</div>
    </div>
    <div class="container">
      <div class="show_img">
        <img v-show="a" :src="axios.defaults.baseURL+imgsSrc[0]" class="oneimg" @click="maginf(imgsSrc[0])">
        <bb v-show="b" :jici="imglen" :imgsSrc="imgsSrc"></bb>
        <cc v-show="c" :jici="imglen" :imgsSrc="imgsSrc"></cc>
        <div v-show="show_video" class="video_container" @mouseenter="enter" @mouseleave="leave">
            <video id="v3" :src="axios.defaults.baseURL+imgsSrc[0]" :controls="isControls"></video>
        </div>
      </div>
    </div>
    <div class="video_bottom" v-if="z">
     <div class="pinlun">
       <img src="../../../public/imgs/show/v_pinlun.png" @click="pinlun"><span class="zan_num">{{pinlunCount}}</span>
     </div>
     <div class="zan">
       <img :src="zan" @click="active" :class="dzan"><span class="zan_num">{{isPfavour}}</span>
     </div>
    </div>
  </div>
  <!-- material/images/v_zan.png -->
</template>
<script>
import zanImg from '../../../public/imgs/show/v_zan.png'
import DzanImg from '../../../public/imgs/show/v_dzan.png'
import { ImagePreview } from 'vant';
import { Dialog } from 'vant';
import bb from './g24.vue'
import cc from './g369.vue'
export default {
  components:{
    "bb":bb,
    "cc":cc
  },
  props:{
    // 接收父元素数据
    isLogin:{default:""},  //获得是否有用户登录  及uid
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
      isPfavour:"",
      canClick:true,
      zan:zanImg,
      isControls:false,  //视频控制器显示隐藏
      show_video:false
    }
  },
  methods: {
    enter(){
      this.isControls=true;
    },
    leave(){
      this.isControls=false;
    },
    geren(){
      this.$router.push({path:'/Myyourself',query:{uid:this.item.uid}});
    },
    pinlun(){
       if(this.isLogin==""){
        Dialog.confirm({
          title: '提示',
          message: '请先登录'
        }).then(() => {
          this.$router.push({path:'/Mylogin'})   //跳转到登录页面
        }).catch(() => {
        });
      }else{
       this.$router.push({path:'/show_pinlun',query:{item:this.item,show_video:this.show_video}});
      }
    },
     maginf(img){
           ImagePreview(["http://127.0.0.1:5050/"+img]);
     },
    addZ(isZan){  
      // var obj={pid:this.item.pid,pfavour:this.pfavour,isZan:isZan}
      // console.log(this.pfavour)
      // this.axios.get("img/addzan",{params:obj})
      // .then(res=>{
      //   var result=res.data.code;
      //   if(result==200){
      //     alert("点赞成功")
      //   }
      //   alert("点赞失败")
      // }).catch(err=>{
      //   console.log(err)
      // })   
    },
    active(){ 
      if(this.isLogin==""){
        Dialog.confirm({
          title: '提示',
          message: '请先登录'
        }).then(() => {
          this.$router.push({path:'/Mylogin'})   //跳转到登录页面
        }).catch(() => {  
        });
      }else{
          var canClick=true;
            // console.log("开始"+canClick)
          if(canClick){
            canClick=false;
            // console.log(this.$store.getters.getZanNum)
            if(this.zan==zanImg){
              this.zan=DzanImg; 
              this.dzan.big=true;
              this.isPfavour++;
              this.addZ(true)
            }else{
            this.zan=zanImg;
            this.dzan.big=false;
            this.isPfavour--
            this.addZ(false)
            }
            // setTimeout(function(){
            //   console.log("结束")
            //   canClick=true
            //   console.log("定时器"+canClick)
            // },2000)
            // console.log('循环'+canClick)
          }
          // console.log("1"+canClick)
      }
    },
    findZ(){
      var obj={pid:this.item.pid}
      this.axios.get("img/findzan",{params:obj})
      .then(res=>{
        var result=res.data.code;
        if(result==200){
          this.zan=DzanImg;
        }
      }).catch(err=>{
        console.log("首次加载赞出错")
      })   
    },
    isImg(){
       if(this.imgSrc!==null){
        this.imgsSrc=(this.imgSrc).split("|");
        }
        this.imglen=this.imgsSrc.length
        if(/\.mp4$/.test(this.imgsSrc[0])){
           this.a=false;
              this.b=false;
              this.c=false;
              this.show_video=true;
        }else{
          switch(this.imglen){
            case 0:
              this.a=false;
              this.b=false;
              this.c=false;
              this.show_video=false;
              break;
            case 1:
              this.a=true;
              this.b=false;
              this.c=false; 
              this.show_video=false;
              break;
            case 2:
            case 4:
              this.a=false;
              this.b=true;
              this.c=false; 
              this.show_video=false;   
              break;    
            default:
              this.a=false;
              this.b=false;
              this.c=true;  
              this.show_video=false; 
              break;                    
          }
        }
    }
  },
  created() {
    this.isPfavour=this.pfavour;
    this.findZ()
    this.isImg()
  },
 
}
</script>

<style scoped>
    .container{
      width: 80%;
      position:relative;
      padding: 20px 0;
      margin-left:60px; 
    }
    .container .oneimg{
      width: 75%;
    }
     .container video{
      width: 97%;
      margin-top:20px; 
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
      padding-top:16px; 
      margin-bottom: 10px; 
      background: rgb(255, 255, 255); 
    }
    .information{
      margin-left:15px; 
      margin-top:10px; 
    }
    .information .desc{
      width: 80%;
      margin-left:50px; 
      margin-top:10px; 
      font-size: 16px;
      color:rgb(77, 77, 77);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
    }
    .auto{
      display:flex; 
    }
    .title-img img{
      width: 45px;
      height: 45px;
       border-radius:50%; 
       /* vertical-align: middle;    图片文字居中   */
    }
    .nicname{
      color: rgb(21, 22, 22);
      font-size:16px;
      font-weight: 600;
      color: rgb(226, 155, 41)
    }
    .uptime{
      color: rgb(105, 103, 103);
      font-size:14px;  
      margin-top: 5px;
    }
    .title_info{
      padding-left:10px; 
    }
    .video_bottom{
      margin: 0 auto;
      width: 95%;
      height: 40px;
      border-bottom:2px solid rgb(228, 224, 224);
      margin-top:10px; 
      display:flex;
      padding-top:0.1rem; 
      padding-bottom:1rem; 

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
      height: 40px;
      margin-left:50px; 
      line-height:40px;
    }
    .zan{
      width: 80px;
      height: 40px;
      
      line-height:40px;
      position: relative;
    }
    .big{
      position: relative;
      width: 1.5rem !important;
      top:-9px;
      left:6px;
      /* animation:bigm 12s; */
      transition: all 0.5s;
    }
</style>