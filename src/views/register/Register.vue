<template>
    <div class="wrapper">
        <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__imgs">
        <div class="wrapper__input">
            <input type="text" class="wrapper__input__text" placeholder="请输入用户名"
            v-model="data.username"
            >
        </div>
        <Toast v-if='toasData.toastshow' :message='toasData.toastmess'></Toast>
          <div class="wrapper__input">
            <input type="password" class="wrapper__input__text" placeholder="请输入密码"
            v-model="data.password">
        </div>
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__text" placeholder="确认密码"
            v-model="data.confirmPassword"
            @blur="blur">
        </div>
        <div class="wrapper__button" @click="handregister">注册</div>
        <div class="wrapper__bottom">
                <div class="wrapper__bottom__register" @click="handloginClick">已有账号去登陆</div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import Toast, { useToastEffect } from '../../components/Toast.vue'
import { post } from '../../utils/request'
export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const data = reactive({
      username: '',
      password: '',
      confirmPassword: ''
    })
    const { toasData, toastShow } = useToastEffect()
    const router = useRouter()
    const handregister = async () => {
      if (data.username === '' || data.password === '' || data.confirmPassword === '') {
        toastShow('注册失败,请输入账号或密码和确认密码是否填写')
      } else {
        try {
          const res = await post('/api/user/register', {
            username: data.username,
            password: data.password,
            confirmPassword: data.confirmPassword
          })
          if (res?.data?.errno === 0 && data.password === data.confirmPassword) {
            toastShow('注册成功,请登录')
          } else {
            toastShow('注册失败')
          }
        } catch (e) {
          toastShow('请求失败')
        }
      }
    }
    const handloginClick = () => {
      router.push({ name: 'Login' })
    }
    const blur = () => {
      if (data.confirmPassword === '') {
        return blur
      } else if (data.password === data.confirmPassword) {
        // toastShow('两次输入的密码一致')
      } else {
        toastShow('两次输入的密码不一致')
      }
    }
    return { handloginClick, handregister, toasData, data, blur }
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
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-top: .16rem;
        font-size: .14rem;
        color: rgba(0,0,0,0.50);;
    }
}
</style>
