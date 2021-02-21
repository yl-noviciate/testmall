<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control v-show="isTabFixed" ref="tabTopControl" class="tab-control"
    :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl" :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"

import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goodsList/GoodsList"

import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import {getHomeMultidata, getHomeGoods} from "network/home"

import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data: function () {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods: function () {
      return this.goods[this.currentType].list;
    },
  },
  activated: function () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated: function () {
    this.saveY = this.$refs.scroll.getScrollY();
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  created: function () {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    getHomeMultidata: function () {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods: function (type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },

    tabClick: function (index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabTopControl.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    contentScroll: function (position) {
      this.isShowBackTop = -position.y > 1000;
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore: function () {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },
    swiperImageLoad: function () {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    }
  }
}
</script>

<style scoped>
#home {
  position: relative;
  height: calc(100vh - 49px);
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.tab-control {
  position: relative;
  background-color: #fff;
  z-index: 99;
}

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>
