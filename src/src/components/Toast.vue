<template>
  <div class="toast" >{{message}}</div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'Toast',
  props: ['message']
}
export const useToastEffect = () => {
  const toasData = reactive({
    toastshow: false,
    toastmess: ''
  })
  const toastShow = (mess) => {
    toasData.toastshow = true
    toasData.toastmess = mess
    setTimeout(() => {
      toasData.toastshow = false
      toasData.toastmess = ''
    }, 2000)
  }
  return { toasData, toastShow }
}
</script>

<style scoped lang='scss'>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: .1rem;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0, .35);
    border-radius: .04rem;
    color: #fff;
    text-align: center;
    font-size: .18rem;
}
</style>
