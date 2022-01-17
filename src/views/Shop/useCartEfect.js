import { useStore } from 'vuex'
import { toRefs } from 'vue'
// 购物车相关内容
export const useCartEfect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const addItemCart = (shopId, productId, productInfo, num) => {
    store.commit('addItemCart', { shopId, productId, productInfo, num })
  }
  return { cartList, addItemCart }
}
