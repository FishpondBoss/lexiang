<template>
  <div>
    <img :src="axios.defaults.baseURL+item" @click="maginf(axios.defaults.baseURL+item)">
  </div>
</template>
<script>
export default {
   methods: {
    magnif(img,position){
           ImagePreview({
             images:img,
             startPosition:position
           });
     }
    }
}
</script>