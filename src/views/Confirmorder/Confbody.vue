<template>
  <div class="top__message">
           <div class="top__message__for"
           >
              <div class="top__message__title">{{shopName}}</div>
              <template
              v-for="item in proudctLsit"
                :key="item._id">
                <div class="top__message__project"
                v-if="item.count > 0"
                >
                  <img :src="item.imgURL"  class="top__message__project__img"/>
                  <div class="top__message__project__text">
                      <div class="top__message__project__text__mes">{{item.name}}</div>
                      <div class="top__message__project__text__price">&yen;
                          <span class="top__message__project__text__price__text">{{item.price}} x {{item.count}}</span>
                          </div>
                          <div class="top__message__project__text__totalprice">&yen;
                              <span class="top__message__project__text__totalprice__text">{{(item.price * item.count).toFixed(2)}}</span>
                          </div>
                  </div>
              </div>
              </template>
          </div>
          <div class="top__message__btn">共计3件/1.4kg</div>
        </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
const listEffect = () => {
  const route = useRoute()
  const store = useStore()
  const shopId = route.params.id
  const { cartList } = store.state
  // 获取商品信息
  const proudctLsit = computed(() => {
    const proudctLsit = cartList[shopId]?.proudtiList || []
    return proudctLsit
  })
  // 获取店铺名
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })
  return { proudctLsit, shopName }
}
export default {
  name: 'Confbody',
  setup () {
    const { proudctLsit, shopName } = listEffect()
    return { proudctLsit, shopName }
  }
}
</script>

<style lang='scss' scoped>
.top__message{
        overflow-y: scroll;
        background-color: #fff;
        position: absolute;
        top: 2.12rem;
        left: 0.18rem;
        right: 0.18rem;
        bottom: 1.5rem ;
        border-radius: .04rem;
        &__for{
            padding-bottom: .16rem;
            overflow-y: scroll;
        }
        &__title{
            margin: .16rem 0 0 .16rem;
            font-size: .16rem;
            color: #333333;
        }
        &__project{
            position: relative;
            display: flex;
            margin: .16rem 0 0 .16rem;
            &__img{
                width: 0.46rem;
                height: 0.46rem;
            }
            &__text{
                margin-left: .16rem;
                &__mes{
                    font-size: .14rem;
                    color: #333;
                    font-weight: 700;
                }
                &__price{
                    margin-top: .06rem;
                    font-size: .12rem;
                    color: #E93B3B;
                    &__text{
                        font-size: .14rem;
                    }
                }
                &__totalprice{
                    position: absolute;
                    top: .25rem;
                    right: .16rem;
                }
            }
        }
        &__btn{
            background-color:  #F5F5F5;
            text-align: center;
            line-height: .28rem;
            height: 0.28rem;
            margin: .16rem;
            color: #999999;
            font-size: .14rem;
        }
    }

</style>
