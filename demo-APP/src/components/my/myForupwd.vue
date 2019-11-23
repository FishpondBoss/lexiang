<template>
    <div>
     <div class="top">
      <div @click="tui">&lt;</div> 
      <div @click="tui">关闭</div>    
      <div>找回密码</div>    
    </div>  
    <div class="container">
        <div class="text">账号验证</div>
        <mt-field label="手机号" placeholder="请输入您的手机号" v-model="uname" v-focus></mt-field>
        <mt-field  label="验证码" placeholder="请输入验证码" v-model="pupwd" v-focus></mt-field>
        <div class="code" @click="refreshCode"><s-identify :identifyCode="identifyCode" v-focus></s-identify> </div>
        <mt-field label="密码" placeholder="请输入您的新3-16位密码" v-model="upwd" v-focus></mt-field>
        <mt-field label="密码" placeholder="请再次输入的手机号" v-model="upwd1" v-focus></mt-field>
        <mt-button size="large" class="go" :disabled="disabled" @click="set">确认设置</mt-button>
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
           if((/^1[3-9]\d{9}$/.test(uname))&&(this.pupwd==identifyCode)&&(/^\d{3,9}$/.test(upwd))&&(/^\d{3,9}$/.test(upwd1))){
                    this.disabled=false;
                    
           }    
       },
       set(){
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
        padding:1rem 0 0 1rem;
        display: flex;
        color:#fff;
        height:2.5rem;
        background: #38BAF8;

    }
    .top div:nth-child(1){
        font-weight:700;
        transform: scale(1,2);
        margin-top:0.3rem;
    }
    .top div:not(:nth-child(1)){
        margin:0 0 0 0.3rem;
    }
    .top div:last-child{
          color:#fff;
         font-size: 1.2rem;
         margin-left:6rem;
         
    }
    .container{
        position: relative;
    }
    .container text{
        margin:3rem 0 1rem 0;
        padding: 0 0.5rem;
    }
    .code{
        position:absolute;
        top:4.5rem;
        right:0rem;
        width: 114px;
        height: 40px;
        border: 1px solid red;
    }
    .container .go{
        border-radius:0.3rem;
        color:#fff;
        background: #38BAF8;
    }
</style>