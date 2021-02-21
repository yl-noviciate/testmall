import {debounce} from './utils'
export const itemListenerMixin = {
  data: function() {
    return{
      itemImgListener: null
    }
  },
  mounted: function() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}

import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin = {
  components: {
    BackTop
  },
  data: function() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick: function () {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
}

import {POP, NEW, SELL} from "./const";
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
