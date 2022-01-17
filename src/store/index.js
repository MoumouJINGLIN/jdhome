import { createStore } from 'vuex'
const setLocalStorage = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}
const getLocalStorage = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch {
    return {}
  }
}
export default createStore({
  state: {
    index: 0,
    cartList: getLocalStorage()
    // cartList: {
    //   // 第一层时商铺的id
    //   // shopId: {
    //   // shopName:'沃尔玛'
    //   // proudtiList:{
    //   //     第二层时商品id
    //   //     proudtiId:{}
    //   // }
    //   // }
    // }
  },
  mutations: {
    indexId (state, payload) {
      state.index = payload
    },
    addItemCart (state, payload) {
      const { shopId, productId, productInfo } = payload
      const shopInfo = state.cartList[shopId] || { shopNmae: '', proudtiList: {} }
      // console.log(shopId, productId, productInfo)
      let product = shopInfo?.proudtiList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count = product.count + payload.num
      if (payload.num > 0) { product.check = true }
      if (productInfo.count < 0) { product.count = 0 }
      shopInfo.proudtiList[productId] = productInfo
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },
    // 选择按钮
    iconCheckBtn (state, payload) {
      const productInfo = state.cartList[payload.shopId].proudtiList[payload.productId]
      productInfo.check = !productInfo.check
      setLocalStorage(state)
    },
    // 清空购物车
    productClear (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].proudtiList = {}
      setLocalStorage(state)
    },
    // 全选按钮
    iconAllCheck (state, payload) {
      const { shopId } = payload
      const productInfo = state.cartList[shopId].proudtiList
      if (productInfo) {
        for (const key in productInfo) {
          const product = productInfo[key]
          product.check = true
        }
      }
      setLocalStorage(state)
    },
    // 添加购物车名字
    addShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', proudtiList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },
    clearCartData (state, shopId) {
      state.cartList[shopId].proudtiList = { }
    }
  },
  actions: {
  },
  modules: {
  }
})
