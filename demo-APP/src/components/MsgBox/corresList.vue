<template>
    <div>
        <div v-if="chatList" class="v1">
            <img src="../../../public\imgs\nomsg.png" alt="">
        </div>
        <Corres v-for="(item,i) in chatList" :key="i"
        :fromId=item.data.fromId
        :fromImg="axios.defaults.baseURL+item.data.fromImg"
        :fromNickName=item.data.fromNickname
        :sendContent=item.data.content
        ></Corres>
    </div>
</template>
<script>
// 引入子组件
import Corres from "./corres.vue"
export default{
    // 注册子组件
    components:{
        "Corres":Corres
    },
    data(){
        return{
            chatList:{}
        }
    },
    created(){
        var a=window.sessionStorage.getItem("chatList");
        // //获取
        if(a){
          this.chatList=JSON.parse(a);    
        }else{
          this.chatList={};
        }
        this.updateBySocket()
    },
    methods: {
        // socket.emit('chat',{toId:this.toUsersktid,content:this.content,fromId:myUid,fromImg:this.myUimg,fromNickname:myNickname});
      updateBySocket(){
        socket.on('receiveMsg', (data) => {
            console.log("聊天列表")
            // console.log(data)
            var chatWith=data.fromId;
            var a=window.sessionStorage.getItem("chatList");
            if(a){
                this.chatList=JSON.parse(a);
            }
            this.chatList[chatWith]={data}
            // this.dataList.push(UpchatList);
            window.sessionStorage.setItem("chatList",JSON.stringify(this.chatList));
            console.log(this.chatList)

            // var chatwith=this.chatuid;
            var upContent={sendTo:0,sendContent:data.content};
            var  dataList= window.sessionStorage.getItem(chatWith);
            if(!dataList){
                dataList=[]
            }else{
                dataList=JSON.parse(dataList);
            }
            dataList.push(upContent);
            console.log("外面的datalist")
            console.log(dataList)
            window.sessionStorage.setItem(chatWith,JSON.stringify(dataList));
        })
      },
    }
}
</script>
<style scoped>
.v1{
    width: 100%;
    text-align: center;
}
.v1 img{
    margin-top: 4rem;
    /* width: 100%; */
    max-width: 70%;
   
}
</style>
