<template>
    <div class="set">
        <div class="fanhui" @click="goout">&lt;</div>
        <div class="top">设置</div>
        <div class="container">
                <div class="container_item" v-for="(item,i) of list" :key="i" @click="sorry">{{item}}</div>
        </div>
        <div class="end">
              <button  @click="exit"> 退出当前账号</button> 
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
       font-size:1.3rem;

    }
    .container{
        /* border-top:0.5rem solid #ccc; */
        margin-top:1.5rem;
    }
    .container_item{
        height: 3rem;
        line-height: 3rem;
        font-size: 1rem;
        margin:0.2rem 0 0.2rem 0.5rem;
        border-top:0.01rem solid #ccc;
      
    }
    .container div:nth-child(1),.container div:nth-child(3),.container div:nth-child(5),.container div:nth-child(7){
         border-top:0.3rem solid #ccc;
    }
    .container div:last-child{
        border-bottom:0.3rem solid #ccc;
    }
    .end{
        text-align: center;
        margin-top:2.5rem;
    }
    .end button{
        outline:0;
        border:0;
        background: #37BAF7;
        color:#fff;
        padding:0.8rem 3rem;
        font-size: 1.2rem;
        border-radius: 5rem;
        
       
    }
</style>