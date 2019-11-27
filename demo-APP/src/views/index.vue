<template>
  <div class="bg">
  <img src="../../public/imgs/icon/11.jpg" alt="">
   <div class="times" v-if="n>0" @click="next">{{n}}</div>  
    <div class="times" v-else @click="next">{{n}}</div>  
  </div>
</template>
<script>
export default {
  data(){
    return{
      n:''
    }},
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
    position: relative;
  }
  .bg img{
    width: 100%;
    height: 100%;
  }
   .bg .times{
          position: absolute;
          z-index: 1;
          top:1rem;
          right:1rem;
          width: 2rem;
          height:2rem;
          background: #eee;
          border-radius: 50%;
          text-align: center;
          line-height: 2rem;
          font-size: 0.8rem;
          color:#40BFF9;
        }
</style>
