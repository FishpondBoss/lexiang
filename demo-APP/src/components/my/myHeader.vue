<template>
  <div class="top">
     
        <div class="top_set" @click="myset">
            <img src="../../../public/imgs/shezhi.png" alt="">
        </div>
        <div class="top_lr" @click="mylogin">立即登录/注册</div>
  </div>
</template>
<script>
export default {
  data(){
      return{
        
      }
  },
  methods:{
    myset(){
      this.$router.push("/mySet")
    },
    mylogin(){
      this.$router.push("/myLogin")
    }
  }
}
</script>
<style scoped>
    .top{
      width:100%;
      height: 14rem;
      background: #38BAF8;
      position:relative;
    }
    .top::before{
      display: table;
      content:''
    }
  .top_set{
    position: absolute;
    background: #eef;
    right:1rem;
    top:1.3rem;
    width:1.3rem;
    height: 1.3rem;
    border-radius: 0.2rem;
  }
  .top_set img{
    width:1.3rem;
    height: 1.3rem;
  }
  .top_lr{ 
     margin:6.5rem auto 0;
    line-height: 2rem;
    text-align: center;
    font-size:1rem;
    width:9rem;
    height: 2rem;
    background: #fff;
    border-radius: 0.8rem;
    color: #38BAff;
  }
</style>

