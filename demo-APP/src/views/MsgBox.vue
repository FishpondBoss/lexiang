
<template>
  <div class="page-navbar">
    <div class="page-title" ><span>提醒</span></div>
    <!-- <table></table> -->
    <!-- navbar -->
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1"><span class="iconfont icon-xiaoxi"></span></mt-tab-item>
      <mt-tab-item id="2"><span class="iconfont icon-tongzhi"></span></mt-tab-item>
      <mt-tab-item id="3"><span class="iconfont icon-fensi"></span></mt-tab-item>
    </mt-navbar>
	<!-- tabcontainer -->
    <mt-tab-container v-model="selected">
      <table></table>
      <mt-tab-container-item id="1">
        <!-- <mt-cell v-for="n in 20" :title="'私信 ' + n" :key="n"/>     -->
        <CorresList></CorresList>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <!-- <mt-cell v-for="n in 10" :title="'通知 ' + n" :key="n"/> -->
            <InformList></InformList>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <!-- <mt-cell v-for="n in 10" :title="'新粉丝 ' + n" :key="n"/> -->
        <FansList></FansList>
      </mt-tab-container-item>
    </mt-tab-container>
    <tabbaricon></tabbaricon>
  </div>
</template>
 
<script>
import InformList from "../components/MsgBox/informList.vue"
import FansList from "../components/MsgBox/fansList.vue"
import CorresList from "../components/MsgBox/corresList.vue"
import TabBarIcon from '../components/index/TabBarIcon'
export default {
  name: 'page-navbar',
   // 注册子组件
    components:{
        "InformList":InformList,
        "FansList":FansList,
        "CorresList":CorresList,
        "tabbaricon":TabBarIcon
    },
  data() {
    return {
      selected: '1'
    };
  }
};

</script>
<style scoped>
body{
  margin: 0 !important;
}
.page-title{
    position: fixed;
    z-index: 10;
    display: block;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    /* background: rgb(248, 248, 248); */
    background: #fff;
    top: 0;
    left: 0;
    text-align: center;
    box-shadow: 0 0 3px 3px rgb(224, 215, 215);
}
.page-navbar{
  margin-bottom:3.5rem;
}
.page-navbar::before{
    content: "";
    display: table;
    /* clear: both; */
}

.page-part{
    margin-top: 4rem;
} 
.mint-navbar .mint-tab-item.is-selected{
  border-bottom:0; 
  /* background-color: rgb(224, 215, 215); */
}   
.page-title>span{
  /* border-bottom: 3px solid #ccc;
  padding-bottom: 4px;
  border-radius :10%;;  */
  font-size: 1.4rem
} 
</style>
