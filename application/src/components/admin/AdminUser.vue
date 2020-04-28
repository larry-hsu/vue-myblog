<template>
  <div class='user'>
    <div class='top'>
      <span class='username'>
        用户名：
        <span :class='{root: user.admin === 3}'>
          {{ user.username }}
        </span>
      </span>
      <span class='username'>
        角色：
        <span :class='{root: user.admin === 3}'>
          {{ role }}
        </span>
      </span>
    </div>
    <div class='bottom'>
      <span class='reset' @click='handleResetPsd(user.id)'> Reset </span>
      <span class='delete' @click='handleDeleteUser(user.id)'> Delete </span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { myAjax } from '../../../utils/syncajax'

export default {
  name: 'AdminUser',
  props: {
    user: Object
  },
  data () {
    return {
    }
  },
  computed: {
    role: function () {
      if (this.user.admin === 3) {
        return 'root'
      } else {
        return 'member'
      }
    }
  },
  methods: {
    handleResetPsd: async function (id) {
      var confirm = window.confirm('确定重置密码嘛？')
      if (confirm) {
        var postData = {
          id: id
        }
        var res = await myAjax.post('/api/user/reset', postData)
        if (res === 'success') {
          alert('密码已经重置为了123456')
        }
      }
    },

    handleDeleteUser: async function (id) {
      var confirm = window.confirm('确定删除嘛？')
      if (confirm) {
        var postData = {
          id: id
        }
        await myAjax.post('/api/user/delete', postData)
        window.location.reload()
      }
    }
  }
}
</script>

<style lang='less' scoped>
@boxShadow:{
  box-shadow:0 0 2px #000;
}

@CourierNewFont: {
  font-family: 'Courier New', Courier, monospace;
}

@ArialFont: {
  font-family: Arial, Helvetica, sans-serif;
}

@pointer: {
  cursor: pointer;
}

span {
  display: inline-block;
}

.root {
  color: red;
}

.disabled {
  color: grey;
}

.user {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  background:white;
  border-radius: 4px;
  margin:10px 0;
  @boxShadow();
  padding:10px 20px;

  & .top {
    min-height: 40px;
    & .username {
      font-size:18px;
      min-width:180px;
      @CourierNewFont();
    }
    & .role {
      font-size:18px;
      min-width: 160px;
      @CourierNewFont();
    }
  }

  & .bottom {
    & .delete, .reset {
      border: 1px solid grey;
      border-radius: 4px;
      text-align:center;
      line-height: 30px;
      height:30px;
      margin-right:10px;
      transition: background 0.3s;
      font-size:14px;
      @pointer();
      @CourierNewFont();
      padding:0 4px;
      &:hover {
        background: #eee;
      }
    }
  }
}

</style>
