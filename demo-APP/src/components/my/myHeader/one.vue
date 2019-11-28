<template>
  <div class="one">
      <div class="top">
           <div class="photo">
             
               <img :src="axios.defaults.baseURL+uimg" alt="" class="img">
             
           </div>
              <div class="details_intr">
                 <span v-if="nicheng">{{nickname}}</span>
                 <span v-else>空空如也</span>
                <div>
                    <p :class="gender" class="sex"></p>
                </div>
              </div>
              <div class="dgf">
                <div class="qianming">
                  <span>{{selfdom}}</span>
                  <img class="intr" @click="intr" src="../../../../public/imgs/icon/revise.png">
                </div>
                  <div class="huozan">
                    <span>2.0w获赞</span>
                    <span>8关注</span>
                    <span>16粉丝</span>
                  </div>  
                </div>
              </div>      
  </div>
</template>
<script>
export default {
    data(){
      return{
        active:"tab1",
        nickname:'',
        selfdom:'5555',
        uimg:'',
        sex:'',
        gender:{
          gender1:false,
          gender2:false
        },
        nicheng:false
      }
    },
    methods:{
      intr(){
        this.$router.push('/Myintr')
      },
      handle(event){
        this.active=event.target.dataset.id;
      },
      updata(){
        var url="user/v1/content";
        this.axios.get(url).then(res=>{
         var data= res.data.msg[0];
        //  console.log(data)
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
      }

    },
    created(){
        this.updata()
    }
}
</script>
<style scoped>
    .top{
        text-align: center;
    }
    .photo{
      margin-top:2.5rem;
    }
    .photo .img{
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        margin:auto;
    }
      .qianming{
        margin:0.5rem 0;
      }
    .qianming span{
      font-size: 1rem;
    }
   .intr{
      /* margin-left:13rem; */
      background:#fff;
      width: 0.8rem;
      height: 0.8rem;
      /* border-radius: 1.5rem; */
      /* padding:0.18rem 1rem; */
      /* line-height: 3.4rem; */
      /* font-size: 0.9rem; */
      /* color:#fff; */
     }
      
     .details_intr{
        /* float:left; */
       color:#fff;
       margin-top:0.6rem;
       margin-left:1rem;

     }
     .details_intr::before{
         display: table;
         content: "";
     }
     .details_intr div{
       display: inline-block;
       /* margin:-0.3rem 0 0 0rem;
       background: #fff;
       width:0.8rem;
       height:0.8rem;
       border-radius: 50%; */

     }
     /* .details_intr div img{
       float:left;
      width:0.8rem;
       height:0.8rem;
       margin-top:0rem;
     } */
    
     .gender1{
       /* float:left; */
       display: inline-block;
      width:1rem;
      /* margin-left:-1rem; */
       height:1rem;
       /* margin-top:0rem; */
       background:url('../../../../public/imgs/man.png') no-repeat;
       background-size:1rem 1rem;
     }
     .gender2{
       display: inline-block;
       /* float:left; */
      width:1rem;
       height:1rem;
       /* margin-top:0rem; */
       background:url('../../../../public/imgs/woman.png') no-repeat;
       background-size: 1rem 1rem;
     }
     .dgf{
       display: inline-block;
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
     .huozan{
       margin-top:0.9rem;
     } 
      .huozan span:nth-child(2){
            margin:0 1rem;
     } 
     </style>
