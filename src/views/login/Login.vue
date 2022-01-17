<template>
    <div class="wrapper">
        <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__imgs">
        <div class="wrapper__input">
            <input type="text" class="wrapper__input__text" placeholder="请输入用户名" v-model="data.username">
        </div>
        <Toast v-if='toasData.toastshow' :message='toasData.toastmess'></Toast>
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__text" placeholder="请输入密码" v-model="data.password">
        </div>
        <div class="wrapper__button"  @click="handlogin">登录</div>
        <div class="wrapper__bottom">
                <div class="wrapper__bottom__register" @click="handRegister">立即注册</div>
                <span class="wrapper__bottom__shu">|</span>
                <div class="wrapper__bottom__reset">忘记密码</div>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'
export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const data = reactive({
      username: '',
      password: ''
    })
    const { toasData, toastShow } = useToastEffect()
    const router = useRouter()
    const handlogin = async () => {
      if (data.username === '' || data.password === '') {
        toastShow('用户名或密码不能为空')
      } else {
        try {
          const res = await post('/api/user/login', {
            username: data.username,
            password: data.password
          })
          if (res?.data?.errno === 0) {
            localStorage.isLogin = true
            router.push({ name: 'Home' })
          } else {
            toastShow('登录失败')
          }
        } catch (e) {
          toastShow('请求失败')
        }
      }
    }
    const handRegister = () => {
      router.push({ name: 'Register' })
    }
    return {
      handlogin,
      handRegister,
      data,
      toasData
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper{
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__imgs{
        display: block;
        margin: 0 auto .24rem auto;;
        width: 0.66rem;
        height: 0.66rem;
    }
    &__input{
        width: 2.95rem;
        height: 0.48rem;
        margin:.16rem auto .32rem auto;
        border-radius: .06rem;
        border: 1px solid rgba(0,0,0,0.10);
        background: #F9F9F9;
    &__text{
        width: 100%;
        height: 0.48rem;
        line-height: .24rem;
        font-size: 0.16rem;
        padding-left: .16rem;
        background: none;
        border:none;
        outline: none;
        &::placeholder{
            color: rgba(0,0,0,0.50);
        }
    }
    }
    &__button{
        width: 2.95rem;
        height: 0.48rem;
        background-color:  #0091FF;
        line-height: .48rem;
        text-align: center;
        color: #fff;
        font-size: .16rem;
        border-radius: .04rem;
        margin: 0 auto;
    }
    &__bottom{
        display: flex;
        justify-content:center;
        color: rgba(0,0,0,0.50);
        font-size: .14rem;
        margin:.16rem auto 0 auto;
        &__shu{
            padding: 0 .12rem;
        }
    }
}
</style>
