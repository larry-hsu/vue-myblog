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
        v-model='title'
        maxlength="50"
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
          <span @click='handleUploadMdFile'>上传md文件</span>
          文件名：<span> {{ filename }} </span>
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
          <select @change='handleSelect'>
            <option>choose</option>
            <option v-for='(item, index) in category' :key='index'>
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
      filename: '还未选择文件',
      mdContent: '',
      title: '',
      userId: '',
      author: '',
      admin: '',
      category: [],
      selCate: 'choose'
    }
  },
  methods: {
    async getUserInfo () {
      // 自己封装的axios会将token添加到http头信息中
      // 后面的操作都是基于获取到的用户的权限
      var res = await axios.get('/api/user/info')
      this.userId = res.id
      this.admin = res.admin
      var postData = { id: this.userId }
      var nickname = await myAjax.post('/api/user/nickname', postData)
      this.author = nickname
      // 获取分类
      var cate = await myAjax.get('/api/archives/category')
      this.category = JSON.parse(cate)
    },
    handleUploadMdFile () {
      this.$refs.uploadMdFile.click()
    },
    getFile: function (e) {
      var filename = e.target.value
      if (!/\.md$/.test(filename)) {
        alert('不是md文件哦')
      } else {
        this.filename = filename
        var fileselect = e.target.files[0]
        var reader = new FileReader()
        if (typeof reader === 'undefined') {
          alert('您的浏览器不支持FileReader接口')
        }
        reader.readAsText(fileselect, 'utf-8')
        reader.onload = () => {
          this.mdContent = reader.result
        }
      }
    },
    handleFocus: function () {
      this.hasEdit = 1
    },
    handleSelect (e) {
      this.selCate = e.target.value
    },
    handleSave: async function () {
      if (!this.title) {
        alert('you need to write somethings')
      } else if (this.admin === 3 && !this.author) {
        alert('need author!')
      } else if (!this.mdContent) {
        alert('you need to upload a markdown file')
      } else if (this.selCate === 'choose') {
        alert('you need to choose a categroy')
      } else {
        var postData = {
          id: this.userId,
          title: this.title,
          content: this.mdContent,
          author: this.author,
          category: this.selCate
        }

        var res = await myAjax.post('/api/article/savepost', postData)
        alert(res)
        this.$router.push('/users/MyPosts')
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
      & select {
        min-width: 80px;
        outline:none;
      }
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
      color:grey;
    }
  }
}
</style>
