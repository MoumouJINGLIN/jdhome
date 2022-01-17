<template>
    <div class="mask"  v-if="showData && cartTotalPriveAdd.tatal > 0" @click="showProudctList"/>
    <div class="content__right"     v-if=" showData && cartTotalPriveAdd.tatal > 0">
           <div class="content__header"
            @click="() =>iconAllCheck(shopId)"
            >
             <div
             class="content__icon__all iconfont"
             v-html=" cartTotalPriveAdd.allClick ? '&#xe618;' : '&#xe6f7;' "
             ></div>
              <div class="content__all">全选</div>
              <div class="content__clear"
              @click="() => productClear(shopId)"
              >清空购物车</div>
            </div>
        <template
        v-for="item in catrList"
        :key="item._id"
        >
        <div class="content__right__item" v-if="item.count >  0">
               <div
               class="iconfont content__icon" v-html= "item.check ? '&#xe618;' : '&#xe6f7;'"
               @click="()=>iconCheckBtn(shopId,item._id)"
               ></div>
          <img :src="item.imgURL" class="content__right__item__img">
          <div class="content__right__detail">
            <h4 class="content__right__title">{{item.name}}</h4>
            <p class="content__right__price">
              <span class="content__right__yen">&yen;</span>{{item.price}}
              <span class="content__right__origin">&yen;{{item.oldprice}}</span>
            </p>
          </div>
          <div class="content__right__buttom">
            <span class="content__right__reduce"
              @click="()=> {addItemCart(shopId,item._id, item, -1)}">-</span>
            <span class="content__right__num">
               {{cartList?.[shopId]?.proudtiList?.[item._id]?.count || 0}}
            </span>
            <span class="content__right__add"
            @click="()=> {addItemCart(shopId,item._id, item, 1)}">+</span>
          </div>
          </div>
        </template>
       </div>
  <div class="cart">
     <div class="cart__change">
          <img src="http://www.dell-lee.com/imgs/vue3/basket.png"  class="cart__change__img" @click="showProudctList">
          <div class="cart__change__num">{{cartTotalPriveAdd.tatal}}</div>
     </div>
      <div class="cart__total">
          <div class="cart__total__text">
              总计: <span class="cart__total__text__num">&yen; {{cartTotalPriveAdd.prive}}</span>
              </div>
      </div>
      <div class="cart_btn" v-show="cartTotalPriveAdd.prive > 0">
        <router-link :to="{path: `/Confirmorder/${shopId}`}">
          去结算
        </router-link>
      </div>
  </div>
</template>

<script>
import { useCartEfect } from './useCartEfect'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
// 购物车相关的
const useCartEffect = () => {
  const { addItemCart } = useCartEfect()
  const router = useRoute()
  const store = useStore()
  const shopId = router.params.id
  const cartList = store.state.cartList
  // 加减数量
  // const tatal = computed(() => {
  //   const proudctLsit = cartList[shopId]?.proudtiList
  //   let count = 0
  //   if (proudctLsit) {
  //     for (const i in proudctLsit) {
  //       const proudct = proudctLsit[i]
  //       count += proudct.count
  //     }
  //   } else {
  //     return count
  //   }
  //   return count
  // })
  // 购物车计算属性
  const cartTotalPriveAdd = computed(() => {
    const resule = { tatal: 0, prive: 0, allClick: true }
    const proudctLsit = cartList[shopId]?.proudtiList
    if (proudctLsit) {
      for (const i in proudctLsit) {
        const proudct = proudctLsit[i]
        resule.tatal += proudct.count
        if (proudct.check) { resule.prive += (proudct.count * proudct.price) }
        if (proudct.count > 0 && !proudct.check) { resule.allClick = false }
      }
    } else {
      return resule
    }
    resule.prive = resule.prive.toFixed(2)
    return resule
  })
  // 总价
  // const prive = computed(() => {
  //   const proudctLsit = cartList[shopId]?.proudtiList
  //   let count = 0
  //   if (proudctLsit) {
  //     for (const i in proudctLsit) {
  //       const proudct = proudctLsit[i]
  //       if (proudct.check) { count += (proudct.count * proudct.price) }
  //     }
  //   } else {
  //     return count
  //   }
  //   return count.toFixed(2)
  // })
  // 获取商品列表
  const catrList = computed(() => {
    const proudctLsit = cartList[shopId]?.proudtiList || []
    return proudctLsit
  })
  // 选择按钮
  const iconCheckBtn = (shopId, productId) => {
    store.commit('iconCheckBtn', { shopId, productId })
  }
  // 清空购物车
  const productClear = (shopId) => {
    store.commit('productClear', { shopId })
    localStorage.check('cartList')
  }
  // 全选图标
  // const iconCheck = computed(() => {
  //   const proudctLsit = cartList[shopId]?.proudtiList
  //   let result = true
  //   if (proudctLsit) {
  //     for (const i in proudctLsit) {
  //       const proudct = proudctLsit[i]
  //       if (proudct.count > 0 && !proudct.check) { result = false }
  //     }
  //   } else {
  //     return result
  //   }
  //   return result
  // })
  // 全选按钮
  const iconAllCheck = (shopId) => {
    store.commit('iconAllCheck', { shopId })
  }
  return { cartTotalPriveAdd, catrList, addItemCart, iconCheckBtn, shopId, cartList, productClear, iconAllCheck }
}
// 显示隐藏
const showCart = () => {
  const showData = ref(false)
  const showProudctList = () => {
    showData.value = !showData.value
  }
  return { showData, showProudctList }
}
export default {
  name: 'Cart',
  setup () {
    const { showData, showProudctList } = showCart()
    const { tatal, prive, catrList, addItemCart, iconCheckBtn, shopId, cartList, productClear, iconCheck, iconAllCheck, cartTotalPriveAdd } = useCartEffect()
    return { tatal, prive, catrList, addItemCart, iconCheckBtn, shopId, cartList, productClear, iconCheck, iconAllCheck, showProudctList, showData, cartTotalPriveAdd }
  }

}
</script>

<style lang='scss' scoped>
@import '../../style/mixins.scss';
.mask{
  position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  z-index: 1;
  background-color: rgba(121, 120, 120, 0.5);
}
.cart{
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.49rem;
    border-top: .01rem solid #ccc;
    z-index: 2;
    background-color: #fff;
}
.cart__change{
    position: relative;
    width: .84rem;
    &__img{
        display: block;
        width: .28rem;
        height: .26rem;
        margin:  .11rem auto;
    }
    &__num{
        position: absolute;
        top: .02rem;
        left: .46rem;
        min-width: 0.2rem;
        height: 0.2rem;
        background-color: #E93B3B;
        border-radius: 50%;
        transform: scale(.5);
        text-align: center;
        line-height: .2rem;
        color: #FFFFFF;
        padding: 0 .04rem;
        transform-origin: left center;
    }
}
.cart__total{
    width: 1.93rem;
    line-height: .49rem;
    font-size: .12rem;
    color: #333;

}
.cart__total__text__num{
    color: #E93B3B;
    font-size: .16rem;
}
.cart_btn{
background-color: #4FB0F9 ;
margin-left: .3rem;
width: 0.98rem;
text-align: center;
line-height: .49rem;
font-size: 0.14rem;
 a {
   color: #fff;
   text-decoration: none;
 }
}
.content__right{
  z-index: 2;
  background: #fff;
  flex:1;
  overflow-y: scroll;
  position: absolute;
  left: 0;
  right: 0;
  bottom: .49rem;
}
.content__header{
  display: flex;
  line-height: .52rem;
  border:.01rem solid  #F1F1F1;
}
.content__icon__all{
  font-size: 0.192rem;
  color: #0091FF;
  margin:0 .08rem 0 .18rem !important
}
.content__all{
  font-size: .14rem;
  // margin-left: .18rem;
}
.content__clear{
  flex: 1;
  text-align: right;
  font-size: 0.14rem;
  color: #333;
  margin-right: .18rem;
}
.content__right__item{
  display: flex;
  position: relative;
  padding: .02rem 0;
  margin: 0 .16rem;
  border-bottom:.01rem solid #F1F1F1;
  &__img{
  width: 0.46rem;
  height: 0.46rem;
  }
}
.content__right__detail{
  overflow: hidden;
}
.content__right__title{
  @include hidden;
  margin: 0 0 .06rem .16rem;
    font-size: 0.14rem;
    color: #333333;
    line-height: .2rem;
}
.content__right__price{
  color: #E93B3B;
  font-size: 0.14rem;
  padding-left: .16rem;
  margin: 0;
  padding-top: .06rem;
}
.content__right__yen{
  font-size: 0.12rem;
  line-height: 0.14rem;}
  .content__right__origin{
    font-size: .12rem;
    color: #999;
    line-height: .2rem;
    text-decoration: line-through;
  }
  .content__right__buttom{
    position: absolute;
    right: 0;
    bottom: .12rem;
    font-size: 0.14rem;
    line-height: .16rem;
  }
  .content__right__reduce,.content__right__add{
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    font-size: .2rem;
  }
  .content__right__reduce{
    width: 0.18rem;
    height: 0.18rem;
    line-height: .16rem;
    margin-right: .11rem;
    border:.01rem solid #000
  }
  .content__right__add{
     width: .2rem;
     height: .2rem;
     line-height: .18rem;
     margin-left: .11rem;
    background-color: #0091FF;
    color: #fff;
  }
  .content__right__num{
    display: inline-block;
    text-align: center;
    font-size: .17rem;
  }
  .content__icon{
      line-height: .5rem;
      margin-right: .16rem;
      width: 0.192rem;
      font-size: 0.192rem;
      color: #0091FF;
  }
</style>
