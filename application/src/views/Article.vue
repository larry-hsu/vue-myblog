<template>
  <div>
    <Header></Header>
    <div class="content">
      <aside>
        <Aside v-bind='transmit'></Aside>
      </aside>
      <!--
        在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。
        只在可信内容上使用 v-html，永不用在用户提交的内容上。
      -->
      <div class='wait-ctx' v-if="content===''">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
      <article v-else class='ctx' v-html='content'></article>
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
import Footer from '@/components/Footer.vue'
import BackToTop from '@/components/BackToTop.vue'
import { myAjax } from '../../utils/syncajax'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atelier-cave-dark.css'

const highlightCode = () => {
  const preEl = document.querySelectorAll('pre')
  preEl.forEach((el) => {
    hljs.highlightBlock(el)
  })
}

export default {
  name: 'Article',
  components: {
    Header,
    Aside,
    Footer,
    BackToTop
  },
  data () {
    return {
      articleId: 0,
      content: '',
      transmit: {
        perch1: '',
        perch2: ''
      }
    }
  },
  methods: {
    async getInfo () {
      const url = `/api/articles/${this.articleId}`
      var res = await myAjax.get(url)
      res = JSON.parse(res)
      this.transmit.perch1 = res.articleName
      this.transmit.perch2 = '作者: ' + res.author
      this.content = marked(res.content)
    }
  },
  mounted () {
    // 使用this.$route访问路由
    this.articleId = this.$route.params.id
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
    this.getInfo()
    setTimeout(() => {
      highlightCode()
    }, 500)
  }
}
</script>

<style lang='less'>
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
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

  & p code{
    word-break: break-all;
    font-family: Georgia, serif;
  }

  & .wait-ctx {
    width:73%;
    height:500px;
    float: right;
    @media screen and (max-width: 900px) {
      width:100%;
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

  & .ctx {
    width:73%;
    float: right;
    background:white;
    @boxShadow();
    box-sizing: border-box;
    padding:50px;
    text-align: left;
    font-family: Georgia, serif;
    font-size: 16px;
    line-height: 32px;
    outline: none;
    opacity: 0.9;
    @media screen and (max-width: 900px) {
      width:100%;
    }

    & p {
      margin:10px 0;
      line-height: 2;
    }

    & ol, ul {
      margin-left:6%;
    }

    & blockquote {
      border-left:4px solid grey;
      margin:12px 0;
      font-size:15px;
      padding-left:10px;
      color:grey;
      & p {
        margin: 0;
        line-height: 1.5;
      }
    }

    & h1 {
      margin:30px 0;
    }

    & h2 {
      margin: 20px 0;
    }

    & h3 {
      margin:10px 0;
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
