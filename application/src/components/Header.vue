<template>
  <header>
    <div class='triangle' @click='signIn'></div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    signIn: function () {
      this.$router.push('/sign/signIn')
    }
  }
}
</script>

<style lang="less" scoped>
header {
  position: relative;
  margin:0;
  background-color:black;
  height:5px;
  @media screen and (max-width: 900px){
    display: none;
  }
  & .triangle {
    position: fixed;
    top:0;
    right: 40px;
    height: 10px;
    width:0px;
    border:10px solid transparent;
    border-right-color: black;
    border-top-color: black;
    border-left-color:black;
    cursor:pointer;
    transition: height 0.3s;
    &:hover{
      height:26px;
    }
  }
}
</style>
