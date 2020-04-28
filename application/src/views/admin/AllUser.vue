<template>
  <div>
    <AdminHeader :lisInfo='lisInfo'></AdminHeader>
    <section>
      <div class='user-number'> {{ allUsers.length }} 位用户 </div>
      <template v-for='(user, index) in allUsers'>
        <AdminUser :user='user' :key='index'></AdminUser>
      </template>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminHeader from '@/components/admin/AdminHeader.vue'
import AdminUser from '@/components/admin/AdminUser.vue'
import axios from '../../../utils/axios'
import { myAjax } from '../../../utils/syncajax'

export default {
  name: 'User',
  components: {
    AdminHeader,
    AdminUser
  },
  data () {
    return {
      lisInfo: [['/users/my', '首页'],
        ['/users/MyPosts', '文章']
      ],
      rightInfo: ['/users/write', '写文章'],
      user: {},
      allUsers: []
    }
  },
  methods: {
    getUserInfo: async function () {
      // 自己封装的axios会将token添加到http头信息中
      // 后面的操作都是基于获取到的用户的权限
      var res = await axios.get('/api/user/info')
      this.user = res
      this.getLisInfo()
    },
    getLisInfo: function () {
      if (this.user.admin === 3) {
        this.lisInfo.splice(2, 0, ['/users/all', '用户'])
        this.getUsers()
      }
    },
    getUsers: async function () {
      // 只有管理员才能管理用户
      var res = await myAjax.get('/api/user/allusers')
      res = JSON.parse(res)
      this.allUsers = res
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
section {
  width: 60%;
  margin:100px auto;

  & .user-number {
    font-size:20px;
    height:50px;
    line-height: 50px;
    border-bottom:1px dashed grey;
  }
}
</style>
