<template>
  <div class="container">
    <mt-header fixed title="可爱">
      <router-link to="/IndexFu" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div>
      <ul>
        <li
          class="clearfix"
          v-for="(talk,index) in talks"
          :key="index"
          v-bind:class="{'even':othername!=talk.send_from_id,'odd':othername==talk.send_from_id}"
        >
          <!-- <span v-show="showTime(index)" :id="index">{{getLocalTime(talk.message_time)}}</span> -->
          <img v-bind:src="getUserimg" alt v-if="othername!=talk.send_from_id">
          <img v-bind:src="meUserimg" alt v-else>
          <b></b>
          <div>
            <p>{{talk.content}}</p>
          </div>
        </li>
      </ul>
    </div>
    <form action onkeydown="if(event.keyCode==13)return false;">
      <mt-field type="text" v-model="content" @keyup.native="send($event)"></mt-field>
    </form>
    <!-- <input type="text">
    <button>发送</button>-->
  </div>
</template>
<script>
// import messagejson from "../json/messagelist.json"
export default {
  data() {
    return {
        talks:[
            {
                messageid:"306",
                send_from_id:"jessica",
                send_to_id:"15989339909",
                message_time:"1491898640",
                subject:"",
                content:"33"
            },
            {   
                messageid:"307",
                send_from_id:"15989339909",
                send_to_id:"jessica",
                message_time:"1492408484",
                subject:"",
                content:"heilo"
            }
        ],
        list:[],
        othername:{default:""},
    }
  },
  methods: {
    showTime(){},
    created() {
        //调用加载商品列表的函数
        this.getread();           
    },
    getread(){
        var url="getChatRecord";
        this.obj={}
        this.axios.get(url,{params:obj})
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    //发送消息
    send(ev) {
      if (ev.keyCode == 13) {
        var sendtoid = this.userid;
        // var sendtoid = "15989339909";
        // console.log(sendtoid)
        var sendfromid = "";
        var subject = "";
        var replyid = 0;
        if (this.content != "") {
          this.$http.post(this._getUrl() + "User/send",
              {
                sendfromid: sendfromid,
                sendtoid: sendtoid,
                subject: subject,
                content: this.content,
                replyid: replyid
              },
              { emulateJSON: true }
            )
            .then(response => {
              response = response.body;
              if (response.error_code == 200) {
                Toast({
                  message: "发送成功"
                });
                this.getread(); //重新获取数据

                this.content = "";
              } else {
                Toast({
                  message: response.error_msg
                });
              }
            });
        } else {
          Toast({
            message: "不能为空"
          });
        }
      }
    },
    // loadTop() {
    //          // var userid=this.$route.params.userid;
    //          let page = (Math.ceil(this.talks.length/this.pagesize))+ 1;
    //         // console.log(page)
    //               this.$http.get(this._getUrl()+"User/readAll/userid/" + this.userid +"/pagesize/"+this.pagesize+"/page/" + page).then((response) => {
    //                     let say_code =response.body.error_code;
    //                     let sayLists = response.body.list;
    //                     if(say_code=='200'){
    //                       for (let j = sayLists.length-1; j >-1; j--) {

    //                          // console.log(sayLists[j])
    //                          this.talks.unshift(sayLists[j]);
    //                          this.contentlogin=true;
    //                        }
    //                     }else{
    //                       this.allLoaded = true;
    //                       this.$refs.loadmore.onTopLoaded();
    //                       this.contentlogin=false;
    //                     }
    //               });
    // },
    // bottomshow(){
    //             let count=0;
    //             let interval=setInterval(() =>{
    //               if(count>200){
    //                 clearInterval(interval);
    //               }
    //               count++;
    //               if(document.body.scrollTop != document.body.scrollHeight){
    //                 document.body.scrollTop = document.body.scrollHeight;
    //             // console.log(document.body.scrollTop)
    //               }
    //               if(document.body.scrollTop == document.body.scrollHeight){
    //                  clearInterval(interval);
    //               }
    //             },0);
    // }
  }
}
</script>
<style scoped>
/* div {
  /* margin-top: 400px;
} */ 
/*even 偶  odd 奇*/
 ul li.odd img{
     width:45px;
     height:45px;
     border-radius:50%;
     float:left;
     background: url(../../../public/imgs/MsgBox/02.jpg) no-repeat center center;
     background-size:45px 45px;
}
 ul li.even img{
     width:45px;
     height:45px;
     border-radius: 50%;
     float: right;
     background: url(../../../public/imgs/MsgBox/02.jpg) no-repeat center center;
     background-size: 45px 45px;
}
 ul li.odd .in_talk p{
     background: #fff;
     float:left;
     margin-left: 10px;
     max-width:60%;
     font-size: 14px;
     padding:10px;
     border-radius: 6px;
}
 ul li.odd b{
     width:8px;
     height:14px;
     display: inline-block;
     background: url(../../../public/imgs/MsgBox/02.jpg) no-repeat;
     background-size: 8px 14px;
     position: absolute;
     left:58px;
     top:8px;
}
 ul li.even .in_talk p{
     background: #f6fff6;
     float:right;
     margin-right: 10px;
     max-width:60%;
     border-radius: 6px;
     font-size: 14px;
     padding:10px;
}
 ul li.even b{
     width:8px;
     height:14px;
     display: inline-block;
     background: url(../../../public/imgs/MsgBox/02.jpg) no-repeat;
     background-size: 8px 14px;
     position: absolute;
     right:58px;
     top:8px;
}
</style>
