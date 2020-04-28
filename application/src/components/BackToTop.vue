<template>
  <transition name="fade">
    <div @click='backToTop' v-show='osTop>100'>
      <canvas id='upArrow' width='34' height='34'></canvas>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  data () {
    return {
      currPath: '',
      osTop: ''
    }
  },
  methods: {
    initCanvas () {
      var canvas = document.getElementById('upArrow')
      var ctx = canvas.getContext('2d')
      this.drawArrow(ctx)
    },
    drawArrow (ctx) {
      ctx.fillStyle = '#8590a6'
      ctx.fillRect(13, 17, 8, 10)
      ctx.beginPath()
      ctx.moveTo(17, 6)
      ctx.lineTo(8, 17)
      ctx.lineTo(26, 17)
      ctx.closePath()
      ctx.fill()
    },
    getScrollTop () {
      var osTop = 0
      // 标准模式生效
      if (document.documentElement && document.documentElement.scrollTop) {
        osTop = document.documentElement.scrollTop
      } else if (document.body) { // 混杂模式生效
        osTop = document.body.scrollTop
      }
      return osTop
    },
    backToTop () {
      // 设置定时器
      var upToTop = () => {
        // 获取滚动条距离顶部高度
        var osTop = this.getScrollTop()
        var ispeed = Math.floor(-osTop / 5)

        setTimeout(function () {
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
          // 到达顶部，清除定时器
          if (osTop > 0) {
            setTimeout(upToTop, 10)
          }
        }, 10)
      }
      upToTop()
    },
    handleScroll () {
      this.osTop = this.getScrollTop()
    }
  },
  mounted () {
    this.initCanvas()
    window.addEventListener('scroll', this.handleScroll, false)
  }
}
</script>

<style lang="less" scoped>
div {
  width:100%;
  height:100%;
  background: white;
  box-shadow:0 0 2px #000;
  cursor:pointer;
  transition: background 0.3s;

  &:hover {
    background: #eee;
  }
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}

.fade-leave-active, .fade-enter-active  {
  transition: opacity  0.5s
}

</style>
