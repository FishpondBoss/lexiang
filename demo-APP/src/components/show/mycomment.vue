<template>
<div>
    <swiper-slide> 
      <div class="swiper_txt">
        <img :src="uimg">
        <p class="swiper-p1">{{nickname}}</p>
        <p class="swiper-p2">{{selfdom}}</p>
        <div @click="tofan" id="swiper-p3" class="wguanzhu"  v-show="fanshow==1"> ＋关注</div>
        <div @click="nofan" id="swiper-p3" class="guanzhu"  v-show="fanshow==0">已关注</div>
      </div>
    </swiper-slide>
</div>

</template>

<script>
import { Dialog } from 'vant';
export default {
  props:{
    uimg:{default:""},
    nickname:{default:""},
    selfdom:{default:""},
    fansid:{default:""},
  },
  data(){
    return{
     
      choose:false,
      show:false,
      fanshow:1,
    }
  },
  methods: {
      tofan(){
        var obj={fansid:this.fansid};
        var url="msgbox/tofan";
        this.axios.get(url,{params:obj}).then(res=>{
            if(res.data.code==-1){
              Dialog.confirm({
              title: '提示',
              message: '请先登录'
            }).then(() => {
              this.$router.push({path:'/Mylogin'})   //跳转到登录页面
            }).catch(() => {  
            });
            }else if(res.data.code==1){
              console.log("关注成功")
              // this.$emit("tobefan",this.i)
              this.fanshow=0;
            }else{
              $toast("关注失败")
            }
        })
        .catch(err=>{
            console.log(err);   
        })
      },
      nofan(){
          var obj={fansid:this.fansid};
          var url="msgbox/nofan";
          this.axios.get(url,{params:obj}).then(res=>{
              // console.log(res)
              if(res.data.code==1){  
                this.$messagebox.confirm("是否要取消关注")
                .then(res=>{console.log("确认")})
                .catch(err=>{console.log("取消")})
                this.fanshow=1;
              }else{
              $toast("取消关注")
             }
           })
          .catch(err=>{
              console.log(err);
          })
        },
  },
  created(){
  
  }
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
  /* .slide-fade{
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
} */
</style>