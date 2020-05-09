<template>
  <div class="articleWrap">
    <p class="title">
      <span @click='handleClick(post.id)'>{{ post.articleName }}</span>
    </p>
    <p class="time"> Posted on {{ post.postTime }} </p>
    <p class="abstract"> <b>速览: </b> {{ content }}...... </p>
    <p class="author"> <b>作者: </b> {{ post.author }} </p>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: Object
  },
  computed: {
    content: function () {
      var ctx = this.post.content.substr(0, 260)
      ctx = ctx.replace(/(<[^>]+>)|&nbsp;/g, '')
      ctx = ctx.replace(/(```[a-zA-Z]+|```|#+)/g, '')
      ctx = ctx.replace(/<|>/g, '')
      return ctx
    }
  },
  methods: {
    handleClick: function (id) {
      var url = `/articles/${id}`
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
/* 字体大小怎么设置 */

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

@clearFloat: {
  content:'';
  display: block;
  clear:both;
}

@defaultA:{
  text-decoration: none;
  color: white;
}

.articleWrap{
  position: relative;
  color:black;
  box-sizing:border-box;
  position: relative;
  box-shadow:0 0 2px #000;
  padding:30px 50px;
  width:100%;
  height:auto;
  background-color:white;
  margin-bottom: 10px;
  opacity: 0;
  animation: showUp 0.3s forwards;
  & .title {
    text-align:center;
    font-size:1.4rem;
    @media screen and (max-width: 900px) {
      font-size: 18px;
    }
    font-family: Tahoma, Geneva, sans-serif;
    & span {
      cursor: pointer;
      border-bottom:2px solid black;
      word-break: break-all;
    }
  }

  & .time{
    position: relative;
    text-align:center;
    color:#aeaeae;
    font-size:1rem;
    margin:10px;
    margin-bottom: 20px;
    font-family: 'Courier New', Courier, monospace;
    @media screen and (max-width: 900px) {
      font-size: 16px;
    }
    &::before{
        content:'';
        position: absolute;
        margin-left:-16px;
        top:1px;
        width:12px;
        height:12px;
        background:url(../assets/logos/calendar.png) no-repeat center;
        filter: grayscale(10%);
        background-size: 100% 100%;
    }
  }

  & .author{
    position: relative;
    text-align:left;
    font-size:1rem;
    margin-bottom:20px;
    font-family: 'Tahoma';
    @media screen and (max-width: 900px) {
      font-size: 14px;
    }
    &::after{
      content:'';
      display: block;
      border-bottom:1px dotted grey;
      opacity: 0.3;
    }
  }

  & .abstract{
    text-align:left;
    margin-bottom:20px;
    font-size:1rem;
    font-family: Verdana, Geneva, sans-serif;
    font-size:16px;
    line-height:2;
    @media screen and (max-width: 900px) {
      font-size: 14px;
    }
  }

  & .readmore {
    display: block;
    margin: 0 auto;
    border:2px solid black;
    outline:none;
    width:100px;
    height:26px;
    font-size:1rem;
    padding:2px 15px;
    background-color: white;
    transition: background-color 0.6s;
    &:hover {
        border:2px solid  black;
        color:white;
        background-color:black !important;
    }
  }
}
</style>
