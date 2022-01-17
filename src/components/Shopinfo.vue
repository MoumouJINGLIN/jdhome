<template>
  <div class="shop">
      <img class="shop__imgs" :src="item.imgUrl">
      <div class="shop__content"
      >
          <div class="shop__content__title">{{item.name}}</div>
           <div class="shop__content__tags">
             <span class="shop__content__tags__tag">月售: {{item.sales}} </span>
               <span class="shop__content__tags__tag">起送价: {{item.expressLimit}} </span>
                 <span class="shop__content__tags__tag">运费: {{item.expressPrice}} </span>
           </div>
             <p class="shop__content__light">{{item.slogan}}</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hiddenBottom']

}
</script>

<style lang='scss' scoped>
@import '../style/viriables.scss';
@import '../style/mixins.scss';
.shop{
    padding-top: .16rem;
    display: flex;
    &__imgs{
      width: 0.56rem;
      height: 0.56rem;
      margin:0 .16rem 0 .18rem;
    }
     &__content{
    padding-right: .3rem;
    &--bottom {
            border-bottom: .01rem solid #ccc;
    }
    &__title{
      font-size: .16rem;
      color: $content-fontclolr;
      margin-bottom: .08rem;
    }
    &__tags{
      margin-bottom: .08rem;
      &__tag{
        padding-right: .16rem;
        // font-size: .13rem;
         color: $content-fontclolr;
      }
    }
    &__light{
      color:#E93B3B ;
      margin: 0;
    }
  }
  }

</style>
