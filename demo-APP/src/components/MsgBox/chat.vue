<template>
  <div class="chat div-wrap">
    <!-- <myheader :title="chatWith">
      <i class="iconfont icon-fanhui1 left" slot="left" @click="goback"></i>
    </myheader> -->
    <mt-header fixed :title="nickname">
      <router-link to="/showMain" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <!-- ref="scroll"  -->
    <div :toBottom="true" v-if="dataList" class="scroll-wrap" :data="dataList">
      <ul>
        <li v-for="(item,index) in dataList" :key="index"
            :class="{'chat-right':item.sendTo == chatuid,
              'chat-left':item.sendTo !== chatuid,
              'chat-box':true}">
          <!-- <div class="add-time"
               v-if="index == 0||dataList[index-1]&&new Date(item.sendTime)-new Date(dataList[index-1].sendTime)>1000*180">
            <span>{{new Date(item.sendTime)|chatTime}}</span>
          </div> -->
          <div :class="{'toright':item.sendTo == chatuid,'flex':true}">
              <span v-if="item.sendTo != chatuid" class="avater">
                <img :src="axios.defaults.baseURL+uimg"/>
              </span>
            <span class="content">{{item.sendContent}}</span>
            <span v-if="item.sendTo== chatuid" class="avater">
                <img :src="axios.defaults.baseURL+myUimg"/>
              </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="chat-footer">
      <textarea class="chat-textarea weui-textarea" v-model="content" rows="1"></textarea>
      <div class="send" @click="sendMessage">{{sendInfo}}</div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  // import myheader from 'components/myheader/my-header';
  // import scroll from '../../components/scroll/scroll';
  // import unlogin from '../../components/unlogin/unlogin'
  import {Toast} from 'mint-ui';

  export default {
     props:{
        // nickname:{default:""},
       
     },
    created() {
      
      this.getUserInfo();
      this.getDataList();
      this.updateBySocket();
      // this.updateBySocket();
      
    },
    // mounted(){
    //   // this.$refs.scroll._toBottom(1);
    //   this.clearUnread();
    // },
    data() {
      return {
        // chatWithId: this.$route.query.chatwithid, //toUser的id
        // chatWith: this.$route.query.chatwith,//toUser的nickname
        chatuid:this.$route.query.uid,
        content: '', //发送内容
        sendInfo: "发送", 
        dataList:[], //聊天记录
        toUsersktid:'', //发送对象的socketid
        nickname:'', //发送对象的网名
        uimg:'', //发送对象的头像
        myUimg:'' //我的头像
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    components: {
      // myheader,
      // scroll,
      // unlogin
    },
    methods: {

      updateBySocket() {
        socket.on('receiveMsg', (data) => {
          if (this.chatuid == data.fromId) {
            var chatwith=this.chatuid;
            var upContent={sendTo:0,sendContent:data.content};
            this.dataList.push(upContent);
            console.log("里面的datalist")
            console.log(this.dataList)
            window.sessionStorage.setItem(chatwith,JSON.stringify(this.dataList));
          }
        })
      },
      //获取聊天对象信息
      getUserInfo() {
        //自己头像
        var ss=window.sessionStorage.getItem("myInfo")
        var xx=JSON.parse(ss)
        // this.myUimg=this.userInfo.userInfo.uimg;
        this.myUimg=xx.uimg;
        console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
        // console.log(this.userInfo);
        var obj={uid:this.chatuid}
        var url="chat/userInfo";
        this.axios.get(url,{params:obj})
        .then(res=>{
          // console.log()
          console.log("------------------------")
          console.log(res)
          //对方网名
          this.nickname=res.data.data[0].nickname;
          //对方头像
          this.uimg=res.data.data[0].uimg;
          console.log("this.myUimg");
          console.log(this.myUimg)
          if(res.data.code==1){
            console.log("getUserInfo: ")
            console.log(res)
             this.toUsersktid=res.data.sktid.sktid;
             console.log(this.toUsersktid)
          }else{
              // $toast("对方不在线，请稍后再试")
              console.log("对方不在线，请稍后再试")
          }
        })
        .catch(err=>{
          console.log(err)
        })
      },
      // clearUnread(){
      //   this.axios.post('/chat/clearchatunread', {
      //     from: this.userInfo._id,
      //     to: this.tUserInfo._id
      //   })
      // },
      getDataList() {
        var chatwith=this.chatuid;
        var a=window.sessionStorage.getItem(chatwith);
        // //获取
        if(a){
          this.dataList=JSON.parse(a);    
        }else{
          this.dataList=[];
        }
        console.log("this.datalist")
        console.log(this.dataList)
      },
      updateList(){
        //  var chatwith=this.uid;
        //  this.list=sessionStorage.getItem(chatwith);
      },
      // goback() {
      //   this.$router.go(-1);
      //   this.clearUnread();
      // },
      sendMessage() {
        var ss=window.sessionStorage.getItem("myInfo")
        var xx=JSON.parse(ss)
        var chatwith=this.chatuid;
        // var myUid=this.userInfo.userInfo.uid;
        // var myNickname=this.userInfo.userInfo.nickname;
        var myUid=xx.uid;
        var myNickname=xx.nickname;
        if (!myUid){
          Toast("请先登录！");
          return;
        }
        if (this.content == '') {
          return;
        }
        // this.sendInfo = '发送中..';
        socket.emit('chat',{toId:this.toUsersktid,content:this.content,fromId:myUid,fromImg:this.myUimg,fromNickname:myNickname});
        var upContent={sendTo:chatwith,sendContent:this.content};
        this.dataList.push(upContent);
        window.sessionStorage.setItem(chatwith,JSON.stringify(this.dataList));

        var a=window.sessionStorage.getItem("chatList");
        if(!a){
         var chatList={}
        }else{
          var chatList=JSON.parse(a);
        }
        var data={fromId:chatwith,fromImg:this.uimg,fromNickname:this.nickname,content:this.content}
        chatList[chatwith]={data}
        // }
        window.sessionStorage.setItem("chatList",JSON.stringify(chatList));

        // console.log( window.sessionStorage.getItem(chatwith))
        this.content="";
        // this.sendInfo = '发送';    
      },
    }
  }
</script>

<style scoped>
  
  .chat{
    bottom: 68px;
    padding-top: 3rem;  
  }
  .scroll-wrap {
      background-color: white;
      padding: 5px;
  }
  .chat-box{
      width: 100%;
      margin-bottom: 10px;      
    }
  .add-time {
        margin: 0 auto;
        text-align: center;
        font-size: 14px;
        line-height: 1.5rem;
        height: 1.5rem;
       
  }
  .add-time span {
          background-color: rgba(172, 172, 177, 0.29);
          color: white;
          border-radius: 5px;
          padding: 2px 5px;
  }
  .flex {
        display: flex;
  }
  .avater {
        margin: 0 10px;
        width: 40px;
        height: 40px;
  }
  .avater img {
    width: 40px;
    border-radius:50%;
  }
  .content {
        max-width: 220px;
        background-color: greenyellow;
        line-height: 25px;
        padding: 7px 1rem;
        overflow-wrap: break-word;
        word-break: break-all;
        border-radius: 10px;
      }
  .chat-right .flex {
    align-items: center;
    justify-content: flex-end;
  }
    /* //  .chat-right .toright {
    //     span {
    //     }
    //   } */
  .chat-right .content {
    background-color: orange;
    color: white;
  }
  
  .chat-footer {
      background-color: #f8f8f8;
      position: fixed;
      bottom: 0;
      box-shadow: 0 0 5px #e0e0e0;
      width: 100%;
      height: 40px;
      padding: 8px 5px 5px;
      display: flex;
      justify-content: center; 
  }
  .chat-textarea {
        padding: 2px 5px;
        display: block;
        width: 70%;
        margin: 3px 0;
        border: gainsboro 1px solid;
        border-radius: 5px;
      }
  .send:active {
        background-color: #e8a205;
      }
  .send {
        text-align: center;
        width: 20%;
        line-height: 34px;
        background-color: orange;
        color: white;
        margin: 3px;
        border-radius: 5px;
      }
</style>
