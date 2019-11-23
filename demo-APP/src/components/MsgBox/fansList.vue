<template>
    <div>
        <div v-if="nologin">
            <div class="please">请先登录</div>
        </div>
        <div v-else>
        <Fans v-for="(item,i) in list" 
        :key="i"
        :i="i"
        :like_both=item.like_both
        :nickname=item.nickname
        :selfdom=item.selfdom
        :uimg="axios.defaults.baseURL+item.uimg"
        :fansid=item.uid
        @tobefan="tobefan"
        @nobefan="nobefan"
        ></Fans>  
        </div>     
    </div>
</template>
<script>
// 引入子组件
import Fans from "./fans.vue"
export default{
    // 注册子组件
    components:{
        "Fans":Fans
    },
    data(){
        return {
            list:[],
            nologin:false
        }
    },
    methods:{
        tobefan(i){
             this.list[i].like_both=1;
        },
         nobefan(i){
             this.list[i].like_both=0;
        }
    },
    created(){
        var url="msgbox/myfans";
        // var obj={uid:1};
        this.axios.get(url).then(res=>{
            console.log(res);
            if(res.data.code==1){
                 this.list=res.data.rows;
            }   
            if(res.data.code==-1){
                this.nologin=true;
            }
        })
        .catch(err=>{
            console.log(err);
        })

    }
}
</script>
<style scoped>
.please{
    text-align: center;
    color: #ccc;
    font-size: 2rem;
    font-family: "simhei";
    margin-top: 50%;

}
</style>
