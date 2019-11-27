<template>
<div class="aa">
   <div class="small" v-for="(item,index) in imgsSrc" :key="index">
     <img :src="axios.defaults.baseURL+item" @click="magnif(magnifBigImg,index)">
   </div>
</div>
</template>
<script>
import { ImagePreview } from 'vant';
export default {
  props:{
    jici:{default:""},
    imgsSrc:{default:[]}
  },
  data() {
    return {
       magnifBigImg:[]
    }
  },
  methods: {
    magnifImg(){
      for(var i=0;i<this.imgsSrc.length;i++){
          this.magnifBigImg[i]="http://127.0.0.1:5050/"+this.imgsSrc[i]
      }
    },
    magnif(img,position){
           ImagePreview({
             images:img,
             startPosition:position
           });
    } 
  },
    created() {
        this.magnifImg()
      }
}
</script>
<style scoped>
.aa{
  display: flex;
 justify-content:start;
  flex-wrap: wrap;
  padding: 6px;
}
.aa div{
  /* 三张 */
 width: 32%;   
}
.aa div.small:nth-child(2){
    margin:0 7px; 
}
.aa div.small:nth-child(5){
    margin:0 7px; 
}
.aa div.small:nth-child(8){
    margin:0 7px; 
}
.aa div.small img{
  width: 100%;
}
</style>

