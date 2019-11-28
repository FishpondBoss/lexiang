<template>
<div class="bottom">
    <div class="top_success">
      
          <div class="top_set" @click="myset">
              <img src="../../../public/imgs/shezhi.png" alt="">
          </div>
          <div class="content">
            <div class="content_top">
            <span>主页</span>      
          </div>
              <one></one>    
          </div>
    </div>
    <div>
        <exam01></exam01>
    </div>
  </div>
</template>
<script>
import one from "./myHeader/one.vue"
import exam01 from "./myHeader/exam01.vue"
export default {
  components:{
  one,exam01
  },
  data(){
    return{
      
    }
  },
  methods:{
    myset(){
      this.$router.push('/Myset')
    },

  }

}
</script>
<style scoped>
.bottom{
  margin-bottom: 3.5rem;
}
  .top_success{
      width:100%;
      height: 18rem;
      background:url('../../../public/imgs/icon/8.jpg') no-repeat;
      background-size:100% 100%;
   
    }
    .top_success::before{
      display: table;
      content:''
    }
  .top_set{
    float:right;

    right:1rem;
    top:0.5rem;
    margin:1.3rem 1rem 0 0;
    width:1.5rem;
    height: 1.5rem;
    border-radius: 0.2rem;
  }
  .top_set img{
    width:1.5rem;
    height: 1.5rem;
  }
  .content .content_top{
    margin:2rem 0 0 1rem;
    text-align: center;
    color:#fff;
    font-size: 1.5rem;
  }
  .content .content_top span{
    margin-left:1rem;
  }
</style>
