<template>

  <div class="top">
              <span class="top__header__icon iconfont" @click="routerBack">&#xe697;</span>
              我的购物车
    </div>
         <div class="bgc">
    <template
     v-for="item in cartData.cartDataList"
              :key="item._id">
          <div class="top__for">
              <div class="top__title"
              >{{item.shopName}}</div>
              <div class="top__project"
                v-for="(itemList,index) in item.proudtiList "
                  :key="index">
                  <img :src="itemList.imgURL"  class="top__project__img"/>
                  <div class="top__project__text">
                      <div class="top__project__text__mes">{{itemList.name}}</div>
                      <div class="top__project__text__price">&yen;
                          <span class="top__project__text__price__text">{{itemList.price}} x {{itemList.count}}</span>
                          </div>
                          <div class="top__project__text__totalprice">&yen;
                              <span class="top__project__text__totalprice__text">{{(itemList.price * itemList.count).toFixed(2)}}</span>
                          </div>
                  </div>
            </div>
    </div>
    </template>
    </div>
        <Bottom :bottomId = 2></Bottom>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import Bottom from '../Bottome/Bottom.vue'
export default {
  name: 'CartList',
  components: { Bottom },
  setup () {
    const router = useRouter()
    const cartData = reactive({
      cartDataList: {
      }
    })
    // const shopNameId = ref()
    const routerBack = () => {
      router.back()
    }
    const cartList = [JSON.parse(localStorage.getItem('cartList'))]
    for (const item of cartList) {
      cartData.cartDataList = item
    }
    return { routerBack, cartData }
  }
}
</script>

<style lang="scss" scoped>
.bgc{
  overflow-y: scroll;
  background-color: #eee;
  position: absolute;
  top: .54rem;
  left: 0;
  right: 0;
  bottom: .49rem;
}
.top{
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 0.52rem;
  text-align: center;
  line-height: .52rem;
  font-size: 0.16rem;
}
.top__header__icon{
  position: absolute;
  top: 50%;
  left: .1rem;
  font-size: .18rem;
  transform: translateY(-50%);
}
.top__for{
  background-color: #fff;
  margin:  .16rem .18rem .16rem .18rem;
  border-radius: 4px;
  height: 2.22rem;

}
.top__title{
font-size: .16rem;
color: #333333;
padding: .16rem 0 0 .16rem
}
.top__project{
position: relative;
 display: flex;
margin: .16rem 0 0 .16rem;}
.top__project__img{
width: 0.46rem;
height: 0.46rem;
}
.top__project__text{
margin-left: .16rem;
}
 .top__project__text__mes{
 font-size: .14rem;
 color: #333;
font-weight: 700;
}
.top__project__text__price{
margin-top: .06rem;
font-size: .12rem;
color: #E93B3B;
}
.top__project__text__price__text{
font-size: .14rem;
}
.top__project__text__totalprice{
    position: absolute;
    top: .25rem;
    right: .16rem;
}
</style>
