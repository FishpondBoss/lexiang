<template>
    <div>
        <Corres v-for="n in 20" :key="n"></Corres>
    </div>
</template>
<script>
// 引入子组件
import Corres from "./corres.vue"
export default{
    // 注册子组件
    components:{
        "Corres":Corres
    }
}
</script>