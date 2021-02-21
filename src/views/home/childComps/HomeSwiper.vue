<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  props: {
    banners:{
      type: Array,
      default: function() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data: function() {
    return {
      isLoad: true
    }
  },
  methods: {
    imageLoad: function() {
      if (this.isLoad) {
        this.$emit("swiperImageLoad")
        this.isLoad = false
      }
    }
  }
}
</script>

<style scoped>

</style>
