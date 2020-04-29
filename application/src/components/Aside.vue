<template>
  <div>
    <div class='black'>
      <h2 @click='backToHome'>Larry</h2>
      <p>Welcome to my Blog</p>
    </div>
    <div class='nav'>
      <p
        :class="{on: currPath === '/'}"
        @click='backToHome'>
        Blog
      </p>
      <p
        :class="{on: currPath === '/archives'}"
        @click='toArchives'>
        Archives
      </p>
    </div>
    <div class='summaryFirst'>
      <div class='my'> {{ perch1 }} </div>
      <div class='postNums'>
        {{ perch2 }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  props: {
    perch1: {
      type: String,
      default: 'Total'
    },
    perch2: {
      type: String,
      default: '0'
    }
  },
  methods: {
    backToHome () {
      this.$router.push('/')
    },
    toArchives () {
      this.$router.push('/archives')
    }
  },
  data () {
    return {
      currPath: ''
    }
  },
  mounted () {
    // 为了方便，暂时只取最后一个/后面的内容，后期可以考虑写一个模块用来解析路由信息
    this.currPath = this.$route.path // location.split('/').slice(-1).toString()
  }
}
</script>

<style lang="less" scoped>
@boxShadow:{
  box-shadow:0 0 2px #000;
}

@pointer:{
  cursor:pointer;
}

@ArialFont: {
    font-family: Arial, Helvetica, sans-serif;
}

@CourierNewFont: {
  font-family: 'Courier New', Courier, monospace;
}

div {
  width:100%;
}

.on{
  background-color:#f9f9f9;
  &:after{
    content:'\2726';
    font-size:1.2rem;
    float: right;
    padding-right:15%;
    color:grey;
  }
}

.black {
  position: relative;
  display:flex;
  padding:20px 0px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color:black;
  font-family: Impact, Charcoal, sans-serif;
  height: 120px;
  color:white;
  @boxShadow();

  & h2{
    position: relative;
    animation: slideDown_10 .3s forwords;
    opacity: 1;
    font-size: 1.8rem;
    @pointer();
  }
  & p{
    position: relative;
    font-size:1rem;
    animation-delay:0.4s;
    margin-top:15px;
    animation:slideDown_8 .3s 0.3s forwards;
    opacity: 1;
  }
}

/* section > aside > div.nav */
.positionOfIcon(@url) {
  content:'';
  position: absolute;
  margin-left:-25px;
  top:12px;
  width:14px;
  height:14px;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(@url);
}

.nav {
  box-sizing: border-box;
  position: relative;
  margin:0;
  background-color:white;
  height: auto;
  font-size:1.1rem;
  padding-top:20px;
  padding-bottom:20px;
  overflow: hidden;
  margin-bottom:10px;
  font-family: 'Arial Black', Gadget, sans-serif;
  @boxShadow();
  & p {
    position: relative;
    margin-bottom: 2px;
    height:38px;
    line-height: 38px;
    color:rgb(17, 17, 17);
    padding-left:20%;
    @pointer();
    opacity: 1;
    text-align:left;
    transition: background-color 0.3s;
    animation:slideDown_8 .2s .5s forwards;
    &:nth-child(1):before {
      .positionOfIcon('../assets/logos/blog.png');
    }
    &:nth-child(2):before{
      .positionOfIcon('../assets/logos/archives.png');
    }
  }

  & p:hover{
    background-color:#f9f9f9;
  }
}

/* section > aside > summary */
div.my {
  min-height:30px;
  line-height: 30px;
  margin-bottom:15px;
  font-weight:bold;
  font-size:18px;
  word-break: break-all;
}

div.postNums{
  max-width:200px;
  margin:0 auto;
  opacity: 0.8;
  font-family: 'Arial Black', Gadget, sans-serif;
  font-size:16px;
}

.summary(@position) {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center; /* 设置元素在横轴上的位置 */
  align-items: center; /* 设置元素在竖轴上的位置 */
  position: @position;
  padding:10px;
  background-color:white;
  margin-top:10px;
  min-height:150px;
  animation-delay:0.6s;
  color:black;
  font-size:1.2rem;
  width:100%;
  @boxShadow();
}

.summaryFirst {
  .summary(relative);
  font-family: 'Arial Black', Gadget, sans-serif;
  opacity:1;
  @media screen and (max-width: 900px) {
    display:none;
  }
  & div {
    margin: 10px 0;
  }
}

/* summary后面用的动画 */
.summary {
  .summary(relative);
}

/* summary 固定在页面上时使用的样式 */
.fix{
  .summary(fixed);
  top:0px;
}

</style>
