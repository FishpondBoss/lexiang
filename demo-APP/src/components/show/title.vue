<template>
   <div class="top">
    <div>动态</div>
    <div class="switch"  >
      <mt-switch v-model="choose" @change.native="chooses"></mt-switch>
    </div>
    <div class="atta">
      <van-cell is-link @click="showPopup">
             <img src="http://127.0.0.1:5050/material/images/guanzhu.png">
      </van-cell>
    </div>
    <!--  显示关注-->
   <van-popup v-model="show" position="right" :style="{height:'100%',width:'100%'}" closeable>
    <div class="swiper-inner">
      <!-- swiper -->
      <swiper :options="swiperOption" > 
        <swiper-slide v-for="(item,i) of lists" :key="i">
          <div class="swiper_txt">
            <img :src="axios.defaults.baseURL+item.uimg">
            <p class="swiper-p1">{{item.nickname}}</p>
            <p class="swiper-p2">{{item.selfdom}}</p>
            <div @click="tofan" id="swiper-p3" class="wguanzhu" :data-id="item.uid" v-show="fanshow==1"> ＋关注</div>
            <div @click="nofan" id="swiper-p3" class="guanzhu" :data-id="item.uid" v-show="fanshow==0">已关注</div>
          </div>
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div>  小圆点 -->
      </swiper>
    </div>
    <!-- 底部列表 -->
    <div class="txt-list" v-for="(item,i) of lists"  :key="i"> 
      <div class="txt-left">
        <img :src="axios.defaults.baseURL+item.uimg" alt="">
        <div class="txt-page">
          <h3 class="txt-h3">{{item.nickname}}</h3>
          <p class="txt-p">{{item.selfdom}}</p>
        </div>
      </div>
      <div class="txt-right">
        <!-- <div @click="enter" id="txt-gz" v-bind:class="{'guanzhu':flag,'wguanzhu':!flag}">{{con}}
        </div> -->
        <div @click="tofan" id="txt-gz" class="wguanzhu" :data-id="item.uid" v-show="fanshow==1"> ＋关注</div>
        <div @click="nofan" id="txt-gz" class="guanzhu" :data-id="item.uid" v-show="fanshow==0">已关注</div>
      </div>
    </div>
  </van-popup>  

  </div>
</template>
<script>
export default {
  data() {
    return {
      choose:false,
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
        lists:[],
        show:false,
        fanshow:1

    }
  },
   methods: {
     follow(){
        var obj={uimg:"uimg",nickname:"nickname",selfdom:"selfdom"}
        console.log(obj)
        this.axios.get("img/follow",{params:obj})
        .then(res=>{
          console.log(res.data)
          var list=res.data
          for(var item of list){
           this.lists.push(item);
          }
          console.log(this.lists);
        })
        .catch(err=>{
          console.log(err);
        })
      },
      showPopup(){
        this.show = true;
      },
      tofan(event){
        console.log(event.target.dataset.id)
        var ID=event.target.dataset.id;
        var obj={fansid:event.target.dataset.id};
        var url="msgbox/tofan";
        this.axios.get(url,{params:obj}).then(res=>{
          console.log(1111111111)
            console.log(res.data)
            if(res.data.code==1){
              console.log("关注成功")
              this.uid.fanshow=0;
            }else{
              console.log("关注失败")
            }
        })
        .catch(err=>{
            console.log(err);
            
        })
      },
      nofan(){
          var obj={fansid:event.target.dataset.id};
          var url="msgbox/nofan";
          this.axios.get(url,{params:obj}).then(res=>{
              console.log(res)
          })
          .catch(err=>{
              console.log(err);
          })
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
  /* height: 60px; */
  width: 100%;
  position: fixed;
  top:0px;
  z-index:999;
  display:flex;
  justify-content:space-between;
  /* line-height: 60px; */
  padding:5px 20px;
  background:#fff;

}
.top .switch{
  width: 27%;
  height: 60px;
}
.top .atta{
  width: 60px;
  height: 50px;
}
.atta img{
  width: 40px;
  height: 40px;
  margin-top:10px
}
 /* 关注 */
.guanzhu{/*已关注的样式*/
  font-size: 0.9rem;
  background-color: #fff;/*#bdbebd*/
  /* height: 1.7rem; */
  padding: 0rem 0.6rem;
  border-radius: 1.8rem;
  text-align: center;
  line-height: 1.7rem;
  color: #bdbdbd;
  font-weight: 700;
  border: 1px solid #bdbebd;
  cursor: pointer;
}
.wguanzhu{
  font-size: 12px;
  background-color: #38ff;
  /* height: 30px; */
  padding: 2px 6px;
  border-radius: 1.8rem;
  text-align: center;
  line-height: 1.2rem;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

 /*  */
  .swiper-inner {
    width: 100%;
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: #ccc;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 180px;
    height: 220px;
    background-color: #fff;
    border-radius: 1rem;
  }
  .swiper_txt{
    text-align: center;
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
    font-size: 17px;
    font-weight: bold;
    margin: 0 auto;
  }
  .swiper-p2{
    width: 70%;
    height: 20px;
    font-size: 14px !important;
    margin: 0 auto;
    color:#3e3e3e;
    margin-top: 10px;
    overflow: hidden;
  }
  #swiper-p3{
    width: 50%;
    margin:0 auto ;
    margin-top:0.5rem ;
  }
  /* 底部列表 */
  .txt-list{
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    
  }
  .txt-list img{
    width: 70px;
    /* height: 60px; */
    border-radius: 0.5rem;
  }
  .txt-left{
    width: 80%;
    display: flex;
    /* background-color: #0ff; */
  }
  .txt-h3{
    font-size: 16px;
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
  .txt-p{
    width: 62%;
    color:#3e3e3e;
    font-size: 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 0.5rem;
    margin-left: 1rem;
  } 
  .txt-right>#txt-gz{
    margin-top: 20px;
    border-radius:20px;
    padding:2px 15px;
    margin-right: 5px;
  }
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
