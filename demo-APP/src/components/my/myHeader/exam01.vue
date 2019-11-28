<template>
    <div>
        
 <mt-navbar v-model="selected" @click="dian" class="navbar">
  <mt-tab-item id="1" class="item"> <span>帖子</span></mt-tab-item>
  <mt-tab-item id="2" class="item"><span>评论</span></mt-tab-item>
</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="1">
        <div class="top">
         <div>全部帖子{{list1.length}}</div>
    </div>
      <div class="content" v-for="(item,i) of list1" :key="i">
          <div class="body">
            <div class="title">
                <img :src="axios.defaults.baseURL+uimg" alt="" class="img">
                    <div class="bt">
                        <span>{{nickname}}</span><br>
                        <span>{{item.upTime}}</span>
                    </div>
            </div>
          <div class="hot" v-show="item.pfavour>=3"> <img src="../../../../public/imgs/icon/hot.png" alt=""> </div>
          </div>
          <div class="mytext">{{item.pdesc}}</div>
          <div class="other">
              <img :src="axios.defaults.baseURL+item.psrc" alt="" class="img1">
              <div class="bg_1" v-show="item.psrc==''? false : true">
                  <img src="../../../../public/imgs/tianjia.png" alt="" >
              </div>
          </div>
          <div class="bottom1">          
                  <img src="../../../../public/imgs/icon/2.jpg" alt="">          
                  <img src="../../../../public/imgs/icon/3.jpg" alt="">         
                  <img src="../../../../public/imgs/icon/1.jpg" alt="">         
                  <!-- <span>{{item.pfavour}}</span> -->
         </div>   
      </div>
  </mt-tab-container-item>
  <mt-tab-container-item id="2" class="d2">
 <div class="top">
         <div>全部评论{{list.length}}</div>
          <div>最新↑↓</div>
    </div>
      <div class="content" v-for="(item,i) of list" :key="i">
                    <div class="body">
                            <div class="title">
                                        <img :src="axios.defaults.baseURL+uimg" alt=""  class="img">
                                        <div class="bt">
                                            <span>{{nickname}}</span><br>
                                            <span>{{item.upTime}}</span>
                                        </div>
                            </div>
                            <div class="dianzan" v-show="item.pfavour>=3">
                           <img src="../../../../public/imgs/icon/hot.png" alt="">                        
                            </div>
                    </div>
                    <div class="mytext">{{item.cdetails}}</div>
                    <div class="text">
                         {{item.nickname}}:{{item.pdesc}}
                    </div>
      </div>
      <div class="bottom">不要往下看啦~，想看也没有了哦</div>
  </mt-tab-container-item>

</mt-tab-container> 
    </div>
</template>
<script>
export default {
    data(){
        return{
            selected:'1',
            list:[],
            uimg:'',
            nickname:'',
            list1:[],
        }
    },
          created(){
               this.update()
               this.reborn()
          },
    methods:{
        dian(e){
            this.selected=e.target.id;
        },
        reborn(){
            var url="user/v1/myself";
            this.axios.get(url).then(res=>{
                console.log("hahahah")
                // console.log(res)
                if(res.data.code==200){
                var data=res.data.msg;
                this.list1=data;
                console.log(1)
                console.log(this.list1)
                  for( var item of this.list1){
                        var arr=item.upTime.match(/\d+/g);
                            // console.log(arr);
                            item.upTime=arr[0]+"/"+arr[1]+"/"+arr[2];
                                var str=item.psrc
                            if(str.indexOf("|")!==-1){
                                item.psrc=str.split("|")[0];
                                console.log(str.split("|"))
                                console.log(item.psrc)

                            }
                }
                console.log(this.list1)
                for(var i=this.list1.length-1;i>=0;i--){
                    this.list1[this.list1.length-1-i]=this.list1[i];
                }
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        update(){
            var url="user/v1/comment";
            this.axios.get(url).then(res=>{
                // console.log(res.data)
                this.list=res.data.msg;
                    // console.log(this.list)
                    
                for( var item of this.list){
                        var arr=item.upTime.match(/\d+/g);
                            // console.log(arr);
                            item.upTime=arr[0]+"/"+arr[1]+"/"+arr[2];
                }
                 for(var i=this.list.length-1;i>=0;i--){
                    this.list[this.list.length-1-i]=this.list[i];
                }
                // console.log(this.list)
            }).catch(err=>{
                console.log(err)
            })
            var url1="user/v1/content";
            this.axios.get(url1).then(res=>{
                // console.log(res);
                    this.uimg=res.data.msg[0].uimg;
                    this.nickname=res.data.msg[0].nickname;
            }).catch(err=>{
                    console.log(err);
            })
        }

    }

}
</script>
<style scoped>
      
       .navbar .item span{
           font-size: 1rem;
       }

       .hot{
           margin-top:0.4rem;
           margin-right:0.5rem;
       }
       .hot img{
           width: 1.5rem;
           height: 1.5rem;
       }
       .content{
           width: 100%;
           background: #fff;
           border-bottom:0.5rem solid #eee;
       }
      .top{
           display: flex;
           justify-content: space-between;
           width: 100%;
           height: 2.2rem;
           background: #eee;
           margin-top:0.5rem;
       }
      .top div:nth-child(1),.top div:nth-child(2){
           line-height: 2.2rem;
            font-size:1rem;
           padding:0 0.5rem 0 0.5rem;
           /* color:#888;  */
       }
        .content{
          padding:0 0.5rem;
        }
       .content .body .img{
           width: 2.8rem;
           height: 2.8rem;
           border-radius:50%;
       }
        .content .title{
            display:flex;
            justify-content: start;
        }
        .content .title .bt{
                margin-left:0.4rem;
              
        }
         .content .title .bt span{
             font-size: 0.8rem;
          
         }
         .content .body{
             
             display:flex;
             justify-content: space-between;
             padding:0.5rem 0.5rem 0 0.5rem;
         }
         .dianzan img{
             width: 1.5rem;
             margin-top:0.2rem;
         }
      
         .mytext{
             margin:1rem 0 0.4rem 0.5rem;
             color:#555;
             font-size: 1rem;
             font-family: "Microsoft YaHei UI"
         }
         .text{
             background: #eee;
             width: 80%;
             line-height: 2rem;
             font-size: 0.8rem;
             margin:1rem 0.8rem;
             padding-left:0.9rem;
             border-radius: 1.5rem;
             white-space: nowrap;
             height: 2rem;
             text-overflow: ellipsis;
             overflow: hidden;
             margin-bottom:1rem;
         }
         .bottom{
             width: 100%;
             height: 3rem;
             line-height: 3rem;
             border-radius: 0.3rem;
             font-size:1rem;
             background: #fff;
             text-align: center;
         }
         .other{
             position: relative;
         }
         .other .img1{
             width:40%;
             /* margin-left:1rem; */
             height: 10rem;
         }
         .other .huati{
             width: 9rem;
             background: #aff;
             padding:0.2rem 0rem;
             border-radius: 0.7rem;    
             display: flex;
             justify-content: center;
         }
          .other .huati img{
             
              width: 1.3rem;
              height: 1.3rem;
              margin-top:0.1rem;
          }
          .other .huati img:nth-child(3){
              height: 1.1rem;
          }
         .other .huati span{
             margin:0 0.3rem;
             font-size: 1rem;
                
         }
         .other .bg_1{
             width:40%;
             height: 10rem;
             text-align: center;
            position: absolute;
            top:0;

             background:rgba(200,200,200,0.8);
         }

        
         
          .other .bg_1 img{
             width:4rem;
             height: 4rem;
             margin-top:3rem;
             /* margin-left:1rem */
         }
         .bottom1{
             margin:0.7rem 0;
             display: flex;
         }
        .bottom1 img{
            width: 1rem;
            height: 1rem;
        }
        .bottom1 img:nth-child(1){
            margin-left:0.2rem;
        }
        .bottom1 img:nth-child(2){
            margin:0 1rem;
        }
        /* .bottom1 .left,.bottom1 .center,.bottom1 .right,.bottom1{
            display: flex;
            justify-content: space-around;

        } */
        /* .bottom1 .right,.bottom1 .center,.bottom1 .left{
            margin:0 0.8rem;
        } */
</style>