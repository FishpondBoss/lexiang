<template>
  <div class="top">
     <div class="top_text">爱分享&nbsp;&nbsp;&nbsp;爱生活</div>
     <div class="body">
        <i></i>
          <div class="body_text">登录</div>
          <mt-field label="用户名" placeholder="请输入您的11位手机号"  class="user" type="text" v-model="uname"></mt-field>
          <mt-field label="密码" placeholder="密码长度在3~16位之间" class="upwd" type="upwd" v-model="upwd"></mt-field>
          <mt-button size="large" @click="login" class="login" >登录</mt-button>
            <div class="bottom">
              <span class="forget" @click="forupwd">忘记密码?</span>
              <span class="bottom_reg" @click="myreg">注册</span>
             </div>
     </div>
     <div class="code" v-show="success" >
          <slide-verify :l="42"
                    :r="10"
                    :w="310"
                    :h="155"
                    @success="onSuccess"
                    @fail="onFail"
                    @refresh="onRefresh"
                    :slider-text="text"
                    ></slide-verify>
        <div>{{msg}}</div>
     </div>
  </div>
</template>
<script>

export default {
      data(){
        return{
            uname:'',
            upwd:'',
            success:false,
            msg: '',
            text: '向右滑',
        }
      },
      methods:{
        onSuccess(){
            // this.$toast ("验证成功")
            this.success=false;
            var url="user/v1/login";
            console.log(2222);
            var obj={uname:this.uname,upwd:this.upwd};
            this.axios.get(url,{params:obj})
            .then(res=>{
              // console.log(res.data);
              if(res.data.code==-4){
                this.$toast(res.data.msg);
                setTimeout(() => {
                  this.$router.push("/myReg");
                }, 1000);
              }else if(res.data.code==1){
                console.log(res.data)
                  this.$toast(res.data.msg)
                  setTimeout(()=>{
                    this.$router.push("/IndexFu");
                  },1000)
              }

            })
            .catch(err=>{
              throw err; 
            })
        },
        onFail(){
            this.$toast("验证失败请重新输入")
        },
        onRefresh(){
            this.msg = ''
        },
        myreg(){
          this.$router.push("/myReg")
        },
        login(){
         var  uname=parseInt(this.uname)
         var  upwd=parseInt(this.upwd)
          if(!/^1[3-9]\d{9}$/.test(uname)){
                this.$toast("手机号格式不正确")
            return;
          }else if(!/^\d{3,9}$/.test(upwd)){
                  this.$toast("密码格式不正确")
                  return;
          }else{
            this.success=true;
              

            }
          
        },
        forupwd(){
          this.$router.push("/Myforupwd")
        }
       
      }
}
</script>
<style scoped>
     .top{
       position: fixed;
      width:100%;
      height: 100%;
      background: #38BAF8;
      
    }
  
     .top::before,.top::after{
          display:table;
          content:'';
        } 
    .top_text{
      margin-top:5rem;
      font-size: 2rem;
      color:#fff;
      text-align:center;

    }
    .top .body{
      margin:4.4rem auto;
      background: #aff;
      width: 85%;     
      height: 25rem;
      text-align: center;
      border-radius:0.3rem;
      padding:0 0.5rem;

    }
    .body i{
      float:left;
      margin:-1rem 0 0 1rem; 
      width: 0;
      height: 0;
      border-bottom:1rem solid #aff;
      border-left:0.7rem solid transparent;
      border-right:0.7rem solid transparent;
    }
    .body::before{
      display: table;
      content:''
    }
     .body .body_text{
     margin:1.5rem 0;
     font-size: 1.5rem;
     color:#38BAF8;

    }
    .user,.upwd{
      margin-bottom:1rem;
      border-radius:0.3rem;
      
    }
    .login{
      margin-top:5rem;
      background: #38BAF8;
      color:#fff;
    
    }
    .bottom{
      margin-top:0.5rem;
      display:flex;
      justify-content:space-between;
      padding:0 0.2rem;
    }
    .forget,.bottom_reg{ 
      color:#000;
      font-size:0.8rem;
    }
    .code{
      position:absolute; 
       top:0;
      left:0;
      right: 0;
      bottom:0;
       margin:auto;
      padding:50% 12%; 
      background: rgba(241,243,244,0.7);
      z-index:10;
    }    
 
</style>
