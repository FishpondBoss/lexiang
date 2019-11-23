<template>
    <div class="container" @click="toChat">
        <div class="avadar"><img src="../../../public/imgs/MsgBox/02.jpg" alt=""></div>
        <div class="center">
            <p class="whoDo">若是自由</p>
            <p class="corresCont">你好，很高兴认识你。</p>
            <!-- <p class="time">4小时前</p> -->
        </div>
        <div class="cont">
           <p class="time">15：42</p>
        </div>

    </div>
</template>
<script>
     export default{
        data(){
            return {}
        },
        methods:{
            toChat(){
                this.$router.push("/Chat")
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
        border-radius: 50%
    }
    .cont{
         width: 3rem;
         display: flex;
         align-items: center;
         justify-content: flex-start;
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
    .center .corresCont{
        display: block;
        /* height: 1.3rem ; */
        /* background:pink; */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top:  0.5rem;
    }
    .center .whoDo{
        margin-top:  0.2rem;
    }
    .cont .time{     
        font-size: 0.7rem;
        /* -webkit-transform:scale(0.8); */
    }


</style>

