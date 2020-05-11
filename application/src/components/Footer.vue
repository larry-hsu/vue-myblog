<template>
  <div class='foot'>
    <div class='find-me'>
      <p>你还可以在以下社交场合发现我:</p>
      <div @click='handleClick'>
        <img src='../assets/images/zhihu.png' data-dst='zhihu'>
        <img src='../assets/images/douban.png' data-dst='douban'>
        <img src='../assets/images/github.png' data-dst='github'>
        <img src='../assets/images/twitter.png' data-dst='twitter'>
        <img src='../assets/images/email.png' data-dst='email'>
      </div>
    </div>
    <p class='mem'>苏ICP备20008705号</p>
    <p>Designed and developed by Larry Hsu</p>
    <p>Copyright © 2018-2020 larryhsu.com. All Rights Reserved</p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    handleClick (e) {
      var dst = e.target.getAttribute('data-dst')
      switch (dst) {
        case 'zhihu':
          window.location.href = 'https://www.zhihu.com/people/constqu-77/posts'
          break
        case 'douban':
          window.location.href = 'https://www.douban.com/people/149824197/'
          break
        case 'github':
          window.location.href = 'https://github.com/larry-hsu'
          break
        case 'twitter':
          window.location.href = 'https://twitter.com/ConstQu'
          break
        case 'email':
          window.location.href = 'mailto:larry_hsu@yeah.net'
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.foot {
  margin: 80px 10% 20px 10%;
  text-align:center;
  font-size:1rem;
  color:grey;

  & .find-me {
    & div img {
      position: relative;
      width:30px;
      height:30px;
      margin: 20px 10px;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.3s;
      &:hover {
        box-shadow:0 4px 4px #000;
        transform: translateY(-10%)
      }
    }
  }

  & p{
    opacity: 0.8;
    height:25px;
    line-height: 30px;
  }
  @media screen and (max-width: 900px) {
    font-size:14px;
  }
}
</style>
