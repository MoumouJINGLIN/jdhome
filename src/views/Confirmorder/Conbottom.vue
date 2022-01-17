<template>
    <div class="ord">
            <div class="ord__text">实付金额</div>
            <span class="ord__price">&yen;{{prive}}</span>
            <div class="ord__btn"
            @click="cancelClick">提交订单</div>
    </div>
    <Toast v-if='toasData.toastshow' :message='toasData.toastmess'></Toast>
    <div
    class="mask"
    v-if="showMask"
    >
        <div class="mask__box">
            <div class="mask__box__title">确认要离开收银台？</div>
            <div class="mask__box__text">请尽快完成支付，否则将被取消</div>
            <div class="mask__box__btns">
                <div class="mask__box__btn mask__box__btn--cancel"
                @click="cancelClick">取消订单</div>
                <div
                class="mask__box__btn  mask__box__btn--confirm"
                @click="()=>confirmClick(false)"
                >确认支付</div>
            </div>
        </div>
    </div>
</template>

<script>
import { post } from '../../utils/request'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const priveEffect = () => {
  const route = useRoute()
  const store = useStore()
  const shopId = route.params.id
  const { cartList } = store.state
  const prive = computed(() => {
    const proudctLsit = cartList[shopId]?.proudtiList
    let count = 0
    if (proudctLsit) {
      for (const i in proudctLsit) {
        const proudct = proudctLsit[i]
        count += (proudct.count * proudct.price)
      }
    } else {
      return count
    } return count.toFixed(2)
  })
  return { prive }
}
const showMaskEffect = () => {
  const showMask = ref(false)
  const cancelClick = () => {
    showMask.value = !showMask.value
  }
  return { cancelClick, showMask }
}
const getList = () => {
  const { toasData, toastShow } = useToastEffect()
  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  const { cartList } = store.state
  const shopName = computed(() => {
    const shopName = cartList?.[shopId]?.shopName || ''
    return shopName
  })
  // 排除count为 0的逻辑
  const proudctLsit = computed(() => {
    const proudctLsit = cartList[shopId]?.proudtiList || {}
    const notEmptyProdutList = {}
    for (const i in proudctLsit) {
      // console.log(proudctLsit[i])
      const proudect = proudctLsit[i]
      if (proudect.count > 0) {
        notEmptyProdutList[i] = proudect
      }
    }
    return proudctLsit
  })
  const shopId = route.params.id
  const confirmClick = async (isCanceled) => {
    const proudcts = []
    for (const i in proudctLsit.value) {
      const proudct = proudctLsit.value[i]
      proudcts.push({ id: parseInt(proudct._id), num: parseInt(proudct.count) })
    }
    // console.log(proudcts)
    try {
      const res = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        proudcts
      })
      if (res?.data?.errno === 0) {
        store.commit('clearCartData', shopId)
        router.push({ name: 'OrderList' })
      }
    } catch {
      toastShow('支付失败')
    }
  }
  return { confirmClick, toasData, toastShow }
}
export default {
  name: 'Conbottom',
  components: { Toast },
  setup () {
    const { cancelClick, showMask } = showMaskEffect()
    const { prive } = priveEffect()
    const { confirmClick, toasData, toastShow } = getList()
    return { prive, cancelClick, showMask, confirmClick, toasData, toastShow }
  }
}
</script>

<style lang='scss' scopde>
    .ord{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: .49rem;
        display: flex;
        line-height: .49rem;
        background-color: #fff;
        &__text {
            text-align: center;
            margin-left: .24rem;
            font-size: .14rem;
            color: #333333;
        }
        &__price{
            font-size: .16rem;
            font-weight: 700;
            margin-left: .05rem;
        }
        &__btn{
            width: 0.98rem;
            height: 0.49rem;
            background-color: #4FB0F9;
            color: #fff;
            text-align: center;
            position: absolute;
            right: 0;
        }
    }
    .mask{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.50);
        &__box{
            text-align: center;
            width: 3rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 1.57rem;
            background-color: #fff;
            border-radius: .04rem;
            &__title{
                font-size: .18rem;
                margin: .24rem .6rem .08rem .6rem;
            }
            &__text{
                font-size: .14rem;
                color: #666;
                margin: .08rem .5rem .24rem .5rem;
            }
            &__btns{
                display: flex;
                font-size: .14rem;
                text-align: center;
                line-height: .32rem;
            }
            &__btn {
                width: 0.8rem;
                height: 0.32rem;
                &--cancel{
                    border: .01rem solid #4FB0F9;
                    border-radius: .16rem;
                    margin: 0 .24rem 0 .6rem;
                    color: #0091FF;
                }
                &--confirm{
                    border: .01rem solid #4FB0F9;
                    border-radius: 16px;
                    background: #4FB0F9;
                    color: #fff;
                }
            }
        }
    }
</style>
