import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

// 获取店铺名字
export const StoreEffect = () => {
  const route = useRoute()
  const store = useStore()
  const { cartList } = store.state
  const shopId = route.params.id
  const shopName = computed(() => {
    const shopName = cartList?.[shopId]?.shopName || ''
    return shopName
  })
  // 获取店铺信息
  const proudctLsit = computed(() => {
    const proudctLsit = cartList[shopId]?.proudtiList || []
    return proudctLsit
  })
  return { shopName, proudctLsit, cartList, shopId }
}
