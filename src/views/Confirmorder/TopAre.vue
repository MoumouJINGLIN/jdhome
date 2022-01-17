<template>
  <div class="top">
          <div class="top__header">
              <span class="top__header__icon iconfont" @click="routerBack">&#xe697;</span>
              确认订单
          </div>
          <div class="top__harvest">
              <div class="top__harvest__title">收获地址</div>
              <div class="top__harvest__text">
                  <span class="top__harvest__text__address">北京理工大学国防科技园2号楼10层</span>
                  <span class="iconfont top__harvest__text__icon">&#xe697;</span>
              </div>
              <div class="top__harvest__consignee">
                  <span class="top__harvest__consignee__name">瑶妹（先生）</span>
                  <span class="top__harvest__consignee__num">18911024266</span>
              </div>
          </div>
      </div>
</template>

<script>
import { useRouter } from 'vue-router'
// 后退
const routerBackEffect = () => {
  const router = useRouter()
  const routerBack = () => {
    router.back()
  }
  return { routerBack }
}
export default {
  name: 'TopAre',
  setup () {
    const { routerBack } = routerBackEffect()
    return { routerBack }
  }

}
</script>

<style lang='scss' scoped>
.top{
    position: relative;
    height: 1.96rem;
    // background-color: pink;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
    background-repeat: no-repeat;
    &__header{
        position: relative;
        text-align: center;
        padding-top: .25rem;
        font-size: .16rem;
        line-height: .22rem;
        color: #FFFFFF;
        &__icon{
            position: absolute;
            top: .25rem;
            left: .19rem;
            font-size: .22rem;
        }
    }
    &__harvest{
        position: absolute;
        background-color: #FFFFFF;
        height: 1.11rem;
        top: .82rem;
        left: .18rem;
        right: .18rem;
        bottom: 0;
        border-radius: .04rem;
        &__title{
            font-size: .16rem;
            color: #333333;
            padding: .16rem 0 .14rem .16rem;
        }
        &__text{
            position: relative;
            &__address{
                padding: 0 0 .06rem .16rem;
                font-size: .14rem;
                color: #333333;
            }
            &__icon{
                position: absolute;
                top: -.07rem;
                right: .16rem;
                font-size: .2rem;
                transform: rotate(180deg);
            }
        }
        &__consignee{
            padding: .06rem 0 0 .16rem;
            color: #666;
            font-size: .12rem;
            line-height: .17rem;
            &__{
                line-height: .2rem;
                text-align: center;
                padding-left: .06rem;
            }
        }
    }
}
</style>
