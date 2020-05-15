<template>
  <div>
    <AdminHeader :lisInfo='lisInfo' :right='rightInfo'></AdminHeader>
    <section>
      <div class='tip'>
        您好，您的笔名为 {{ nickname }}。不满意的话可以点击右上角编辑资料修改哦！
        <p class='signature'>
          {{ signature }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminHeader from '@/components/admin/AdminHeader.vue'
import axios from '../../../utils/axios'
import myAjax from '../../../utils/syncajax'

export default {
  name: 'Users',
  components: {
    AdminHeader
  },
  data () {
    return {
      lisInfo: [['/users/my', '首页'],
        ['/users/MyPosts', '文章']
      ],
      rightInfo: ['/users/editdata', '编辑资料'],
      id: 0,
      admin: 0,
      nickname: '',
      signature: ''
    }
  },
  computed: {
  },
  methods: {
    getUserInfo: async function () {
      var res = await axios.get('/api/user/info')
      this.id = res.id
      this.admin = res.admin
      this.getLisInfo()
      this.getNicknameAndSignature()
    },
    getLisInfo: function () {
      if (this.admin === 3) {
        this.lisInfo.splice(2, 0, ['/users/all', '用户'])
      }
    },
    getNicknameAndSignature: async function () {
      var postData = {
        id: this.id
      }
      var nickname = await myAjax.post('/api/user/nickname', postData)
      var signature = await myAjax.post('/api/user/signature', postData)

      this.nickname = nickname
      this.signature = signature
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
section {
  @boxShadow:{
    box-shadow:0 0 2px #000;
  }

  position: relative;
  margin-top: 100px;

  & .tip {
    width: 60%;
    margin: 0 auto;
    min-height: 40px;
    font-size: 1rem;
    line-height: 2.5;
    border-radius: 5px;
    padding-left: 10px;
    background-color: white;
    @boxShadow();

    & .signature {
      text-align: right;
      &::before {
        content:'——'
      }
    }
  }
}

</style>
