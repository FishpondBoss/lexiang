<template>
  <div class="top">
    <div class="content">
        <div class="up">
            欢迎登录乐享
        </div>
          <van-cell-group>
        <van-field
          v-model="uname"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入您的用户名"
          error-message="用户名输入格式有误"
          @click-right-icon="$toast('用户名为您的手机号')"
        />

        <van-field
          v-model="upwd"
          clearable
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          error-message="密码输入格式有误"
          right-icon="question-o"
          @click-right-icon="$toast('密码长度在3-12位')"
        />
      </van-cell-group>
        <div class="center">
            <span>忘记密码?</span>
            <span>立即注册</span>
        </div>
        <div class="bottom">
              <button>登录</button>
        </div>
   </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      uname:'',
      upwd:''
    }
  }
}
</script>
<style scoped>
    
</style>
