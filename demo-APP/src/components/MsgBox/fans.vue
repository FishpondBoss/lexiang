<template>
    <div class="container" @click="goo">
        <div class="avadar"><img :src="uimg" alt=""></div>
        <div class="center">
            <p class="whoDo">{{nickname}}</p>
            <p class="sign">{{selfdom}}</p>
            <p class="time">4小时前</p>
        </div>
        <div class="cont">
           <span v-show="like_both==0" class="iconfont icon-guanzhu" @click="tofan"></span>
           <span v-show="like_both==1" class="iconfont icon-huxiangguanzhu" @click="nofan"></span>
        </div>

    </div>
</template>
<script> 
 export default{
     props:{
         nickname:{default:""},
         selfdom:{default:""},
         uimg:{default:""},
         like_both:{default:0},
         fansid:{default:""},
         i:{default:""}
     },
     data(){
         return{
         }
     },
     methods:{
         goo(){
            this.$router.push({path:"/Myyourself",query:{uid:this.fansid}})
        },
        tofan(){
           console.log(this.fansid)
           var obj={fansid:this.fansid};
           var url="msgbox/tofan";
           this.axios.get(url,{params:obj}).then(res=>{
                // console.log(res);
                if(res.data.code==1){
                    this.$emit("tobefan",this.i)
                }else{
                    $toast("操作失败，请稍后再试")
                }
            })
            .catch(err=>{
                console.log(err);
            })
        },
        nofan(){
            var obj={fansid:this.fansid};
            var url="msgbox/nofan";
            this.axios.get(url,{params:obj}).then(res=>{
                // console.log(res);
                if(res.data.code==1){
                    this.$emit("nobefan",this.i)
                }else{
                    $toast("操作失败，请稍后再试")
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
 }   
</script>
<style scoped>
    .container{
        display: flex;
        justify-content: space-between
    }
    .container>div{
        padding: 0.3rem;
    }
    .avadar{
        width: 3rem;
    }
    .avadar>img{
        width: 100%;
        border-radius: 50%;
        margin-top: 0.2rem;
    }
    .cont{
         width: 5rem;
         display: flex;
         align-items: center;
         justify-content: flex-start;
         padding: 0;
         
    }
    .cont span{
        margin: 0 auto;
    }
    .center p{
        font-size: 0.8rem;
        margin: 0;
        text-align: left
    }
    .center{
        border-bottom: 1px solid #ccc;
        width: 60%;
    }
    .center .sign{
        display: block;
        height: 1.5rem ;
        /* background:pink; */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top:  0.2rem;
    }
    .center .time{     
        font-size: 0.6rem;
        /* -webkit-transform:scale(0.8); */
    }
    .iconfont{
        font-size: 1.2rem
    }

</style>
