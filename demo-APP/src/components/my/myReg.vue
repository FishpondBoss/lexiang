<template>
  <div class="user_login">
        <h1>爱分享&nbsp;&nbsp;&nbsp;&nbsp;爱生活</h1>
     <div class="userLogin">
        <h2 class="user">用户注册</h2>
        <mt-field label="手机号" type="text" placeholder="请输入您的11位手机号" v-model="uname"></mt-field>
        <mt-field placeholder="图文验证码" v-model="pupwd" type="text"></mt-field>
        <div class="code" @click="refreshCode"><s-identify :identifyCode="identifyCode"></s-identify> </div>
        
        <mt-field label="密码" type="password" placeholder="密码长度在3~16位" v-model="upwd"></mt-field>
        <mt-field label="密码" type="password" placeholder="请再次输入您的密码" v-model="upwd1"></mt-field>
        <mt-button size="large" class="reg" @click="reg"> 注册</mt-button>
       </div>
  </div>
</template>
<script>
import SIdentify from '../identify.vue'
export default {
  name: "codetest",
   components: {SIdentify},
    data(){
      return{
        identifyCodes: "1234567890",
      identifyCode: "",
        uname:'',
        pupwd:'',
        upwd:'',
        upwd1:'',
        list:[
          {label:"男",value:'1'},
          {label:"女",value:'0'}
        ],
        val:''
      }
    },
    methods:{
      mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      reg(){
        if(!/^1[3-9]\d{9}$/.test(this.uname)){
          this.$messagebox("消息","手机号格式不正确")
          return;
        }else if(this.pupwd!=this.identifyCode){
                  this.$messagebox("消息","验证码错误请重新输入")
        }else if(!/^\w{3,16}/.test(this.upwd)){
          this.$messagebox("消息","第一次输入密码格式不正确")
          return;
        }else if(!/^\w{3,16}/.test(this.upwd1)){
          this.$messagebox("消息","第二次输入密码格式不正确")
          return;
        }else if(this.upwd!==this.upwd1){
          this.$messagebox("消息","两次密码输入不一致")
          return;
        }else{  
        var url="user/v1/reg";
        var obj={uname:this.uname,upwd:this.upwd}
        console.log(this.qs.stringify(obj))
          this.axios.post(url,this.qs.stringify(obj)).then(res=>{
            console.log(res.data);
             if(res.data.code==-2){
             this.$toast(`${res.data.msg}`)
             setTimeout(() => {
               this.$router.push("/myLogin")
             }, 2000);
               return;
             }else{
             this.$toast("注册成功")
             setTimeout(()=>{
               this.$router.push('/myLogin')
             },2000)
            }
          }).catch(err=>{throw err})
        }
      },
      randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
  }
    

}
</script>
<style scoped>
  .user_login{
    position:fixed;
    width: 100%;
    height: 100%;
    background: #35B9F8; 
  }
  .user_login>h1{
    color:#fff;
    text-align: center;
    margin-top:10%;
  }
  .userLogin{
    padding:0 1rem;
    margin-top:20%;
    position:relative;
    height: 30rem;
    background: #fff;
    border-radius:0.3rem;
    
  }
  .userLogin::before{
    display: table;
    content:''
  }
  .user{
    text-align:center;
    margin-bottom:5rem;
    margin-top:2rem;
      color:#35B9F8;
  }
  .reg{
   background:#35B9F8;
   margin-top:5rem;
   color:#fff;
  }
  .code {
    position:absolute;
   top:12.1rem;
   right:1rem;
  width: 114px;
  height: 40px;
  border: 1px solid red;
}

</style>