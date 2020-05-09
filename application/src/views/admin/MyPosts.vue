<template>
  <div>
    <AdminHeader :lisInfo='lisInfo' :right='rightInfo'></AdminHeader>
    <section>
      <div class='post-number'> {{posts.length}} 篇文章</div>
      <template v-for='(post, index) in posts'>
        <AdminPost :post='post' :key='index'></AdminPost>
      </template>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminHeader from '@/components/admin/AdminHeader.vue'
import AdminPost from '@/components/admin/AdminPost.vue'
import axios from '../../../utils/axios'
import { myAjax } from '../../../utils/syncajax'

export default {
  name: 'Users',
  components: {
    AdminHeader,
    AdminPost
  },
  data () {
    return {
      lisInfo: [['/users/my', '首页'],
        ['/users/MyPosts', '文章']
      ],
      rightInfo: ['/users/writepost', '写文章'],
      user: {},
      posts: []
    }
  },
  computed: {
  },
  methods: {
    getUserInfo: async function () {
      // 自己封装的axios会将token添加到http头信息中
      // 后面的操作都是基于获取到的用户的权限
      var res = await axios.get('/api/user/info')
      this.user = res
      var postData = { id: this.user.id }
      var nickname = await myAjax.post('/api/user/nickname', postData)
      this.getLisInfo()
      this.getPosts(nickname)
    },
    getLisInfo: function () {
      if (this.user.admin === 3) {
        this.lisInfo.splice(2, 0, ['/users/all', '用户'])
      }
    },
    getPosts: async function (nickname) {
      if (this.user.admin === 3) {
        // 管理员获取所有的文章
        // 也可以使用axios获取
        var res = await myAjax.get('/api/allposts')
        res = JSON.parse(res)
        this.posts = res
      } else {
        // 普通用户获取自己的文章
        var postData = { author: nickname }
        var ress = await myAjax.post('/api/myposts', postData)
        ress = JSON.parse(ress)
        this.posts = ress
      }
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

  & .post-number {
    font-size:20px;
    height:50px;
    line-height: 50px;
    border-bottom:1px dashed grey;
  }
}
</style>
