<template>
  <div>
    <Header></Header>
    <div class='content'>
      <aside>
        <Aside v-bind='transmit'></Aside>
      </aside>

      <div class='wait' v-if='resArr.length===0'>
        <WaitCtx></WaitCtx>
      </div>

      <article v-else>
        <div class='article'>
          <div class='wrap'>
            <div class='article-header'>
              <div class='abs'>Keep progress.</div>
              <select class='sel' @change="handleSelect">
                <option>All</option>
                <option v-for='(item, index) in category' :key='index'>
                  {{ item }}
                </option>
              </select>
            </div>
            <template v-for='(record, index) in resArr'>
              <div class='year' :key='index'> {{ record.year }} </div>
              <div
                v-for='itemRec in record.items'
                class='item'
                :key='itemRec.id'
                @click='handleClick(itemRec.id)'>
                {{ itemRec.timeTitle }}
              </div>
            </template>
          </div>
        </div>
        <PageIndex :pageArr='pageArr' v-show='show'></PageIndex>
      </article>
    </div>
    <Footer></Footer>
    <aside class='back-to-top'>
      <BackToTop></BackToTop>
    </aside>
  </div>
</template>

<script>
/*

<div class='item' :key='index'> {{ key.join(' ') }} </div>
*/
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import BackToTop from '@/components/BackToTop.vue'
import WaitCtx from '@/components/WaitCtx.vue'
import PageIndex from '@/components/PageIndex.vue'
import myAjax from '../../utils/syncajax'
import makePage from '../../utils/makePage.js'

export default {
  name: 'Archives',
  components: {
    Header,
    Aside,
    Footer,
    BackToTop,
    WaitCtx,
    PageIndex
  },
  data () {
    return {
      resArr: [],
      totalNum: 0,
      transmit: {
        perch1: 'Total:',
        perch2: ''
      },
      eachPageNum: 14,
      pageArr: [],
      category: [],
      allItems: [],
      show: true
    }
  },
  computed: {
    currPage () {
      return this.$store.state.currPage
    }
  },
  methods: {
    async getArchives () {
      var postData = {
        eachPageNum: this.eachPageNum,
        page: this.$store.state.currPage
      }
      var res = await myAjax.post('/api/archives', postData)
      this.totalNum = await myAjax.get('/api/total')
      // 获取所有的条目用作后面筛选用
      var allItems = await myAjax.post('/api/archives', {
        eachPageNum: this.totalNum,
        page: 1
      })
      // console.log(JSON.parse(allItems))
      this.allItems = JSON.parse(allItems)

      // 获取分类
      var cate = await myAjax.get('/api/archives/category')
      this.category = JSON.parse(cate)

      this.makePages()
      this.fillResArr(JSON.parse(res))
    },
    makePages () {
      this.transmit.perch2 = this.totalNum + ' posts'
      var liNum = Math.ceil(this.totalNum / this.eachPageNum)
      this.pageArr = makePage(this.currPage, liNum)
    },
    fillResArr (arr) {
      // 这里期望实现动画
      this.resArr = arr
    },
    handleClick (id) {
      var url = `/articles/${id}`
      this.$router.push(url)
    },
    handleSelect (e) {
      var cate = e.target.value
      var allItems = JSON.parse(JSON.stringify(this.allItems))

      if (cate !== 'All') {
        this.show = false
        for (let i = 0; i < allItems.length; i++) {
          allItems[i].items = allItems[i].items.filter(item => item.cate === cate)
        }
        for (let i = 0; i < allItems.length; i++) {
          if (!allItems[i].items.length) {
            allItems.splice(i, 1)
          }
        }
        this.resArr = allItems
      } else {
        this.show = true
        this.getArchives()
      }
      // console.log(allItems)
    }
  },
  mounted () {
    this.getArchives()
  },
  watch: {
    currPage: function () {
      this.getArchives()
    }
  }
}
</script>

<style lang='less' scoped>

@keyframes showUp{
  from{
    top:10px;
    opacity: 0;
  }
  to{
    top:0;
    opacity:1;
  }
}

@keyframes leftToRight {
  from {
    opacity: 0;
    left:-10px;
  }
  to{
    opacity: 0.75;
    left:0px;
  }
}

@boxShadow:{
  box-shadow:0 0 2px #000;
}

@CourierNewFont: {
  font-family: 'Courier New', Courier, monospace;
}

.content {
  width: 77%;
  margin: 0 auto;
  @media screen and (max-width: 900px) {
    width:100%;
  }

  &:after {
    content: '';
    display: block;
    clear: both;
  }

  & aside {
    width:26%;
    float: left;
    @media screen and (max-width: 900px) {
      width:100%;
    }
  }

  & .wait {
    width:73%;
    height:500px;
    float: right;
    @media screen and (max-width: 900px) {
      width:100%;
    }
  }

  & article {
    width:73%;
    float: right;
    @media screen and (max-width: 900px) {
      width:100%;
    }
    & .article {
      width:100%;
      background:white;
      box-sizing: border-box;
      padding: 50px;
      @boxShadow();

      & .wrap {
        position: relative;
        height:auto;
        border-left: 5px solid #f5f5f5;

        & .article-header {
          position:relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          top: -10px;
          & .abs {
            position: relative;
            height: 30px;
            line-height: 30px;
            font-size: 18px;
            padding-left:20px;
            font-weight: bold;
            font-family: Georgia, serif;
            &::before {
              position: absolute;
              left:-18px;
              content:'\263B';
              font-size: 28px;
              color:#AAA;
            }
          }

          & .sel {
            height: 20px;
            min-width: 100px;
            outline:none;
          }
        }

        & .year {
          position: relative;
          text-align: left;
          height: 150px;
          line-height: 150px;
          padding-left: 20px;
          font-size:24px;
          font-weight: bold;
          opacity: 0;
          animation: leftToRight 0.3s forwards;
          font-family: Impact, Charcoal, sans-serif;
          &::before{
            position: absolute;
            left:-15px;
            content:'\263B';
            font-size: 22px;
            color:#AAA;
          }
        }

        & .item {
          text-align: left;
          position: relative;
          min-height: 30px;
          line-height: 30px;
          margin-bottom: 30px;
          font-size: 16px;
          opacity: 0;
          font-weight: bold;
          padding-left: 20px;
          border-bottom:1px dashed rgba(0,0,0,0.3);
          transition: border-bottom 0.3s;
          animation: showUp 0.3s forwards;
          font-family: Georgia, serif;
          cursor: pointer;
          &:hover{
            border-bottom:1px dashed rgba(0,0,0,1);
            &::before {
              color: black;
            }
          }
          &::before {
            position: absolute;
            left:-13px;
            content:'\263B';
            font-size: 18px;
            color:#AAA;
            transition: color 0.3s;
          }
        }
      }
    }
  }
}
aside.back-to-top {
  position: fixed;
  width:34px;
  height:34px;
  bottom: 20px;
  right: 20px;
  @media screen and (max-width: 900px) {
    display:none;
  }
}
</style>
