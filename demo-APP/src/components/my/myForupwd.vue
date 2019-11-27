<template>
  <div>
    <div class="top">
        <img src="../../../public/imgs/icon/7.jpg" alt="">
        <div class="cha" @click="tui">
        <img src="../../../public/imgs/cha.png" alt=""  >
        </div>
        <span class="text">找回密码</span>
      </div>  
    <div class="content">
       <div class="up">
            <span>账号验证</span>
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
                v-focus
              />

              <van-field
                v-model="pupwd"
                type="text"
                label="验证码"
                placeholder="请输入您的验证码"
                required
                v-focus
              />
               <div class="code" @click="refreshCode"><s-identify :identifyCode="identifyCode"></s-identify> </div>
              <van-field
                v-model="upwd"
                type="password"
                label="新密码"
                placeholder="请输入您的新密码"
                required
                right-icon="question-o"
                 @click-right-icon="$toast('密码长度为3-16位')"
                 v-focus
              />
              <van-field
                v-model="upwd1"
                type="password"
                label="确认密码"
                placeholder="请再次输入您的密码"
                required
                right-icon="question-o"
                 @click-right-icon="$toast('密码长度为3-16位')"
                 v-focus
              />
          </van-cell-group>
      </div>
      <div class="bottom">
          <button :disabled="disabled" @click="set">确定</button>
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
      watch:{
       uname(){
       this.gogo()
       },
        pupwd(){
            this.gogo()  
        },
       upwd(){
        this.gogo()
       },
       upwd1(){
     this.gogo()
       }


   },
   methods:{
     gogo(){
           
           var uname=this.uname;
           var upwd=this.upwd;
           var identifyCode=this.identifyCode;
           var upwd1=this.upwd1;
           if((/^1[3-9]\d{9}$/.test(uname))&&(this.pupwd==identifyCode)&&(/^\d{3,16}$/.test(upwd))&&(/^\d{3,16}$/.test(upwd1))){
                    this.disabled=false;
                    
           }    
       },
       set(){
           console.log(1111)
            var url="user/v1/fupwd";
            var obj={uname:this.uname,upwd:this.upwd}
            this.axios.put(url,this.qs.stringify(obj))
            .then(res=>{
                if(res.data.code==200){
                    this.$toast(res.data.msg)
                    var t=setTimeout(()=>{
                        this.$router.go(-1)
                        clearTimeout(t)
                    },1000)
                }else{
                    this.$toast(res.$toast(res.data.msg))
                }
            }).catch(err=>{
                console.log(err)
            });
       },
       tui(){
          var t= setTimeout(()=>{
               this.$router.go(-1)
                clearTimeout(t)
           },1000)
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
    position: relative;
  }
   .top img:nth-child(1){
      width: 100%;
      height: 30%;
    }
    .top .cha img{
        width:1.3rem;
        height: 1.3rem;
        position: absolute;
        top:1.5rem;
        z-index: 1;
        left:1rem;
    }
    .top .text{
        position:absolute;
       left:50%;
       top:1.5rem;
       color:#fff;
       font-size: 1.2rem;
       margin-left:-2.4rem;
        z-index: 1;
    }
    .content{
      padding:0 2rem;
    }
    .content .up{
      font-size: 2rem;
      font-family: "simhei";
    }
  .van-field{
    border-bottom:0.05rem solid #aaa;
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
    .content .bottom{
      text-align: center;
    }
      .content .bottom button{
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
