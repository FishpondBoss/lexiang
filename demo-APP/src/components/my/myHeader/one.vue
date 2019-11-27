<template>
  <div class="one">
      <div class="top">
           <div class="photo">
             
               <img :src="axios.defaults.baseURL+uimg" alt="" class="img">
             
              <!-- <span class="intr" @click="intr">编辑资料</span> -->
           </div>
              <div class="details_intr">
                 <span v-if="nicheng">{{nickname}}</span>
                 <span v-else>空空如也</span>
                    <p :class="gender" class="sex"></p>
                <div>
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
        width: 3.4rem;
        height: 3.4rem;
        border-radius: 50%;
        margin:auto;
    }
    .photo .intr{
      margin-left:13rem;
      background: rgba(200,200,200,0.6);
      border-radius: 1.5rem;
      padding:0.18rem 1rem;
      line-height: 3.4rem;
      font-size: 0.9rem;
      color:#fff;
     }
     .details_intr{
        /* float:left; */
       color:#fff;

     }
     .details_intr div{
       display: inline-block;
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
       /* float:left; */
       display: inline-block;
      width:0.8rem;
       height:0.8rem;
       /* margin-top:0rem; */
       background:url('../../../../public/imgs/man.png') no-repeat;
       background-size: 0.8rem 0.8rem;
     }
     .gender2{
       display: inline-block;
       /* float:left; */
      width:0.8rem;
       height:0.8rem;
       /* margin-top:0rem; */
       background:url('../../../../public/imgs/woman.png') no-repeat;
       background-size: 0.8rem 0.8rem;
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
     </style>
