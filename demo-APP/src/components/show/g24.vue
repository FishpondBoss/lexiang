<template>
<div class="aa">
   <div class="bigimg" v-for="(item,index) in imgsSrc" :key="index">
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
  },
 
}
</script>
<style scoped>
.aa{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.aa div.bigimg{
  width: 49%;  
  margin: 3px 0;
}
.aa div.bigimg img{
  width: 100%; 
}
</style>

