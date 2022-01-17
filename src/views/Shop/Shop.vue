<template>
<div class="warpper">
    <div class="shop">
        <div class="iconfont shop__back"
        @click="backClick"
        >&#xe697;</div>
        <div class="shop__input">
            <span class="iconfont shop__ipnut__iconfont">&#xe741;</span>
            <input type="text" class="shop__input__search"
            placeholder="请输入商品名称搜索">
        </div>
    </div>
        <ShopInfo
        :item ="data.item"
        hiddenBottom = 'true'
        ></ShopInfo>
        <Content :shopName="data.item.name"></Content>
        <Catr></Catr>
</div>

</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { reactive } from '@vue/reactivity'
import ShopInfo from '../../components/Shopinfo.vue'
import { get } from '../../utils/request'
import Content from '../Shop/Content.vue'
import Catr from '../Shop/Catr.vue'
const showList = () => {
  const route = useRoute()
  const data = reactive({
    item: {}
  })
  const getShopList = async () => {
    const res = await get(`/api/shop/${route.params.id}`)
    if (res.errno === 0 && res.data.item) {
      for (const item of res.data.item) {
        if (item._id === route.params.id) {
          data.item = item
        }
      }
    }
  }
  return { data, getShopList }
}
export default {
  name: 'shop',
  components: { ShopInfo, Content, Catr },
  setup () {
    const { data, getShopList } = showList()
    const router = useRouter()
    const backClick = () => {
      router.back()
    }
    getShopList()
    return { data, backClick }
  }
}
</script>

<style lang='scss' scoped>
    .warpper{
        padding: .16rem .18rem;
    }
    .shop{
        display: flex;
        height: .32rem;
        &__back{
            font-size: .3rem;
            margin-right: .16rem;
        }
        &__input{
            display: flex;
            flex: 1;
            width: 100%;
            background: #F5F5F5;
            border-radius: 16px;
        &__search{
            width: 100%;
            border:none;
            outline: none;
            background: #F5F5F5;
            border-radius: 16px;
            &::placeholder{
                font-size: .14rem;
                color: #333333;
            }
        }
          .shop__ipnut__iconfont{
              width: 0.43rem;
              line-height: .32rem;
              text-align:center ;
              font-size: .22rem;
              color: #b7b7b7;
            }
        }
    }
</style>
