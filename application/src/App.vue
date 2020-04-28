<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>
</template>

<style lang="less">
* {
  margin:0;
  padding:0;
}

[v-cloak] {
  display: none;
}

#app {
  background: #eee;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
