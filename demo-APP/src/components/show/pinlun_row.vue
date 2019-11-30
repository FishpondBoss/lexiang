<template>
<div>
     <div class="information">
      <div class="auto">
        <span class="title-img" @click="geren">
          <img :src="axios.defaults.baseURL+item.uimg">
        </span>
        <div class="title_info">
            <span class="nicname">{{item.nickname}}</span><p class="uptime">{{time}}</p>
        </div>
      </div>
      <div class="desc">{{item.pdesc}}</div>
    </div>
    <div class="container">
      <div class="show_img">
        <img v-show="a" :src="axios.defaults.baseURL+imgsSrc[0]" class="oneimg" @click="maginf(imgsSrc[0])">
        <bb v-show="b" :jici="imglen" :imgsSrc="imgsSrc"></bb>
        <cc v-show="c" :jici="imglen" :imgsSrc="imgsSrc"></cc>
        <div v-show="show_video" @mouseenter="enter" @mouseleave="leave">
            <video id="v3" :controls="isControls"   :src="axios.defaults.baseURL+imgsSrc[0]"></video>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import bb from './g24.vue'
import cc from './g369.vue'
export default {
  components:{
    "bb":bb,
    "cc":cc
  },
  props:{
    item:{default:""},

  },
  data(){
    return{
      time:'',
      imgSrc:"",
      imgsSrc:[],
      imglen:0,
      a:false,
      b:false,
      c:false,
     isControls:true,  //视频控制器显示隐藏
    }
  },
  filters:{
        
    },
  methods: {
    filter_time(time){
          if(time!==undefined){
            var year=time.slice(0,4);
            var month=time.slice(5,7);
            var data=time.slice(8,10);
            var hour=time.slice(11,16)
            if(year>2018){
              this.time=`${month}月${data}日${hour}`
            }else{
              this.time=`${year}年${month}月${data}日`
            }
          }
        } ,
      geren(){
        this.$router.push({path:'/Myyourself',query:{uid:this.item.uid}});
      },
      enter(){
        this.isControls=true;
      },
      leave(){
        this.isControls=false;
      },
      maginf(img){
           ImagePreview(["http://127.0.0.1:5050/"+img]);
      },
      isImg(){
          if(this.item.psrc!==null){
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
      this.imgSrc=this.item.psrc
      this.isImg()
      this.filter_time(this.item.upTime)
    }

}
</script>
<style scoped>
   .container{
      width: 100%;
      position:relative;
      padding: 19px 0;
    }
    .container .oneimg{
      width: 100%;
    }
     .container video{
      width: 100%;
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
      margin-left:6px; 
      margin-top:30px; 
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
      width: 50px;
      height: 50px;
       border-radius:50%; 
       /* vertical-align: middle;    图片文字居中   */
    }
    .nicname{
      color: rgb(21, 22, 22);
      font-size:17px;
      font-weight: 600;
      color: rgb(226, 155, 41)
    }
    .uptime{
      color: rgb(105, 103, 103);
      font-size:12px;  
      margin-top: 5px;
    }
    .title_info{
      padding-left:10px; 
    }

</style>
