<template>
  <div>
    <!-- 底部导航栏图片切换 -->
    <!-- 第一个变量focused选中true -->
    <!-- 显示选中图片/否则显示默认图片 -->
    <img :src="focused ? selectImage :normalImage" class="imgstyle">
  </div>
</template>


<script>
export default {
  props:{
    focused:false, //默认状态
    selectImage:{default:""},
    normalImage:{default:""}
  }
}
</script>

<style scoped>
  .imgstyle{
    width: 30px;
    height:30px;
  }
</style>
