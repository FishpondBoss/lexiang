<template>
   <div class="top">
    <div class="theme">广场</div>
    <div class="switch"  >
      <!-- <mt-switch v-model="choose" @change.native="chooses"></mt-switch> -->
    </div>
    <div class="atta">
      <div @click="showPopup">
             <img src="../../../public/imgs/show/guanzhu.png">
      </div>
    </div>
    <!--  显示关注-->
   <van-popup v-model="show" position="right" :style="{height:'100%',width:'100%'}" closeable>  

<div class="swiper-inner">
  <swiper :options="swiperOption" > 
    <swiper-slide  v-for="(item,i) of lists" :key="i">
      <!-- swiper -->
      <div class="swiper_txt">
        <mycomment
        :nickname="item.nickname"
        :selfdom="item.selfdom"
        :uimg="axios.defaults.baseURL+item.uimg"
        :fansid="item.uid"
        ></mycomment>
       </div>
     </swiper-slide>
  </swiper>
</div> 
        
    <!-- 底部列表 --> 
      <mytxt v-for="(item,i) of lists"  :key="i"
      :nickname="item.nickname"
      :selfdom="item.selfdom"
      :uimg="axios.defaults.baseURL+item.uimg"
      :fansid="item.uid"
      ></mytxt>
  </van-popup>  

  </div>
</template>
<script>
import mycomment from './mycomment.vue'
import mytxt from './mytxt.vue'

export default {
  components:{
    "mycomment":mycomment,
    "mytxt":mytxt,
  },
  data() {
    return {
      lists:[],
      choose:"",
      show:false,
      swiperOption: {
        effect: 'coverflow',//覆盖流
        grabCursor: true, //获取光标  true
        centeredSlides: true,//中心幻灯片 true
        slidesPerView: 'auto',//  自动
        coverflowEffect: {
          rotate: 50, //旋转
          stretch: 0, //拉伸
          depth: 100, // 深度
          modifier: 1, //修饰
          slideShadows : true, 
        },
      },
    }
  },
  methods: {
    follow(){
        this.axios.get("img/follow")
        .then(res=>{
          var list=res.data
          for(var item of list){
           this.lists.push(item);
          }
        })
        .catch(err=>{
          console.log(err);
        })
      },
      tobefan(i){
        this.lists[i].fanshow=1;
      },
      nobefan(i){
        this.lists[i].fanshow=0;
      },
      showPopup(){
        this.show = true;
      },
      chooses(){
        this.$emit('show',this.choose)
     }
  },
  created() {
    this.chooses()
    this.follow()
  },
}
</script>
<style scoped>
.theme{
  color: rgb(41, 40, 40);
  font-size: 25px;
  margin:10px 10px;
}
.mint-switch{
  margin-top:14px; 
  margin-left:14px; 
}
.mint-switch-core::after{
  width: 83px;
}
.mint-switch-core::after, .mint-switch-core::before{
  left: -2px;
}
.mint-switch-core::before {
    width: 113px;
    height: 30px;
    background-color: #83E887;
}
.mint-switch-input:checked + .mint-switch-core {
    border-color: #83E887;
    background-color: #83E887;
}
</style>
<style scoped>
.top{
  height: 60px;
  width: 100%;
  position: fixed;
  top:0px;
  z-index:999;
  display:flex;
  justify-content:space-between;
  padding:5px 20px;
  background:#fff;
  box-shadow: 0px 0px 7px 3px rgb(216, 216, 216)
}
.top .switch{
  width: 27%;
  height: 60px;
}
.top .atta{
  margin-right:35px;
}
.atta img{
  width: 30px;
  height: 30px;
  margin-top:12px
}

.swiper-inner {
  width: 100%;
  height: 12rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #ccc;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 10rem;
  height: 11rem;
  background-color: #fff;
  border-radius: 1rem;
  
}
 .swiper_txt{
    text-align: center;
    border-radius: 20px;
  }
  .swiper_txt >img{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-top: 1rem;
  }
  .swiper-p1{
    width: 50%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.8rem;
    font-weight: bold;
    margin: 0 auto;
  }
  .swiper-p2{
    width: 70%;
    font-size: 0.7rem !important;
    margin: 0 auto;
    color:#3e3e3e;
    margin-top: 0.2rem;
  }
  #swiper-p3{
    width: 50%;
    margin:0 auto ;
    margin-top:0.5rem ;
  }
/* 轮播图 */
  .slide-fade{
  position: fixed;left:0;right: 0;
  width: 100%;
  background-color: white;
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;top: 0;right: 0;
  position: absolute;
  transform:translateX(-500px) translateY(-500px) rotate(-150deg) scale(0.5);
  opacity:1;
}
.slide-fade-enter-active {
  background-color: white;
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.7s ease;
  background-color: white;
  transform:translateX(500px) translateY(500px) rotate(150deg) scale(1) ;
  z-index: 100;
}
</style>
