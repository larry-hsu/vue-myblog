<template>
  <div>
    <AdminHeader
      :lisInfo='lisInfo'
      :right='rightInfo'
      @save='handleSave'
    >
    </AdminHeader>
    <section>
      <div class='editdata'>
        <div class='field'>
          <span class='h3'> 笔名 </span>
          <div class='field-content '>
            <input
              type='text'
              v-model='nickname'
              @focus="handleFocus"
              maxLength='10'>
          </div>
        </div>
         <div class='field'>
          <span class='h3'> 个性签名 </span>
          <div class='field-content '>
            <input
              type='text'
              v-model='signature'
              maxLength='50'
              @focus="handleFocus">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminHeader from '@/components/admin/AdminHeader.vue'
import axios from '../../../utils/axios'
import { myAjax } from '../../../utils/syncajax'

export default {
  name: 'EditData',
  components: {
    AdminHeader
  },
  data () {
    return {
      lisInfo: [['/users/my', '首页']],
      rightInfo: ['/users/my', '返回'],
      user: {},
      nickname: '',
      signature: '',
      hasEdit: 0
    }
  },
  methods: {
    getUserInfo: async function () {
      var res = await axios.get('/api/user/info')
      this.user = res
      this.getNicknameAndSignature()
    },
    getNicknameAndSignature: async function () {
      var postData = {
        id: this.user.id
      }
      var nickname = await myAjax.post('/api/user/nickname', postData)
      var signature = await myAjax.post('/api/user/signature', postData)

      this.nickname = nickname
      this.signature = signature
    },
    handleSave: async function () {
      var postData = {
        id: this.user.id,
        nickname: this.nickname,
        signature: this.signature
      }
      var res = await myAjax.post('/api/user/editdata', postData)
      alert(res)
      setTimeout(() => {
        this.$router.push('/users/my')
      }, 500)
    },
    handleFocus: function () {
      this.hasEdit = 1
    }
  },
  mounted () {
    this.getUserInfo()
  },
  watch: {
    hasEdit: function () {
      this.rightInfo = ['javascript:void(0)', '保存']
    }
  }
}
</script>

<style lang='less' scoped>
@boxShadow:{
  box-shadow:0 0 2px #000;
}

input[type='text'] {
  font-size:16px;
  width:100%;
  height:32px;
  padding-left: 10px;
}

section {
  position: relative;
  margin-top: 100px;

  & .editdata {
    width: 60%;
    margin: 0 auto;
    min-height: 40px;
    font-size: 1rem;
    line-height: 2.5;
    border-radius: 5px;
    padding: 0px 20px;
    background-color: white;
    @boxShadow();

    & .field {
      padding:30px 2px;
      border-bottom:1px dashed rgba(0, 0, 0, 0.1);

      & .h3 {
        display: inline-block;
        font-size:18px;
        opacity:0.8;
        width:200px;
      }

      & .field-content {
        display: inline-block;
        width:60%;
      }
    }
  }
}

</style>
