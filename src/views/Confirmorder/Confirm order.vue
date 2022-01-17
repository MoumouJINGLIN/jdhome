<template>
  <div class="wrapper">
      <Topare></Topare>
        <Confbody></Confbody>
        <Conbottom></Conbottom>
  </div>
</template>

<script>
import Topare from './TopAre.vue'
import Conbottom from './Conbottom.vue'
import Confbody from './Confbody.vue'
export default {
  name: 'Confirmorder',
  components: { Topare, Conbottom, Confbody },
  setup () {
    return { }
  }

}
</script>

<style lang='scss' scoped>
.wrapper{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background:#eee
}
</style>
