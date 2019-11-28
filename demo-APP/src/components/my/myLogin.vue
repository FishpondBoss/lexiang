<template>
<div>
        <div class="top">
          <img src="../../../public/imgs/icon/7.jpg" alt="">
          </div>
          <div class="content">
              <div class="up">
                  欢迎登录乐享
              </div>
              
              <van-field
                v-model="uname"
                required
                clearable
                label="用户名"
                right-icon="question-o"
                placeholder="请输入您的用户名"              
                @click-right-icon="$toast('用户名为您的手机号')"          
              />

              <van-field
                v-model="upwd"
                clearable
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                right-icon="question-o"
                @click-right-icon="$toast('密码长度在3-16位')"
              />
           
              <div class="center">
                  <span  @click="forupwd">忘记密码?</span>
                  <span  @click="myreg">立即注册</span>
              </div>
              <div class="bottom">
                    <button @click="login">登录</button>
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
import {mapState, mapMutations} from 'vuex';//yj
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
  watch:{
  },
    // sockets:{},/////////////////////////////yj T
      computed: {
          ...mapState([
            'userInfo'
          ])
      },
      methods:{
        ...mapMutations([
        'set_userInfo'
      ]),
       ///////////////////////////////////////////yj E
    onSuccess(){
            // this.$toast ("验证成功")
            this.success=false;
            var url="user/v1/login";
            console.log(2222);
            var obj={uname:this.uname,upwd:this.upwd};
            this.axios.get(url,{params:obj})
            .then(res=>{
               console.log(res.data);
              if(res.data.code==-3){
                this.$toast(res.data.msg);
                setTimeout(() => {
                  this.$router.push("/myReg");
                }, 1000);
              }else if(res.data.code==1){
                console.log(res.data)
                /////////////////////////////////////////////////yj T
                console.log(res.data.uid)
                this.set_userInfo({
                  userInfo:{
                    uid:res.data.row[0].uid,
                    uimg:res.data.row[0].uimg,
                    nickname:res.data.row[0].nickname
                    }
                })
                console.log("this.userInfo")
                console.log(this.userInfo)
                ////////////////////////////////////////////////// yj E
                  this.$toast(res.data.msg)
                  setTimeout(()=>{
                     console.log("login的触发 res.data.row[0].uid:"+res.data.row[0].uid)
                    socket.emit('login',res.data.row[0].uid);
                    this.$router.push("/showMain");
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
    .top img{
      width: 100%;
      height: 18rem;
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
         margin-top:2rem;
         border-radius: 2rem;
      }
      .van-field{
          border-bottom:0.05rem solid #aaa;
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
