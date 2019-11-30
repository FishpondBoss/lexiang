<template>
  <div class="txt-list">
     <div class="txt-left">
        <img :src="uimg">
        <div class="txt-page">
          <h3 class="txt-h3">{{nickname}}</h3>
          <p class="txt-p">{{selfdom}}</p>
        </div>
      </div>
      <div class="txt-right">
        <div @click="tofan" id="txt-gz" class="wguanzhu"  v-show="fanshow==1"> ＋关注</div>
        <div @click="nofan" id="txt-gz" class="guanzhu"  v-show="fanshow==0">已关注</div>
      </div>
  </div>
</template>

<script>
export default {
  props:{
    uimg:{default:""},
    nickname:{default:""},
    selfdom:{default:""},
    fansid:{default:""},
  },
  data() {
    return {
      fanshow:0,
    }
  },
  methods:{
    tofan(){
        var obj={fansid:this.fansid};
        var url="msgbox/tofan";
        this.axios.get(url,{params:obj}).then(res=>{
            console.log(res.data)
            if(res.data.code==1){
              console.log("关注成功")
              this.fanshow=0;
            }else{
              $toast("关注失败")
            }
        })
        .catch(err=>{
            console.log(err);
            
        })
      },
      nofan(){
        this.$messagebox.confirm("是否要取消关注")
        .then(res=>{
          var obj={fansid:this.fansid};
          var url="msgbox/nofan";
          this.axios.get(url,{params:obj}).then(res=>{
              // console.log(res)
              if(res.data.code==1){  
                this.fanshow=1;
              }else{
                $toast("取消关注")
             }
           })
          .catch(err=>{
              console.log(err);
          })
        })
        .catch(err=>{console.log("取消")})  
        },
  }
}
</script>


<style scoped>

.guanzhu{/*已关注的样式*/
  font-size: 0.9rem;
  background-color: #fff;/*#bdbebd*/
  height: 1.7rem;
  padding: 0rem 0.6rem;
  border-radius: 1.8rem;
  text-align: center;
  line-height: 1.7rem;
  color: #bdbdbd;
  font-weight: 700;
  border: 1px solid #bdbebd;
  cursor: pointer;
}
.wguanzhu{
  font-size: 12px;
  background-color: #38ff;
  height: 30px;
  padding: 0rem 0.6rem;
  border-radius: 1.8rem;
  text-align: center;
  line-height: 1.8rem;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

 /* 底部列表 */
  .txt-list{
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    
  }
  .txt-list img{
    width: 4.2rem;
    height: 4rem;
    border-radius: 0.5rem;
  }
  .txt-left{
    width: 80%;
    display: flex;
    /* background-color: #0ff; */
  }
  .txt-h3{
    font-size: 1rem;
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
  .txt-p{
    width: 62%;
    color:#3e3e3e;
    font-size: 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 0.5rem;
    margin-left: 1rem;
  } 
  .txt-right>#txt-gz{
    margin-top: 0.7rem;
  }

</style>