<template>
  <div class="video">
    <div class="information">
      <div class="auto">
        <span class="title-img">
          <img :src="auimg">
        </span>
        <span class="nicname">{{aunick}}</span>
      </div>
      <div class="desc"> {{desc}}</div>
    </div>
    <div class="container" @mouseenter="enter" @mouseleave="leave">
        <video id="v3" :src="videoSrc" :controls="isControls"></video>
    </div>
    <div class="video_bottom">
     <div class="pinlun">
       <img src="http://127.0.0.1:5050/material/images/v_pinlun.png"><span>2</span>
     </div>
     <div class="zan">
       <img src="http://127.0.0.1:5050/material/images/v_zan.png"><span>3</span>
     </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    // 接收父元素数据
    auimg:{default:""},
    aunick:{default:""},
    desc:{default:""},
    videoSrc:{default:""}
  },
  data(){
    return{
      // isPlay:true,   //视屏播放暂停按钮
      isControls:false  //视频控制器显示隐藏
    }
  },
  methods: {
    enter(){
      this.isControls=true;
    },
    leave(){
      this.isControls=false;
    },
  },
}
</script>


<style scoped>
    div{
      box-sizing: border-box;  
    }
    .container{
      width: 100%;
      position: relative;
      text-align: center;
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
    .video{
      width: 100%;
      padding:10px;  
      margin-bottom: 10px; 
      background: rgb(255, 255, 255); 
    }
    .desc{
      width: 100%;
      color: #333;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
    }

    .title-img img{
      width: 50px;
      height: 50px;
       border-radius:50%; 
       /* vertical-align: middle;    图片文字居中   */
    }
    .nicname{
      color: rgb(21, 22, 22);
      font-size:15px;
      font-weight: 600;
      position: relative;
      top:-30px;
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
    }
</style>
