<template>
<div>
        <div class="top">
          <img src="../../../public/imgs/icon/7.jpg" alt="">
          </div>
          <div class="content">
              <div class="up">
                  欢迎登录乐享
              </div>
                <van-cell-group>
              <van-field
                v-model="uname"
                required
                clearable
                label="用户名"
                right-icon="question-o"
                placeholder="请输入您的用户名"
                :error-message="active"
                @click-right-icon="$toast('用户名为您的手机号')"
                v-focus
              />

              <van-field
                v-model="upwd"
                clearable
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                error-message="密码输入格式有误"
                right-icon="question-o"
                @click-right-icon="$toast('密码长度在3-12位')"
                 v-focus
              />
            </van-cell-group>
              <div class="center">
                  <span>忘记密码?</span>
                  <span>立即注册</span>
              </div>
              <div class="bottom">
                    <button @click="gogo()">登录</button>
              </div>
        </div>
  
  </div>
</template>
<script>
export default {
  data(){
    return{
      uname:'',
      upwd:''
    }
  },
  watch:{
    uname(){
       this.gogo()
    }
  },
  methods:{
      gogo(){

      }
  }
}
</script>
<style scoped>
    .top img{
      width: 100%;
      height: 30%;
    }
    .content{
      padding:0 2rem;
      margin-top:2rem;
    }
    .content .up{
        font-size: 2.1rem;
        color:rgba(0,0,0,0.8);
        font-family: "simhei";
        margin-bottom:1rem;
        }
      .content .center{
          margin-top:1rem;
          display: flex;
          justify-content: space-between;
          padding:0 0.5rem; 
      }
      .content .center span{
          font-size:0.8rem;
          color:#bbb;
      }
       .content .bottom{
         text-align: center;
         margin:2rem 0;
       }
      .content .bottom button{
         outline:0;
         border: 0;
         font-size: 1.6rem;
         color:#fff;
         background: #38BAF8;
         padding:0.3rem 4rem;
         border-radius: 2rem;
      }
</style>
