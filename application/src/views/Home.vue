<template>
  <div>
    <Header></Header>
    <div class="content">
      <aside>
        <Aside v-bind='transmit'></Aside>
      </aside>
      <article>
        <div class='wait-ctx' v-if="posts.length === 0">
          <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>
        </div>
        <template v-for='post in posts'>
          <Post :post='post' :key='post.id'></Post>
        </template>
        <!--
          如果你想要将一个对象的所有属性都作为 prop 传入，
          你可以使用不带参数的 v-bind (取代 v-bind:prop-name)。
        -->
        <PageIndex v-show='posts.length' :pageArr='pageArr'></PageIndex>
      </article>
    </div>
    <Footer></Footer>
    <aside class='back-to-top'>
      <BackToTop></BackToTop>
    </aside>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Post from '@/components/Post.vue'
import PageIndex from '@/components/PageIndex.vue'
import Footer from '@/components/Footer.vue'
import BackToTop from '@/components/BackToTop.vue'
import { myAjax } from '../../utils/syncajax'
import { makePage } from '../../utils/makePage.js'

export default {
  name: 'Home',
  components: {
    Header,
    Aside,
    Post,
    PageIndex,
    Footer,
    BackToTop
  },
  data () {
    return {
      pageArr: [],
      posts: [],
      transmit: {
        perch1: 'Total'
      }
    }
  },
  computed: {
    // 需要使用计算属性，这样每次返回的才能是state中的最新值
    currPage: function () {
      return this.$store.state.currPage
    }
  },
  methods: {
    async getInfo () {
      var res = await myAjax.get('/api/artCnt')
      var postUrl = `/pages/${this.currPage}`
      var posts = await myAjax.get(postUrl)
      this.pageArr = makePage(this.currPage, res)
      var totalNum = await myAjax.get('/api/total')
      this.transmit.perch2 = totalNum + ' posts '
      this.fillPosts(JSON.parse(posts))
    },
    fillPosts (arr) {
      this.posts = []
      for (let i = 0; i < arr.length; i++) {
        setTimeout(() => {
          this.posts.push(arr[i])
        }, i * 100)
      }
    }
  },
  mounted () {
    this.getInfo()
  },
  watch: {
    currPage: function () {
      this.getInfo()
    }
  }
}
</script>

<style lang='less' scoped>
@boxShadow:{
  box-shadow:0 0 2px #000;
}

@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
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
  & .spinner {
    margin: 100px auto;
    min-width: 50px;
    height: 60px;
    text-align: center;
    font-size: 10px;

    &>div {
      background-color: black;
      @boxShadow();
      height: 100%;
      width: 6px;
      display: inline-block;
      margin:0 4px;
      animation: stretchdelay 1.2s infinite ease-in-out;
    }

    & .rect2 {
      animation-delay: -1.1s;
    }

    & .rect3 {
      animation-delay: -1.0s;
    }

    & .rect4 {
      animation-delay: -0.9s;
    }

    & .rect5 {
      animation-delay: -0.8s;
    }
  }

  & article {
    width:73%;
    float: right;
    @media screen and (max-width: 900px) {
      width:100%;
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
