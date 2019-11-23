<template>
    <div class="container" @click="goo">
        <div class="avadar"><img :src="uimg" alt=""></div>
        <div class="center">
            <p class="whoDo">@ {{nickname}} 评论:</p>
            <p class="comment">{{details}}</p>
            <p class="time">4小时前</p>
        </div>
        <div class="cont">
            <div>
                 {{desc}}
            </div>
           <!-- <img src="../../../public/imgs/MsgBox/03.jpg" alt=""> -->
          
        </div>
 
    </div>
</template>
<script> 
export default{ 
    data(){
        return{

        }
    },
    props:{
         nickname:{default:""},
         uimg:{default:""},
         details:{default:""},
         desc:{default:""}
     },
      methods:{
        goo(){
            this.$router.push("/Myyourself")
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
        text-align: center;
        /* height: 4rem; */
        /* padding-top: 2rem; */
    }
    .cont>div{
         width: 5rem;
         font-size: 0.7rem;
         overflow: hidden;
         text-overflow: ellipsis;
          white-space: nowrap;
         text-align: center;
         height: 2rem;
         line-height: 2rem;
         background: #eee;
         margin-top: 1rem;
         /* padding: 0.5rem ; */
         padding-left: 0.3rem;
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
    .center .comment{
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

</style>
