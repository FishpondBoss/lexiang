<template>
<div>
      <slide-verify :l="42"
                :r="10"
                :w="310"
                :h="155"
                @success="onSuccess"
                @fail="onFail"
                @refresh="onRefresh"
                :slider-text="text"
                ></slide-verify>
    <div>{{msg}}</div>
</div>
</template>
<script>
export default {
   name: 'App',
    data(){
        return {
            msg: '',
            text: '向右滑',
            su:false
        }
    },
    methods: {
        onSuccess(){
            this.$toast ("验证成功")
             this.$emit("click",this.su)
        },
        onFail(){
            this.$toast("验证失败请重新输入")
        },
        onRefresh(){
            this.msg = ''
        }
    }
}

</script>