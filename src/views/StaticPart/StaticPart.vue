<template>
    <div class="position">
          <span class="iconfont position__lefticon">&#xe7f1;</span>
        北京理工大学国防科技园2号楼10层
            <span class="iconfont position__righticon">&#xe64e;</span>
        </div>
          <!-- 搜索 -->
  <div class="search">
    <input class="search__ipnut" type="text" placeholder="山姆会员商店优惠商品"  />
       <span class="iconfont search__icon"> &#xe741;</span>
  </div>
  <!-- banner -->
  <div class="banner">
    <img class='banner__imgs'
    src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
  </div>
  <!-- icons -->
  <div class="icons">
    <div class="icons__item"
      v-for="item in staticList"
      :key='item.id'
    >
      <img :src="item.staticImgs"  class="icons__item__imgs">
      <p class="icons__item__text">{{item.title}}</p>
      </div>
      <div class="gpd"></div>
</div>

</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const staticList = [
      {
        id: 1,
        staticImgs: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        title: '超市便利'
      },
      {
        id: 2,
        staticImgs: 'http://www.dell-lee.com/imgs/vue3/菜市场.png',
        title: '菜市场'
      },
      {
        id: 3,
        staticImgs: 'http://www.dell-lee.com/imgs/vue3/水果店.png',
        title: '水果店'
      },
      {
        id: 4,
        staticImgs: 'http://www.dell-lee.com/imgs/vue3/鲜花.png',
        title: '鲜花绿植'
      },
      {
        id: 5,
        staticImgs: 'http://www.dell-lee.com/imgs/vue3/医药健康.png',
        title: '医药健康'
      },
      {
        id: 6,
        staticImgs: 'http://www.dell-lee.com/imgs/vue3/家居.png',
        title: '家居时尚'
      },
      {
        id: 7,
        staticImgs: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png',
        title: '烘培蛋糕'
      },
      {
        id: 8,
        staticImgs: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png',
        title: '大牌免运'
      },
      {
        id: 9,
        staticImgs: 'http://www.dell-lee.com/imgs/vue3/签到.png',
        title: '签到'
      },
      {
        id: 10,
        staticImgs: 'http://www.dell-lee.com/imgs/vue3/红包.png',
        title: '红包套餐'
      }
    ]

    return { staticList }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.position{
    position: relative;
    top: 0rem;
    left: 0rem;
    line-height: .22rem;
    font-size: .16rem;
    color:  $content-fontclolr;
    @include hidden;
    padding: .16rem  .24rem .16rem .2rem;
    .position__lefticon{
      margin-right: .1rem;
    }
    .position__righticon{
        position: absolute;
        top: .16rem;
        right: .1rem;

    }
  }
  // 搜索
  .search{
    position: relative;
    width: 100%;
    line-height: .32rem;
    margin-left:.13rem;
    padding-bottom: .12rem;
    &__ipnut{
      width: 80%;
      height: 0.32rem;
      border-radius: .16rem;
      background: #F5F5F5;
      border:none;
      padding: 0 .25rem;
      font-size: .14rem;
    }
    .search__icon{
      position: absolute;
      top: 0;
      left: .02rem;
      font-size: .20rem;
     color: #B7B7B7;
     padding: 0 .03rem;
    }
  }
  // banner
.banner{
  position: relative;
  min-height: .1rem;
  margin: .12rem .18rem .16rem .18rem;
  // background-color: pink;
    &__imgs{
      width: 100%;
    }
    &__top,&__left,&__right,&__bottom{
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #fff;
    }
    &__top{
      top:-.01rem;
      left: -.01rem;
      border-radius: 0 0 .2rem 0;
    }
    &__left{
      top :-.01rem;
      right:-.01rem;
      border-radius: 0 0 0 .2rem ;
    }
    &__right{
      left: -.01rem;
      bottom: -.01rem;
       border-radius: 0 .2rem 0 0 ;
    }
    &__bottom{
      right: -.01rem;
      bottom: -.01rem;
       border-radius: .2rem 0 0 0;
    }
}
.icons{
  display: flex;
  flex-wrap: wrap;
  &__item{
    width: 20%;;
    &__imgs{
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__text{
      margin: .06rem 0 .16rem 0;
      text-align: center;
      color: $content-fontclolr;
    }
  }
}
.gpd{
  height: .1rem;
  background: #F1F1F1;
}
</style>
