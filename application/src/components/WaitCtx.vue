<template>
  <div class='wait-ctx'>
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaitCtx'
}
</script>

<style lang="less" scoped>
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

.wait-ctx {
  width:100%;
  height:500px;
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
</style>
