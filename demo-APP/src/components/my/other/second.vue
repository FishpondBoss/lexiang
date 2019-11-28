<template>
  <div class="one">
      <div class="top">
           <div class="photo">
             
               <img :src="axios.defaults.baseURL+uimg" alt="" class="img">
              <span class="sixin" @click="sixin">私信</span>
              <span class="intr" @click="tofan" v-show="like==0">关注</span>
              <span class="intr" @click="nofan"  v-show="like==1">取消关注</span>
           </div>
              <div class="details_intr">
                 <p v-if="nicheng">{{nickname}}</p>
                 <p v-else>空空如也</p>
                <div>
                    <p :class="gender"></p>
                </div>
              </div>
              <div class="dgf">
              <p>{{selfdom}}</p>
                  <span>2.0w获赞</span>
                  <span>8关注</span>
                  <span>16粉丝</span>
                </div>
              </div>      
  </div>
</template>
<script>
export default {
  props:{uid:{default:""}},
    data(){
      return{
        like:0,
        active:"tab1",
        nickname:'',
        selfdom:'5555',
        uimg:'',
        sex:'',
        gender:{
          gender1:false,
          gender2:false
        },
        nicheng:false,
     
      }
    },
    methods:{
      tofan(){
           console.log(this.uid)
           var obj={fansid:this.uid};
           var url="msgbox/tofan";
           this.axios.get(url,{params:obj}).then(res=>{
                // console.log(res);
                if(res.data.code==1){
                   this.like=1;
                }else{
                    $toast("操作失败，请稍后再试")
                }
            })
            .catch(err=>{
                console.log(err);
            })
        },
        nofan(){
            var obj={fansid:this.uid};
            var url="msgbox/nofan";
            this.axios.get(url,{params:obj}).then(res=>{
                // console.log(res);
                if(res.data.code==1){
                     this.like=0;
                }else{
                    $toast("操作失败，请稍后再试")
                }
            })
            .catch(err=>{
                console.log(err);
            })
        },
       sixin(){
          // this.$router.push("Chat")
          this.$router.push(
          {path:'Chat',
          query:{uid:this.uid}
          });
      },
      // guanzh(){
      //     var url="user/v1/like";
      //     var obj={like_uid:this.uid};
      //     this.axios.put(url,this.qs.stringify(obj))
      //     .then(res=>{
      //         console.log(res);
      //     })
      //     .catch(err=>{
      //       console.log(err);
      //     })
      // },
      handle(event){
        this.active=event.target.dataset.id;
      },
      updata(){
        var url="user/v1/other";
        var obj={uid:this.uid};
        console.log(this.uid+"我获得的uid")
        console.log("这里的uid:"+this.uid)
        this.axios.get(url,{params:obj}).then(res=>{
         var data= res.data.msg[0];
         console.log(1111)
          console.log(data)
        //  console.log(res.data.msg)
          this.nickname=data.nickname;
          this.nicheng=true;
          this.selfdom=data.selfdom;
          this.uimg=data.uimg;
          this.sex=data.sex;
          if(this.sex==0){
            this.gender.gender2=true;
          }else{
            this.gender.gender1=true;
          }
          // console.log(this.sex)
        }).catch(err=>{
          throw err;
        })
      },
//       update(){
//         console.log("我来了")
//         var url="user/v1/likeother";
//         this.axios.get(url)
//         .then(res=>{
//           console.log("我进来了")
//           console.log(res);
//         }).catch(err=>{
//           console.log(err);
//         })
//  console.log("我走了")
//       }

    },
    created(){
        this.updata()
        // this.update()
    }
}
</script>
<style scoped>
.photo{
  margin-top:2.5rem;
}
    .photo .img{
        float:left;
        width: 3.4rem;
        height: 3.4rem;
        border-radius: 50%;
        margin-left:1rem;
    }
    .photo .intr,.photo .sixin{
      margin-right:0rem;
      background: rgba(200,200,200,0.6);
      border-radius: 1.5rem;
      padding:0.18rem 0.9rem;
      line-height: 3.4rem;
      font-size: 0.9rem;
      color:#fff;
     }
     .details_intr{
       display: flex;
       margin-top:1rem;
       color:#fff;
         margin-left:1rem;
     }
     .details_intr div{
       margin:0.3rem 0 0 0.3rem;
       background: #fff;
       width:0.8rem;
       height:0.8rem;
       border-radius: 50%;

     }
     /* .details_intr div img{
       float:left;
      width:0.8rem;
       height:0.8rem;
       margin-top:0rem;
     } */
     .gender1{
       float:left;
      width:1rem;
       height:1rem;
       /* margin-top:-0.1rem; */
       margin:-0.07rem 0 0 -1.4px;
       background:url('../../../../public/imgs/man.png') no-repeat;
       background-size: 100% 100%;
     }
     .gender2{
        float:left;
      width:1rem;
       height:1rem;
       /* margin-top:-0.1rem; */
       margin:-0.07rem 0 0 -1.4px;
       background:url('../../../../public/imgs/woman.png') no-repeat;
       background-size: 100% 100%;
     }
     .dgf{
       color:#fff;
       font-size: 0.8rem;
        margin-left:1rem;
      margin-top:0.5rem;
     }
     .dgf p{
       margin-bottom:0.4rem;
     }
     .dgf span{
       font-size: 0.6rem;
     }  
     .sixin{
       color:#fff;
       background: rgba(200,200,200,0.6);
       margin-left:8rem;
       margin-right:2rem;
       padding:0.2rem 0.5rem;
       border-radius: 0.8rem;
       font-size:0.8rem;
     }
     </style>
