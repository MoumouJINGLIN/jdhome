<template>
<div class="wrapper">
  <div class="top__tt">
    <div class="top__header">
    <div class="top__icon iconfont">&#xe78c;</div>
    <div class="top__header__my">
      <div class="bottom">
      <img src="../../../imgs/my.jpg" class="top__header__my__img">
      <div class="top__header__my__name">{{userInfo.username}}</div>
      <div class="top__header__my__id">ID:{{userInfo._id}}</div>
      </div>
        <div class="top__header__mess">
      <div class="top__header__mess__text">
        <div class="top__header__mess__text__title">红包</div>
        <div class="top__header__mess__text__title__text">218</div>
      </div>
      <div class="top__header__mess__text">
        <div class="top__header__mess__text__title" >优惠券</div>
        <div class="top__header__mess__text__title__text">12张</div>
      </div>
      <div class="top__header__mess__text">
        <div class="top__header__mess__text__title" >鲜豆</div>
        <div class="top__header__mess__text__title__text">88</div>
      </div>
      <div class="top__header__mess__text">
        <div class="top__header__mess__text__title" >白条</div>
        <div class="top__header__mess__text__title__text">1000</div>
      </div>
    </div>
    </div>
  </div>
  </div>
  <div class="top__body">
      <div class="top__body__title">
        <span class="iconfont top__body__title__icon red">&#xed79;</span>
        <span class="top__body__title__text">我的钱包</span>
        <span class="iconfont top__body__title__backa">&#xe697;</span>
    </div>
    <div class="top__body__title">
      <span class="iconfont top__body__title__icon blue">&#xe7f1;</span>
      <span class="top__body__title__text">我的地址</span>
      <span class="iconfont top__body__title__backb">&#xe697;</span>
      </div>
    <div class="top__body__title">
      <span class="iconfont top__body__title__icon blueviolet">&#xe78b;</span>
      <span class="top__body__title__text">客服与帮助</span>
      <span class="iconfont top__body__title__backc">&#xe697;</span>
      </div>
  </div>
</div>
  <Botttom :bottomId=4></Botttom>
</template>

<script>
import Botttom from '../Bottome//Bottom.vue'
import { get } from '../../utils/request'
import { reactive } from '@vue/reactivity'

// 获取用户信息
const getUser = () => {
  const userInfo = reactive({ _id: '', username: '' })
  const getUserInfo = async () => {
    const res = await get('/api/user/info')
    if (res?.errno === 0 && res?.data) {
      const { _id, username } = res.data
      userInfo._id = _id
      userInfo.username = username
    }
  }
  getUserInfo()
  return userInfo
}
export default {
  name: 'My',
  components: { Botttom },
  setup () {
    const userInfo = getUser()
    return { userInfo }
  }
}

</script>

<style lang='scss' scpoed>
.wrapper{
background: #FFFFFF;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: .49rem;
}
.top__tt {
  position: relative;
  min-height: 3.11rem;
  background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
}
.top__icon{
  position: absolute;
  top: 0.57rem;
  right: .21rem;
  color: #FFFFFF;
}
.bottom {
    border-bottom: .01rem solid #F1F1F1;;
}
.top__header__my{
position: relative;
top:1rem;
background-color: #fff;
border-radius: .08rem;
margin: 0 .18rem;
box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
  &__name{
    font-size: .24rem;
    color: #262628;
    text-align: center;
    line-height: .36rem;
    padding-top: .59rem
  }
  &__img{
    position: absolute;
    width: 0.94rem;
    height: 0.94rem;
    top: 0;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 50%;
  }
  &__id{
    font-size: .14rem;
    color: #C1C0C9;
    text-align: center;
    margin-bottom: .12rem;
  }
}
.top__header__mess{
  display: flex;
}
.top__header__mess__text{
  flex: 1;
}
.top__header__mess__text__title{
  margin-top:.12rem;
  font-size: .12rem;
  color: #C1C0C9;
  text-align: center;
}
.top__header__mess__text__title__text{
    padding: .12rem 0;
    font-size: .15rem;
    color: #262628;
    text-align: center;
}
.top__body{
   position: relative;
   background-color: #fff;
   box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
  border-radius: .08rem;
  margin: .28rem .3rem .18rem .3rem;
}
.top__body__title__icon{
  display: inline-block;
  padding: .12rem .16rem;
  font-size: .22rem;
}
.red{
  color: #ED4A47  ;
}
.blue{
  color:#32C5FF
}
.blueviolet{
  color: #9013FE;
}
.top__body__title__text{
  position: relative;
  bottom: .02rem;
  font-size: .14rem;
  color: #262626;
}
.top__body__title__backa,.top__body__title__backb,.top__body__title__backc{
transform: rotate(180deg);
}
.top__body__title__backa{
  position: absolute;
  top:.16rem;
  right: .16rem;
}
.top__body__title__backb{
  position: absolute;
  top: .65rem;
  right: .16rem;
}
.top__body__title__backc{
    position: absolute;
  top: 1.15rem;
  right: .16rem;
}
</style>
