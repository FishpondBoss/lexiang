<template>
    <div class="set">
        <div class="fanhui" @click="goout">&lt;</div>
        <div class="top">设置</div>
        <div class="container">
                <div class="container_item" v-for="(item,i) of list" :key="i" @click="sorry">{{item}}</div>
        </div>
        <div class="end" @click="exit">
                退出当前账号
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[
                "账号与安全",
                "推送设置",
                "青少年模式",
                "内测版本优先体验",
                "检查更新",
                "乐享社区公约",
                "隐私权声明",
                "关于我们",
                "原创入驻"
            ]
        }
    },
    methods:{
        sorry(){
            this.$toast("功能尚在开发中哟~(*╹▽╹*)")
        },
        goout(){
            this.$router.go(-1)
        },
        exit(){
          var url="user/v1/quit";
          this.axios.get(url).then(
              res=>{
              this.$toast(res.data.msg)
              var t=setTimeout(()=>{
                  this.$router.push("/Mylogin");
              },1000)
              }
          ).catch(err=>{
              console.log(err)
          })
           
         }
    },
}
</script>
<style scoped>
    .set{
        position:fixed;
        width: 100%;
        height: 100%;   
        background: #f8f8f8;
    }
    .fanhui{
        color:#aaa;
        transform:scale(1,2);
        font-weight:700;
        margin:1rem 0 0 0.8rem;
    }
    .top{
        /* float:left; */
        text-align: center;
        color:#000;
        margin-top:-1.3rem;
       font-size:1.2rem;
    }
    .container{
        /* border-top:0.5rem solid #ccc; */
        margin-top:2rem;
    }
    .container_item{
        height: 3rem;
        line-height: 3rem;
        font-size: 1rem;
        margin:0.2rem 0 0.2rem 0.5rem;
        border-top:0.01rem solid #ccc;
      
    }
    .container div:nth-child(1),.container div:nth-child(3),.container div:nth-child(4),.container div:nth-child(5),.container div:nth-child(7){
         border-top:0.5rem solid #ccc;
    }
    
    .end{
        border-top:0.5rem solid #ccc;
        border-bottom:0.5rem solid #ccc;
        height: 3rem;
        line-height: 3rem;
        font-size: 1rem;
        text-align: center;
        color:#1ff;
        margin:1rem 0 0.2rem 0.3rem;
       
    }
</style>