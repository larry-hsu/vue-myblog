<template>
  <div>
    <p class='mem'>苏ICP备20008705号</p>
    <p>Designed and developed by Larry Hsu.</p>
    <p>Copyright © 2018-2020 larryhsu.com. All Rights Reserved.</p>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="less" scoped>
div {
  margin: 30px 10%;
  text-align:center;
  font-size:1rem;
  & .mem {
    color:grey;
    margin-bottom:10px;
  }
  & p{
    opacity: 0.8;
    height:25px;
  }
  @media screen and (max-width: 900px) {
    font-size:14px;
  }
}
</style>
