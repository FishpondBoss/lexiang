<template>
    <div>
        <div v-if="nologin">
            <div class="please">请先登录</div>
        </div>
        <Inform v-for="(item,i) in list"  :key="i"
        :uimg="axios.defaults.baseURL+item.uimg"
        :nickname=item.nickname
        :details=item.cdetails
        :desc=item.pdesc
        >
        </Inform>
    </div>
</template>
<script>
// 引入子组件
import Inform from "./inform.vue"
export default{
    // 注册子组件
    components:{
        "Inform":Inform
    },
    data(){
        return {
            list:[],
            nologin:false
        }
    },
    methods: {
        getcomment(){
            var url='msgbox/getcomment';
            this.axios.get(url).then(res=>{
                console.log("getcomment")
                console.log(res);
                if(res.data.code==1){
                    this.list=res.data.data;
                    console.log(this.list)
                }                
                if(res.data.code==-1){
                this.nologin=true;
                }
                if(res.data.code==400){
                // this.nologin=true;
                console.log("6666")
                }
        })
        .catch(err=>{
            console.log(err);
        })
        }
    },
    created() {
        this.getcomment();
    },
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
