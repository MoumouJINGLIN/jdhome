<template>
  <div class="nearby">
   <h3 class="nearby__title">附件店铺</h3>
   <router-link
    v-for="item in nearbyList"
    :key="item._id"
     :to="`/Shop/${item._id}`"
     >
   <ShopInfo
    :item = 'item'
   ></ShopInfo>
   </router-link>
    <!-- <div
        class="nearby__item"
        v-for="item in nearbyList" :key='item._id'

    >
      <img class="nearby__item__imgs" :src="item.imgUrl">
      <div class="nearby__content">
          <div class="nearby__content__title">{{item.name}}</div>
           <div class="nearby__content__tags">
             <span class="nearby__content__tags__tag">月售: {{item.sales}} </span>
               <span class="nearby__content__tags__tag">起送价: {{item.expressLimit}} </span>
                 <span class="nearby__content__tags__tag">运费: {{item.expressPrice}} </span>
           </div>
             <p class="nearby__content__light">{{item.slogan}}</p>
      </div>
    </div> -->

  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { get } from '../../utils/request'
import ShopInfo from '../../components/Shopinfo.vue'
const useNearByList = () => {
  const nearbyList = ref([])
  const getNeraByList = async () => {
    const res = await get('/api/shop/hot-list')
    if (res?.errno === 0 && res?.data?.length) {
      nearbyList.value = res.data
    }
  }
  return { nearbyList, getNeraByList }
}
export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNeraByList } = useNearByList()
    getNeraByList()
    return { nearbyList }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.nearby{
  &__title{
      color: $content-fontclolr;
      font-size: .18rem;
      font-weight: normal;
      margin-left: .18rem;
      margin-bottom: .14rem;
  }
  &__item{
    padding-top: .12rem;
    display: flex;
    &__imgs{
      width: 0.56rem;
      height: 0.56rem;
      margin:0 .16rem 0 .18rem;
    }
  }
  &__content{
    padding-right: .3rem;
    border-bottom: .01rem solid #ccc;
    &__title{
      font-size: .16rem;
      color: $content-fontclolr;
      margin-bottom: .08rem;
    }
    &__tags{
      margin-bottom: .08rem;
      &__tag{
        padding-right: .16rem;
        font-size: .13rem;
         color: $content-fontclolr;
      }
    }
    &__light{
      color:#E93B3B ;
      font-size: .13rem;
      margin-bottom: .12rem;
    }
  }
  a {
    text-decoration: none;
  }
}
</style>
