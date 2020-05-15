<template>
  <div>
    <AdminHeader :lisInfo='lisInfo' :showSignOut='false'></AdminHeader>
    <section>
      <div class='tip'>
        <p v-if='errors.length'> {{ errors.join('and') }} </p>
      </div>
      <div class='h1'> 登入 </div>
      <div class='form'>
        <form method='post' @submit="checkForm">
          <label for="username"> 用户名 </label>
          <input v-model='username' type="text" id="username" name="username">
          <br>
          <label for="password"> 口令 </label>
          <input v-model='password' type="password" id="password" name="password">
          <br>
          <div class='submit'>
            <label>  </label>
            <button type="submit"> 登入 </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminHeader from '@/components/admin/AdminHeader.vue'
import myAjax from '../../../utils/syncajax'
import myCookie from '../../../utils/CookieUtil'

export default {
  name: 'Sign',
  components: {
    AdminHeader
  },
  data () {
    return {
      lisInfo: [['/', '首页'],
        ['/sign/signIn', '登入']],
      errors: [],
      username: '',
      password: ''
    }
  },
  computed: {
    token () {
      return myCookie.get('token')
    }
  },
  methods: {
    checkForm: async function (e) {
      e.preventDefault()
      this.errors = []
      if (this.username && this.password) {
        var postData = {
          username: this.username,
          password: this.password
        }
        var res = await myAjax.post('/api/sign/signIn', postData)
        res = JSON.parse(res)
        if (res.status === 1) {
          this.errors.push(res.message)
        } else {
          myCookie.set('token', res.data.token, 1, '/')
          this.$router.push('/users/my')
        }
      }
      if (!this.username) {
        this.errors.push(' Name required ')
      }
      if (!this.password) {
        this.errors.push(' Password required ')
      }
    }
  },
  mounted () {
    /*
      在任何组件内通过 this.$router 访问路由器，
      也可以通过 this.$route 访问当前路由
    */
    // 直接将user的整个信息给了vuex，vuex
    const token = this.token
    if (token && token !== 'null') {
      this.$router.push('/users/my')
    }
  }
}
</script>

<style lang='less' scoped>
@boxShadow:{
  box-shadow:0 0 2px #000;
}

button[type='submit'] {
  border: none;
  outline: none;
  display: inline-block;
  background-color: #3A65B9;
  margin-left: 10px;
  width: 60px;
  color: white;
  height: 30px;
  transition: background-color 0.3s;

  &:hover{
    background-color: rgb(42, 91, 189);
  }
}

input {
  /* 给input设置border-radius一定要先设置border，否则左上角会有阴影 */
  position: relative;
  border: 1px solid #C3C3C3;
  border-radius: 3px;
  width: 300px;
  height: 28px;
  margin-left: 10px;
  padding-left: 10px;
  font-size:1rem;
}

section {
  position: relative;
  margin-top: 100px;
  & .tip {
    height: 30px;
    line-height: 30px;
    margin-bottom:20px;

    & p {
      width: 95%;
      margin: 0 auto;
      min-height: 40px;
      font-size: 1rem;
      line-height: 2.5;
      border-radius: 5px;
      padding-left: 10px;
      background-color:#F2DBDD;
      color: #B0393D;
    }
  }

  & .h1 {
    width: 95%;
    margin: 0 auto;
    font-size:1.6rem;
    font-weight: bold;
    padding-bottom: 20px;
    border-bottom: 1px solid white;
  }

  & .form {
    width: 80%;
    margin: 0 auto;

    & form {
      /* label左对齐的方法 */
      & label {
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-top: 20px;
        font-size:1rem;
      }
      & .submit {
        margin-top: 30px;
        background-color: white;
        width: 100%;
        height: 60px;
        line-height: 60px;
        outline-offset: -4px;
        outline:1px dashed rgba(42, 91, 189, 1);
      }
    }
  }
}

</style>
