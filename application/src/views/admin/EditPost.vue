<template>
  <div>
    <AdminHeader
      :lisInfo='lisInfo'
      :right='rightInfo'
      @save='handleSave'
    >
    </AdminHeader>
    <section>
      <input
        class='title'
        type='text'
        placeholder='请输入标题(最多50个字)'
        @focus="handleFocus"
        v-model='oldTitle'
        maxlength='50'
      >
      <input
        class='author'
        type='text'
        placeholder='作者'
        @focus="handleFocus"
        v-model='author'
        v-if='admin===3'
        maxlength="30"
      >
      <div class='uploadMdFile'>
        <div class='upload'>
          <span @click='handleUploadMdFile'>上传修改后的md文件</span>
          文件名：<span> {{ oldFilename }} </span>
          <label style='display:none'>
            <input
              ref='uploadMdFile'
              type='file'
              @change="getFile"
            >
          </label>
        </div>
        <div class='category'>
          类别：
          <select v-model='oldCate'>
            <option
              v-for='(item, index) in category'
              :key='index'
            >
              {{ item }}
            </option>
          </select>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminHeader from '@/components/admin/AdminHeader.vue'
import myAjax from '../../../utils/syncajax'
import axios from '../../../utils/axios'

export default {
  name: 'WritePost',
  components: {
    AdminHeader
  },
  data () {
    return {
      lisInfo: [['/users/my', '首页']],
      rightInfo: ['/users/MyPosts', '返回'],
      hasEdit: 0,
      oldFilename: '还未选择文件',
      oldMdContent: '',
      oldTitle: '',
      newMdContent: '',
      admin: '',
      author: '',
      oldCate: '',
      category: []
    }
  },
  methods: {
    async getUserInfo () {
      // 自己封装的axios会将token添加到http头信息中
      // 后面的操作都是基于获取到的用户的权限
      var res = await axios.get('/api/user/info')
      this.admin = res.admin
      this.getPostInfo()
    },
    async getPostInfo () {
      // 获取params中的id
      var res = await myAjax.post('/api/article/postInfo', {
        id: this.$route.params.postId
      })
      res = JSON.parse(res)
      this.oldTitle = res.articleName
      this.oldFilename = this.oldTitle + '.md'
      this.oldCate = res.category
      // console.log(res.category)
      this.author = res.author

      // 获取分类
      var cate = await myAjax.get('/api/archives/category')
      this.category = JSON.parse(cate)
    },
    handleUploadMdFile () {
      this.$refs.uploadMdFile.click()
      this.hasEdit = 1
    },
    getFile (e) {
      // 获取上传的md文件
      var fname = e.target.value
      if (!/\.md$/.test(fname)) {
        alert('不是md文件哦')
      } else {
        this.oldFilename = fname
        var fileselect = e.target.files[0]
        var reader = new FileReader()
        if (typeof reader === 'undefined') {
          alert('您的浏览器不支持FileReader接口')
        }
        reader.readAsText(fileselect, 'utf-8')
        reader.onload = () => {
          this.newMdContent = reader.result
          this.oldMdContent = this.newMdContent
        }
      }
    },
    handleFocus () {
      this.hasEdit = 1
    },
    async handleSave () {
      if (!this.oldTitle) {
        alert('you need to write something')
      } else if (this.admin === 3 && !this.author) {
        alert('need author')
      } else {
        var postData = {
          id: this.$route.params.postId,
          title: this.oldTitle,
          content: this.newMdContent,
          author: this.author,
          category: this.oldCate
        }

        var res = await myAjax.post('/api/article/updatePost', postData)
        alert(res)
        if (res === 'success') {
          this.$router.push('/users/MyPosts')
        }
      }
    }
  },
  watch: {
    hasEdit: function () {
      this.rightInfo = ['javascript:void(0)', '保存']
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
@boxShadow:{
  box-shadow:0 0 2px #000;
}
@pointer: {
  cursor: pointer;
}

@ArialFont: {
    font-family: Arial, Helvetica, sans-serif;
}

@CourierNewFont: {
  font-family: 'Courier New', Courier, monospace;
}

section {
  width: 60%;
  margin:100px auto;
  background:white;
  padding:20px;
  @boxShadow();

  & .pic{
    position: relative;
    height: 230px;
    width: 100%;
    background-color: #f6f6f6;
    margin-bottom: 10px;
    @pointer();

    & img {
      width: 100%;
      height: 100%;
    }

    & .addPic {
      position: absolute;
      border:1px solid grey;
      color: grey;
      max-width:100px;
      text-align: center;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
    }
  }

  & .uploadMdFile {
    color:grey;
    display:flex;
    justify-content: space-between;
    align-items: center;
    & .upload {
      & span:nth-child(1) {
        display: inline-block;
        border-bottom: 1px solid grey;
        @pointer();
        margin-right:20px;
      }

      & span:nth-child(2) {
        font-size:14px;
      }
    }

    & .category {
      min-width:80px;
      outline:none;
    }
  }

  & input{
    .inputOfSth(@height:30px, @fontSize:16px){
      width: 100%;
      height: @height;
      font-size: @fontSize;
      margin: 0;
      padding: 0;
      margin-bottom: 10px;
      border: none;
      outline: none;
    }

    &.title{
      .inputOfSth(50px, 30px);
      font-weight: bold;
    }

    &.author{
      .inputOfSth();
      color: grey;
    }
  }
}
</style>
