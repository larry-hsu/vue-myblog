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
        <div class='loading'>
          <div class='wait-animation'>
          </div>
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
@keyframes waitAnimation {
  0% {
    transform:translateY(0px);
  }
  100% {
    transform:translateY(80px);
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
  }

  & .wait-ctx {
    width:73%;
    height:500px;
    float: right;

    & .loading {
      position: relative;
      width:20px;
      height:100px;
      border-bottom: 2px solid black;
      left:50%;
      top:50%;
      transform: translate(-50%, -50%);

      &:after {
        content:'loading...';
        position:absolute;
        bottom:-30px;
        left:-14px;
        font-size:16px;
      }

      & .wait-animation {
        width:20px;
        height:20px;
        border-radius: 10px;
        background: black;
        animation: waitAnimation cubic-bezier(0.5,0.01,0.9,1) 0.4s infinite alternate;
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
    @CourierNewFont();
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
      margin:10px 0;
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
