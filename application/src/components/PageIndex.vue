<template>
  <ul class='ul' @click="backToTop">
    <li @click='prevPage' :class='{disable: currPage === 1}'>上一页</li>
    <template v-for='index in pageArr'>
      <li
        :class="{
            active: index==currPage,
            ellipsis: index==='...'
          }"
        :key='index'
        @click='switchClass'>
        {{ index }}
      </li>
    </template>
    <li @click='nextPage' :class='{disable: currPage === lastPage}'>下一页</li>
  </ul>
</template>

<script>
export default {
  name: 'PageIndex',
  props: {
    pageArr: Array
  },
  computed: {
    currPage: function () {
      return this.$store.state.currPage
    },
    lastPage: function () {
      var len = this.pageArr.length
      return this.pageArr[len - 1]
    }
  },
  methods: {
    switchClass: function (e) {
      var target = e.target
      var ctx = target.innerText
      if (ctx !== '...') {
        var pageIndex = Number(ctx)
        this.$store.commit('setPage', pageIndex)
      }
    },
    prevPage: function () {
      if (this.currPage !== 1) {
        this.$store.commit('prevPage')
      }
    },
    nextPage: function () {
      if (this.currPage !== this.lastPage) {
        this.$store.commit('nextPage')
      }
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
        var ispeed = Math.floor(-osTop / 4)

        setTimeout(function () {
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
          // 到达顶部，清除定时器
          if (osTop > 0) {
            setTimeout(upToTop, 10)
          }
        }, 10)
      }
      upToTop()
    }
  }
}
</script>

<style lang='less' scoped>
.ul{
  display: flex;
  list-style: none;
  justify-content: center;
  & li {
    display: flex;
    min-width: 28px;
    height:30px;
    align-items: center;
    color:black;
    border-radius: 4px;
    margin: 0 2px;
    cursor: pointer;
    justify-content: center;
    padding:0 4px;
    user-select: none;  /* 阻止双击出现蓝色背景 */
    box-shadow:0 0 2px #000;
    background: white;
    transition: background-color 0.3s;
    &:hover{
      background: #e8e8e8;
    }
    &.ellipsis {
        box-shadow:0 0 0 #000;
        cursor: auto;
        &:hover {
          background: transparent;
        }
    }
    &.active {
      background: #e1e1e1;
      color:#636363;
      cursor:auto;
    }
    &.disable {
      color: #c3c3c3;
      cursor: auto;
      &:hover {
        background: white;
      }
    }
  }
}
</style>
