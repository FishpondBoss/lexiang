<template>
  <van-tabbar id="t" v-model="active" inactive-color="#777777" active-color="#000000" >
    <van-tabbar-item v-for="(item,index) in tabbars" :key="index" @click="tab(index,item.name)" :info="item.name=='MsgBox' ? info : '' ">
      <span>{{item.title}}</span>
      <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" />
    </van-tabbar-item>
  </van-tabbar>
</template>


<script>
export default {
  props:["info"],
  name: "tabbar",
  created() {
    console.log(this.$route.name)
    if (this.$route.name == "showMain") {
      this.active = 0;
    } else if (this.$route.name == "focusMain") {
      this.active = 1;
    } else if (this.$route.name == "MsgBox") {
      this.active = 3;
    } else if (this.$route.name == "my") {
      this.active = 4;
    }
  },
  data(){
    return{
      currIndex: 0,
      active: 0,
      tabbars: [
        {
          name:"showMain",
          title: "广场",
          normal:
            require("../../../public/imgs/trends.png"),
          active:
             require("../../../public/imgs/trends-active.png")
        },
        {
          name:"focusMain",
          title: "关注",
          normal:
            require("../../../public/imgs/recommend.png"),
          active:
            require("../../../public/imgs/recommend-active.png")
        },
        {
          name: "ss",
          title: "分享",
          normal:
            require("../../../public/imgs/add.png"),
          active:
            require("../../../public/imgs/add.png")
        },
        {
          name: "MsgBox",
          title: "消息",
          normal:
            require("../../../public/imgs/news.png"),
          active:
            require("../../../public/imgs/news-active.png")
        },
        {
          name: "my",
          title: "个人",
          normal:
            require("../../../public/imgs/my.png"),
          active:
            require("../../../public/imgs/my-active.png")
        }
      ]
    }
 },
  methods: {
    tab(index, val) {
      // if(this.currIndex==index){
      //   return;
      // }
      this.currIndex = index;
      this.$router.push(val);
    }
  }
}
</script>

<style scoped>
.active_tab img {
  width: 26px;
  height: 26px;
}

.van-tabbar-item--active {
  color: #e10f02;
}
</style>
