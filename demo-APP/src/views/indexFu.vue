<template>
  <div>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="message">
        <!-- <my-comment></my-comment> -->
        <focus-main></focus-main>
      </mt-tab-container-item>   
      <mt-tab-container-item id="contact">
        <!-- <show-main></show-main> -->
    <show-main></show-main>
      </mt-tab-container-item> 
      <mt-tab-container-item id="xx">
       <msg-box></msg-box>
      </mt-tab-container-item> 
      <mt-tab-container-item id="me">
      <my></my>
      </mt-tab-container-item> 
    </mt-tab-container>
    <mt-tabbar fixed v-model="active">
      <mt-tab-item id="message" @click.native ="chamgeState(0)">
        <tabbaricon 
          :focused="current[0].select"
          :selectImage="require('../../public/imgs/g_2.png')"
          :normalImage="require('../../public/imgs/g_1.png')"
        ></tabbaricon>
        推荐
      </mt-tab-item>
      <mt-tab-item id="contact" @click.native ="chamgeState(1)">
        <tabbaricon 
          :focused="current[1].select"
          :selectImage="require('../../public/imgs/d_2.png')"
          :normalImage="require('../../public/imgs/d_1.png')"
        ></tabbaricon>
        动态
      </mt-tab-item>
      <mt-tab-item id="find" @click.native="t">
        <tabbaricon 
          :focused="current[2].select"
          :selectImage="require('../../public/imgs/add.png')"
          :normalImage="require('../../public/imgs/add.png')"
        ></tabbaricon>
      </mt-tab-item>
      <mt-tab-item id="xx" @click.native ="chamgeState(3)">
        <tabbaricon 
          :focused="current[3].select"
          :selectImage="require('../../public/imgs/x_2.png')"
          :normalImage="require('../../public/imgs/x_1.png')"
        ></tabbaricon>
        消息
      </mt-tab-item>
      <mt-tab-item id="me" @click.native ="chamgeState(4)">
        <tabbaricon 
          :focused="current[4].select"
          :selectImage="require('../../public/imgs/m_2.png')"
          :normalImage="require('../../public/imgs/m_1.png')"
        ></tabbaricon>
        我的
      </mt-tab-item>
    </mt-tabbar>
    <tabbaricon></tabbaricon>
  </div>
</template>

<script>
    
    import TabBarIcon from '../components/index/TabBarIcon'
    import msgBox from './MsgBox.vue'
    import my from './my.vue'
    import showMain from '../components/show/showMain.vue'
    // import showMain from '../components/video/showMain.vue'
    // import myComment from '../components/video/mycomment.vue'
    // import aa from '../components/index/aa.vue'
    // import bb from '../components/index/bb.vue'
    import focusMain from './focusMain.vue'
  export default {
    components:{  
      focusMain,
      showMain,
      msgBox,
      my,
      "tabbaricon":TabBarIcon
    },
    data(){
      return{
        active:"message",
        current:[
          {select:true},  //对应第一个按钮
          {select:false}, //对应第二个按钮
          {select:true}, //对应第三个按钮
          {select:false}, //对应第三个按钮
          {select:false} //对应第四个按钮
        ]
      }
    },
    methods: {
      t(){
        console.log(1111)
        var url="img/isLogin";
        this.axios.get(url)
        .then(res=>{
          console.log(res);
          if(res.data.code==-1){
            console.log(222)
            this.$toast("请登录!")
          this.$router.push("myLogin")
          }else{
          this.$router.push("ss")
          }
        })
        .catch(err=>{
          console.log(err)
        })
      },
     chamgeState(index){
        // 1.创建循环遍历每一个按钮的状态
        for(var i=0;i<this.current.length;i++){
          if(i===index){// 2.如果当前下标与参数下标相同
            this.current[i].select=true;// 3.修改当前元素的状态为true
          }else{
            this.current[i].select=false;
          }
        }
      }
    },
  }
</script>

<style scoped>
  .mint-tabbar > .mint-tab-item{
    color:#999;
  }
  .mint-tabbar > .mint-tab-item.is-selected{
    background-color: transparent;
    color:#38BAF8;
  }
</style>
