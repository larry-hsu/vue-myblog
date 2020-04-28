<template>
  <header>
    <div class='left'>
      <span @click='toSpecificLocation("/")'> Larry's blog </span>
      <ul>
        <template v-for='(item, index) in lisInfo'>
          <li
            :class="{on: item[0]===currPath}"
            @click='toSpecificLocation(item[0])'
            :key='index'
            >
            {{ item[1] }}
          </li>
        </template>
        <li v-if='showSignOut' @click='signOut'> 登出 </li>
      </ul>
    </div>
    <div class='right' v-if='right'>
      <input
        class='btn'
        type='button'
        :value='right[1]'
        @click="handleClick(right[0], right[1])"
      >
    </div>
  </header>
</template>

<script>
// @ is an alias to /src
import myCookie from '../../../utils/CookieUtil'

export default {
  name: 'AdminHeader',
  props: {
    lisInfo: Array,
    right: Array,
    showSignOut: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    currPath: function () {
      return this.$route.path
    }
  },
  methods: {
    signOut: function () {
      myCookie.remove('token', '/')
      this.toSpecificLocation('/sign/signIn')
    },
    handleClick: function (path, msg) {
      if (msg === '保存') {
        this.$emit('save')
      } else {
        this.toSpecificLocation(path)
      }
    },
    toSpecificLocation: function (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang='less' scoped>
@pointer:{
  cursor:pointer;
}

a {
  text-decoration: none;
  color:white;
}

.on {
  background-color: black;
}

header {
  position: fixed;
  top:0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 55px;
  background-color: #313131;
  z-index: 9999;

  & .left {
    position: relative;
    color:white;
    margin-left: 5%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 40%;
    height: 100%;

    & span {
      font-size: 1.6rem;
      margin-right:10px;
    }

    & ul {
      font-size: 1.2rem;
      width: 60%;
      height: 100%;
      justify-content: flex-start;
      display: flex;
      list-style: none;

      & a {
        display: flex;
        margin-left: 4%;
        height: 100%;
        align-items: stretch;
      }

      & li {
        display: flex;
        padding: 4px;
        align-items: center;
        transition: background-color 0.3s;
        @pointer();
        margin: 0 6px;
      }

      & li:hover{
        background-color: black;
      }
    }
  }

  & .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 5%;
    width: 20%;
    height: 55px;

    & .btn{
      outline: none;
      border-radius: 4px;
      padding: 0;
      width: 80px;
      font-size: 16px;
      height: 30px;
      text-align: center;
      background: transparent;
      color: white;
      border: 1px solid white;
      @pointer();
      transition: color 0.1s;
    }

    & .btn:hover{
      color:#0084ff;
      border-color: #0084ff;
    }
  }
}
</style>
