<template>
  <div>
    <div class="top">
      <div class="cha" @click="tui">
        <img src="../../../public/imgs/cha.png" alt=""  >
        </div>
    </div>
    <div class="center">
        <div class="up">
           <span>
              用户注册
           </span>
        </div>
        <div class="body">
             <van-cell-group >
              <van-field
                v-model="uname"
                required
                clearable
                label="用户名"
                right-icon="question-o"
                placeholder="请输入用户名"
                @click-right-icon="$toast('用户名为您的11位手机号')"         
              />

              <van-field
                v-model="pupwd"
                type="text"
                label="验证码"
                placeholder="请输入您的验证码"
                required              
              />
               <div class="code" @click="refreshCode"><s-identify :identifyCode="identifyCode"></s-identify> </div>
              <van-field
                v-model="upwd"
                type="password"
                label="密码"
                placeholder="请输入您的密码"
                required
                right-icon="question-o"
                 @click-right-icon="$toast('密码长度为3-16位')"           
              />
              <van-field
                v-model="upwd1"
                type="password"
                label="确认密码"
                placeholder="请再次输入您的密码"
                required
                right-icon="question-o"
                 @click-right-icon="$toast('密码长度为3-16位')" 
              />
          </van-cell-group>
        </div>
        <div class="bottom">
            <button @click="reg">立即注册</button>
        </div>
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
        upwd:'',
        upwd1:'',
        pupwd:'',
        disabled:true
    }
  },
  methods:{
      tui(){
          var t= setTimeout(()=>{
               this.$router.go(-1)
                clearTimeout(t)
           },1000)
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
        mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
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
  .top{
    background:url('../../../public/imgs/icon/7.jpg') no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 18rem;
    position: relative;
  }  
  .top .cha img{
        width:1.3rem;
        height: 1.3rem;
        position: absolute;
        top:1.5rem;
        z-index: 1;
        left:1rem;
    }
  .center{
    margin-top:1rem;
    padding:0 2rem;
  }
   .center .up{
      font-size: 2rem;
      font-family: "simhei";
    }
  .body{
    position:relative;
  }
  .code{
        position:absolute;
        top:3rem;
        right:0rem;
        width: 114px;
        height: 41px;

    }
     .van-field{
    border-bottom:0.05rem solid #aaa;
  }
    .center .bottom{
      text-align: center;
    }
      .center .bottom button{
         outline:0;
         border: 0;
         font-size: 1.6rem;
         color:#fff;
         background: #38BAF8;
         padding:0.3rem 4rem;
         margin-top:2rem;
         border-radius: 2rem;
      }
</style>
