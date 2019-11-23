<template>
  <div class="pinlun">
    <div class="left">
      <img :src="pimg" @click="geren">
    </div>
    <div class="right">
      <p class="name">{{pname}}</p>
      <p class="desc">{{pdesc}}</p>
      <p class="time">{{ptime}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    pimg:{default:""},
    pname:{default:""},
    pdesc:{default:""},
    ptime:{default:""}
  },
  methods: {
      geren(){
      this.$router.push({path:'/Myyourself',query:{uid:this.item.uid}});
    },
  }
}
</script>
<style scoped>
.pinlun{
  width: 100%;
  display:flex;
  padding: 10px 10px  ;
  border: 2px solid red;
}
.left{
  width: 15%;
  height: 60px;
}
.left img{
  width: 45px;
  height: 45px;
  border-radius:50% 
}
.right{
  padding:1px 19px 14px 0px;
  width: 78%;
  border-bottom: 1px solid rgb(207, 204, 204);
}
.name{
  font-size:14px;
  font-weight: 600;
  color: rgb(255, 187, 79) ;
  height: 30px;
}
.desc{
  font-size:16px;
  color: rgb(71, 71, 71);
  padding: 7px 0;
  height: 30px;
}
.time{
  font-size:12px;
  height: 10px;
  color:rgb(105, 105, 105)
}
</style>
