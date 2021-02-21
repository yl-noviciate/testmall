<template>
  <div id="shopcart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import BottomBar from './childComps/BottomBar'

import { mapGetters } from 'vuex'

import Scroll from 'components/common/scroll/Scroll'

export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    BottomBar,
    Scroll
  },
  computed: {
    ...mapGetters(['cartLength'])
  },
  activated: function() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  #shopcart {
    height: calc(100vh - 49px);
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content{
    height: calc(100% - 44px - 44px);
    overflow: hidden;
  }
</style>
