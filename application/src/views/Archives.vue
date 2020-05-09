<template>
  <div>
    <Header></Header>
    <div class='content'>
      <aside>
        <Aside v-bind='transmit'></Aside>
      </aside>
      <article>
        <div class='wrap'>
          <div class='abs'>Um..! {{ totalNum }} posts in total. Keep on posting.</div>
          <template v-for='(year, index) in years'>
            <div class='year' :key='index'> {{ year }} </div>
            <div
              v-for='(item, index) in items'
              class='item'
              :key='index'
              v-show='item[1] === year'
              @click='handleClick(item[0])'
            >
              {{ item[2] }}
            </div>
          </template>
        </div>
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
import { myAjax } from '../../utils/syncajax'

export default {
  name: 'Archives',
  components: {
    Header,
    Aside,
    Footer,
    BackToTop
  },
  data () {
    return {
      items: [],
      years: [],
      totalNum: 0,
      transmit: {
        perch1: 'Total:',
        perch2: ''
      }
    }
  },
  methods: {
    async getArchives () {
      var res = await myAjax.get('/api/archives')
      this.totalNum = await myAjax.get('/api/total')
      this.transmit.perch2 = this.totalNum + ' posts'
      var tmpArr = JSON.parse(res)
      this.handleData(tmpArr)
    },
    handleData (arr) {
      var tmp = []
      this.items = []
      for (let i = 0; i < arr.length; i++) {
        if (tmp.indexOf(arr[i][1]) === -1) {
          tmp.push(arr[i][1])
        }
        setTimeout(() => {
          this.items.push(arr[i])
        }, i * 50)
      }
      this.years = tmp
    },
    handleClick (id) {
      var url = `/articles/${id}`
      this.$router.push(url)
    }
  },
  mounted () {
    this.getArchives()
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

  & article {
    width:73%;
    box-sizing: border-box;
    background:white;
    padding: 50px;
    float: right;
    @boxShadow();
    @media screen and (max-width: 900px) {
      width:100%;
    }

    & .wrap {
      position: relative;
      height:auto;
      border-left: 5px solid #f5f5f5;

      & .abs {
        position: relative;
        text-align: left;
        top:-10px;
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
