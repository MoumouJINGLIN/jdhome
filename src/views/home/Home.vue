<template>
<!-- 头部 -->
  <div  class="wrapper">
      <StaticPart></StaticPart>
      <Nearby></Nearby>
  </div>

  <!-- 底部 -->
<Bottom :bottomId = 1></Bottom>
</template>
<script>
import StaticPart from '../StaticPart/StaticPart.vue'
import Nearby from '../Nearby/Nearby.vue'
import Bottom from '../Bottome/Bottom.vue'
export default {
  name: 'Home',
  components: { StaticPart, Nearby, Bottom }
}
</script>
<style lang="scss" scoped>
.wrapper{
  overflow-y: auto;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: .16rem;
  margin-bottom: .6rem;
}

</style>
