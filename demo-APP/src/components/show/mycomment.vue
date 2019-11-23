<template>
<div class="comment">
  关注
  <!-- Popup -->
      <van-cell is-link @click="showPopup">&nbsp;</van-cell>
  <van-popup v-model="show" position="right" :style="{height:'100%',width:'100%'}" closeable>
    <div class="swiper-inner">
      <!-- swiper -->
      <swiper :options="swiperOption" > 
        <swiper-slide v-for="(item,i) of lists" :key="i">
          <div class="swiper_txt">
            <img :src="axios.defaults.baseURL+item.uimg">
            <p class="swiper-p1">{{item.nickname}}</p>
            <p class="swiper-p2">{{item.selfdom}}</p>
            <div @click="tofan" id="swiper-p3" class="wguanzhu" :data-id="item.uid">＋关注</div>
            <!-- <div @click="nofan" id="swiper-p3" class="guanzhu">已关注</div> -->
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
      </div>
    </div>
  </van-popup>  
</div>
</template>

<script>

  export default {
    props:{
      nickname:{default:""},
      selfdom:{default:""},
      uimg:{default:""},
      uid:{default:""}
    },
    data() {
      return {
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
          // pagination: {
          //   el: '.swiper-pagination'
          // }
        },
        con:"＋关注",
        flag:false,
        lists:[],
        show:false,
      }
    },
    methods: {
      showPopup(){
        this.show = true;
      },
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
    tofan(event){
        console.log(event.target.dataset.id)
        var obj={fansid:event.target.dataset.id};
        var url="msgbox/tofan";
        this.axios.get(url,{params:obj}).then(res=>{
            console.log(res)
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
    
    },
    created() {
      this.follow()
    },
  
  }
</script>

<style scoped>
 /* 关注 */
.guanzhu{/*已关注的样式*/
  font-size: 0.9rem;
  background-color: #fff;/*#bdbebd*/
  height: 1.7rem;
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
  height: 30px;
  padding: 0rem 0.6rem;
  border-radius: 1.8rem;
  text-align: center;
  line-height: 1.8rem;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

 /*  */
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
  /* 底部列表 */
  .txt-list{
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    
  }
  .txt-list img{
    width: 4.2rem;
    height: 4rem;
    border-radius: 0.5rem;
  }
  .txt-left{
    width: 80%;
    display: flex;
    /* background-color: #0ff; */
  }
  .txt-h3{
    font-size: 1rem;
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
    margin-top: 0.7rem;
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


