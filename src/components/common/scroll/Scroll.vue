<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      return {
        scroll: null,
      }
    },
    mounted: function() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position);
        })
      }
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp');
        })
      }
    },
    methods: {
      scrollTo: function(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      refresh: function() {
        this.scroll && this.scroll.refresh();
      },
      finishPullUp: function() {
        this.scroll && this.scroll.finishPullUp();
      },
      getScrollY: function() {
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 100%;
  }
</style>
