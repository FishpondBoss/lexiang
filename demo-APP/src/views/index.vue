<template>
  <div>
    <div class="bg">     
            <div class="times" v-if="n>0">{{n}}</div>  
            <div class="times" v-else @click="next">{{n}}</div>  
            <div class="container">
              爱分享&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;爱生活  
            </div> 
            <div class="title">
               乐享
              </div> 
              <div class="bottom">
                隐藏在内心中的傻屌气质是藏不住的<br>
                这里是你释放天性的天堂
              </div>
    </div>

  </div>
</template>
<script>
// import showMain from '../components/show/showMain.vue'
export default {
  components:{
    // showMain
  },
  data(){
    return{
      n:''
    }
  },
  methods:{
    jishi(){
      var time=6;
      var t=setInterval(()=>{
        time--;
        this.n=time;
        console.log(time)
        if(time==0){
          this.n="跳过"
        clearInterval(t);
        }
      },1000)
    },
    next(){
      this.$router.push("/Mylogin")
    }
  },
  created(){
      this.jishi()
  }
}
</script>
<style scoped>
        .bg{
          position: fixed;
          width: 100%;
          height: 100%;
          background: #40BFF9;
        }
        .bg .times{
          float:right;
          margin:1rem 1rem 0 0 ;
          width: 2rem;
          height:2rem;
          background: #eee;
          border-radius: 50%;
          text-align: center;
          line-height: 2rem;
          font-size: 0.8rem;
          color:#40BFF9;
        }
        .bg .container{
          font-size: 2rem;
          color:#fff;
          font-family: "华文琥珀";
          text-align: center;
          margin-top:40%;

        }
        .bg .title{
          width: 9rem;
          height: 9rem;
          background: #eee;
          border-radius: 50%;
          line-height: 9rem;
          font-size: 2rem;
          text-align: center;
          margin:30% auto;
          color:#40BFF9;
           font-family: "华文琥珀";
        }
        .bg .bottom{
          color:#fff;
          text-align: center;
          font-family: "simhei";
          font-size: 0.8rem;
        }
</style>
