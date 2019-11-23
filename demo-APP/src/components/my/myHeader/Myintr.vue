<template>
<div>
      <div class="top"> 
            <div class="fanhui" @click="goout">&lt;</div>
              <div class="text">个人信息</div>
              <div class="photo">
                <div ><img :src="axios.defaults.baseURL+uimg" alt=""></div>
                <div><img src="../../../../public/imgs/camera.png" alt=""></div>
              </div>
      </div>
      <div class="body">
            <mt-field label="昵称" type="text" v-model="nickname" placeholder="请输入你的昵称"></mt-field>
            <mt-field label="个人简介" type="textarea" placeholder="向大家展示一下自己呗" v-model="selfdom" rows="4"></mt-field>
            <div class="sex">
               <div class="sex1">性别</div>
            <mt-radio  :options="list" v-model="sexval"></mt-radio>
            </div>
            <div class="container">
                <div class="birth">
                        <div @click="openPicker">出生日期</div>
                        <div>{{birthday}}</div>
                </div>
                <div class="datePicker">
                  <mt-datetime-picker
                        type="date"
                        ref="picker"
                        year-format="{value} 年"
                        month-format="{value} 月"
                        date-format="{value} 日"
                        @confirm="handleConfirm"
                        :startDate="startDate"
                    >
                </mt-datetime-picker>
              </div>
           </div>
            <mt-button size="large"     @click="intr" class="m-button">修改</mt-button>
      </div>
  </div>
</template>
<script>
export default {
  created(){
    this.update();
  },

  data(){
    return{
      list:[
          {label:"男",value:"1"},
          {label:"女",value:"0"}
      ],
      
      birthday:"",  //出生日期
      startDate: new Date('1968-01-01'),
     nickname:'',
     sexval:'',
    selfdom:'',
    uimg:''
    }
  },methods:{
            openPicker () {
            this.$refs.picker.open()
        },
        handleConfirm (data) {
         var resDate = data.getFullYear() + ' 年' + data.getMonth()  + '月' + data.getDate()+' 日';
            this.birthday =resDate;   //获取的时间为时间戳，getdata是自己写的一个转换时间的方法
        },
         goout(){
            this.$router.go(-1)
        },
        intr(){
         
           if(this.nickname==""){
             this.$toast("昵称不能为空");
             return;
          }else if(this.sex==''){
             this.$toast("性别未选");
             return;
           }else if(!/^\b|\b$/.test(this.birthday)){
             this.$toast("生日未选")
           return;
           }else{
            var url="/user/v1/intr";
            var arr=this.birthday.match(/\d+/ig);
            var year=arr[0];
            var month=arr[1];
            var date=arr[2];
            var obj={nickname:this.nickname,selfdom:this.selfdom,sex:this.sexval,birthday:year+"-"+month+"-"+date};
            this.axios.put(url,this.qs.stringify(obj))
            .then(res=>{
                var data=res.data;
                // console.log(res.data);
                if(data.code=="-1"){
                  this.$toast(data.msg)
                }else if(data.code=="200"){
                  this.$toast(data.msg)
                }else{
                  this.$toast(data.msg)
                }
            })
            .catch(err=>{})
           }
        },
        update(){
          var url="/user/v1/uploading";
          this.axios.get(url).then(res=>{
            if(res.data.code==-1){
              this.$toast(res.data.msg)
              return;
            }else if(res.data.code==400){
              this.$toast(res.data.msg)
            }else{
              var data=res.data.msg[0];
              this.nickname=data.nickname;
              this.sexval=data.sex+"";
              this.uimg=data.uimg;
              this.selfdom=data.selfdom;
             var arr=data.birthday.match(/\d+/ig);
             var year=arr[0];
             var month=arr[1];
             var date=arr[2];
             this.birthday=year+"年"+month+"月"+date+"日";
            }
          }).catch(err=>{
            console.log(err);
          })
        }
  },

}
</script>
<style scoped>
     .fanhui{
        color:#aaa;
        transform:scale(1,2);
        font-weight:700;
       position:absolute;
       top:1rem;
       left:0.8rem;

    }
    .top .text{
      text-align: center;
      margin-top:1.5rem;
      font-size:1.2rem;
    }
    .top .photo{
      margin:2rem auto;
      width: 5rem;
    }
    .top .photo div:nth-child(1) img{
      width:5rem;
      height:5rem;
      border-radius: 50%;
      
     
    }
    .top .photo div:nth-child(2){
      top:8.5rem;
      left:13.5rem;
     position:absolute;
      border-radius: 50%;
      background: #fff;
      width: 1.5rem;
      height: 1.5rem;
    }
    .top .photo div:nth-child(2) img{
      margin:0.2rem 0 0 0.1rem;
    }
    .body{
      border-top:0.6rem solid #ccc;
      padding:0 1rem;
    }
    .mint-field .mint-cell-title{
      width:5rem;
    }
   
    .sex .sex1{
      border-top:0.01rem solid #D9D9D9;
      margin-left:0.5rem;
      padding:0.8rem 0 0.4rem 0;
    }
    .container{
      padding:0 0.5rem;
    }
    .birth{
      border-spacing: border-box;
      display: flex;
      justify-content:space-between;
      height: 3rem;
     align-items: center;
     border-top:0.01px solid #D9D9D9;
     border-bottom:0.01px solid #D9D9D9;
    }
    .m-button{
      background: #38BAF8;
      color:#fff;
    }
</style>

