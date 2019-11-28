<template>
<div class="bottom">
    <div class="top_success">
      
          <div class="top_set" @click="myset">
              <img src="../../../public/imgs/shezhi.png" alt="">
          </div>
          <div class="content">
              <div class="textx" @click="godown">&lt;</div>
            <div class="content_top">
            <span>主页</span>      
          </div>
              <second :uid="uid"></second>    
          </div>
    </div>
    <div>
        <exam02 :uid="uid"></exam02>
    </div>
  </div>
</template>
<script>
 import second from "./other/second.vue"
 import exam02 from "./other/exam02.vue"
export default {
  components:{
   second,exam02
  },
  data(){
    return{
      uid:''
    }
  },
  methods:{
    godown(){
      var t=setTimeout(()=>{
        this.$router.go(-1)
      },1000)
    },
    myset(){
      this.$router.push('/Myset')
    },

  },
  created(){
    this.uid=this.$route.query.uid;
    console.log("myyourself"+this.uid)
  }

}
</script>
<style scoped>
.textx{
  transform: scale(1,2);
  float:left;
  color:#fff;
  margin-left:1rem;
}
.bottom{
  margin-bottom: 3.5rem;
}
  .top_success{
      width:100%;
      height:16rem;
      background:url("../../../public/imgs/icon/8.jpg")
   
    }
    .top_success::before{
      display: table;
      content:''
    }
  .top_set{
    float:right;
    /* background: #eef; */
    right:1rem;
    top:0.5rem;
    margin:1.3rem 1rem 0 0;
    width:1.3rem;
    height: 1.3rem;
    border-radius: 0.2rem;
  }
  .top_set img{
    width:1.3rem;
    height: 1.3rem;
  }
  .content .content_top{
    margin:2rem 0 0 1rem;
    text-align: center;
    color:#fff;
    font-size: 1.2rem;
  }
  .content .content_top span{
    margin-left:1rem;
  }
</style>
