<template>
  <div class="bottom">
    <div
    class="bottom__item "
    :class="{'bottom__item':true , 'bottom__item--select':item.id === bottomId}"
    @click="() => bottomBgc(item.id)"
    v-for="item in bottomList"
    :key="item.id"
    >
    <router-link :to='item.to'>
      <div class="iconfont" v-html="item.icon"></div>
        <div class="bottom__title">{{item.text}}</div>
        </router-link>
      </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
// import { useRoute } from 'vue-router'
export default {
  name: 'Bottom',
  props: ['bottomId'],
  setup () {
    const indexId = ref(1)
    // const route = useRoute()
    // const shopId = route.params.id
    const store = useStore()
    const bottomList = [
      { icon: '&#xe626;', text: '首页', to: { name: 'Home' }, id: 1 },
      { icon: '&#xe698;', text: '购物车', to: { name: 'CartList' }, id: 2 },
      { icon: '&#xe78b;', text: '订单', to: { name: 'OrderList' }, id: 3 },
      { icon: '&#xe612;', text: '我的', to: { name: 'My' }, id: 4 }
    ]
    watchEffect(() => {
      indexId.value = store.state.index
    })
    const bottomBgc = (index) => {
      store.commit('indexId', index)
    }
    return { bottomList, bottomBgc, indexId }
  }

}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.bottom{
    box-sizing: border-box;
    color: $content-fontclolr;
    background-color: #fff;
    display:flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .49rem;
    border-top:.01rem solid #ccc;
    &__item{
    flex: 1;
    text-align: center;
    a {
      text-decoration: none;
      color: #000
    }
    .iconfont{
        font-size: .18rem;
        margin: .07rem  0 .02rem 0;
    }
    &--select{
      a {color: #1FA4FC; }
        color:#1FA4FC
    }
    }
    &__title{
    font-size: .2rem;
    transform: scale(.5,.5);
    transform-origin: center top;
    }
 }

</style>
