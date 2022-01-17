<template>
  <div class="content">
    <div class="content__left">
      <ul class="content__left__text">
        <li
        :class="{'content__left__text__li':true ,'content__left__text__li--active': currTab === item.tab }"
        v-for="item in contentData"
        :key="item.id"
        @click="() => contenClick(item.tab)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="content__right">
        <div class="content__right__item"
        v-for="item in constenList"
        :key="item._id"
        >
          <img :src="item.imgURL" class="content__right__item__img">
          <div class="content__right__detail">
            <h4 class="content__right__title">{{item.name}}</h4>
            <span class="content__right__sales">月售 {{item.sales}}件</span>
            <p class="content__right__price">
              <span class="content__right__yen">&yen;</span>{{item.price}}
              <span class="content__right__origin">&yen;{{item.oldprice}}</span>
            </p>
          </div>
          <div class="content__right__buttom">
            <span class="content__right__reduce"
              @click="()=> {addCartItemInfo(shopId,item._id, item, -1, shopName)}">-</span>
            <span class="content__right__num">
              <!-- {{getCartlistCount(shopId, item._id)}} -->
              {{cartList?.[shopId]?.proudtiList?.[item._id]?.count || 0}}
            </span>
            <span class="content__right__add"
            @click="()=> {addCartItemInfo(shopId,item._id, item, 1, shopName)}">+</span>
          </div>
       </div>
       </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { get } from '../../utils/request'
import { useRoute } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
import { useCartEfect } from './useCartEfect'
import { useStore } from 'vuex'
const contentData = [
  { id: 1, name: '全部商品', tab: 'all' },
  { id: 2, name: '秒杀', tab: 'seckill' },
  { id: 3, name: '新鲜水果', tab: 'fruit' },
  { id: 4, name: '休闲食品', tab: 'Snacks' },
  { id: 5, name: '时令蔬菜', tab: 'vegetables' },
  { id: 6, name: '肉蛋家禽', tab: 'egg' }]

// tab 相关的内容
const useTabEffect = () => {
  const currTab = ref(contentData[0].tab)
  const contenClick = (tab) => {
    currTab.value = tab
  }
  return { contenClick, currTab }
}

// 当前列表内容
const useCurrentListEffect = (currTab, shopId) => {
  const data = reactive({
    constenList: []
  })
  const getConstData = async () => {
    const res = await get(`/api/shop/${shopId}/products`, {
      tab: currTab.value
    })
    if (res?.errno === 0 && res?.data.length) {
      data.constenList = res.data
    }
  }
  watchEffect(() => getConstData())
  const { constenList } = toRefs(data)
  return { constenList }
}
// 购物车相关逻辑
const getCartIteam = () => {
  const store = useStore()
  const { addItemCart, cartList } = useCartEfect()
  const addShopName = (shopId, shopName) => {
    store.commit('addShopName', { shopId, shopName })
  }
  const addCartItemInfo = (shopId, productId, item, num, shopName) => {
    addItemCart(shopId, productId, item, num)
    addShopName(shopId, shopName)
  }
  // 数量显示
  // const getCartlistCount = (shopId, proudtiId) => { return cartList?.[shopId]?.proudtiList?.[proudtiId]?.count || 0 }
  return { addShopName, addCartItemInfo, cartList }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const router = useRoute()
    const shopId = router.params.id
    const { addShopName, addCartItemInfo, cartList } = getCartIteam()
    const { contenClick, currTab } = useTabEffect()
    const { constenList } = useCurrentListEffect(currTab, shopId)
    return { constenList, contentData, contenClick, currTab, shopId, addCartItemInfo, cartList, addShopName }
  }

}

</script>

<style lang='scss' scoped>
@import '../../style/mixins.scss';
li{
  list-style: none;
}
.content{
    display: flex;
    position: absolute;
    // background-color: pink;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: .5rem;
    &__left {
      // box-sizing: border-box;
      overflow-y: scroll;
      height: 100%;
      width: 0.76rem;
      background: #F5F5F5;
    }
}
.content__left__text{
  padding: 0;
}
.content__left__text__li{
line-height: .4rem;
font-size: 0.14rem;
text-align: center;
color: #333;
&--active{
  background-color: #fff;
}
}
.content__right{
  flex: 1;
  overflow-y: scroll;
}
.content__right__item{
  display: flex;
  position: relative;
  padding: .12rem 0;
  margin: 0 .16rem;
  border-bottom:.01rem solid #F1F1F1;
  &__img{
  width: 0.68rem;
  height: 0.68rem;
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
.content__right__sales{
  font-size: 0.12rem;
  color: #333;
  line-height: 0.16rem;
  padding: .06rem 0 .06rem .16rem;
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
</style>
