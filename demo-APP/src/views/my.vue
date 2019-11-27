<template>
<div>
   <div v-if="login">
      <my-header></my-header>
      <my-body></my-body>
   </div>
   <div v-else>
     <my-ceshi></my-ceshi>
   </div>
   <tabbaricon></tabbaricon>
</div>
</template>
<script>
import myHeader from "../components/my/myHeader.vue"
import myBody from "../components/my/myBody.vue"
import myCeshi from "../components/my/myCeshi.vue"
import TabBarIcon from '../components/index/TabBarIcon'
export default {
  created(){
    this.getlogin()
  },
   data(){
      return{
        login:true
      }
   },
   components:{
      myHeader,myBody,myCeshi,"tabbaricon":TabBarIcon
   },
   methods:{
     getlogin(){
       var url="/user/v1/getl";
      this.axios.get(url).then(res=>{
            if(res.data.code==1){
                this.login=false;
            }
      }).catch(err=>{
        console.log(err);
      })
     }
   }
}
</script>
<style scoped>

</style>
