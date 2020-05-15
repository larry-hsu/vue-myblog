<template>
  <div class='post'>
    <p class='title'> {{ post.articleName }} </p>
    <div>
      <span class='xauthor'> {{ post.author }} </span>
      <span class='xtime'> {{ post.postTime.substring(0, 10) }} </span>
      <span class='xalter' @click='handleEdit(post.id)'> Edit </span>
      <span class='xdelete' @click='handleDelete(post.id)'> Delete </span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import myAjax from '../../../utils/syncajax'

export default {
  name: 'AdminPost',
  props: {
    post: Object
  },
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {
    handleDelete: async function (id) {
      var confirm = window.confirm('确定删除嘛？')
      if (confirm) {
        var postData = {
          id: id
        }
        await myAjax.post('/api/article/delete', postData)
        window.location.reload()
      }
    },
    handleEdit: function (id) {
      var url = '/users/editpost/' + id
      this.$router.push(url)
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

span[class^='x'] {
  display: inline-block;
  font-size: 15px;
}

.post {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  background:white;
  border-radius: 4px;
  margin:10px 0;
  @boxShadow();
  padding:10px 20px;

  & .title {
    font-size:20px;
    margin-bottom:5px;
    cursor:auto;
    @ArialFont();
  }

  & div {
    width:100%;
    margin-top:20px;
    & .xtime {
      min-width: 140px;
      font-size:16px;
      @CourierNewFont();
    }

    & .xauthor {
      font-size:16px;
      min-width: 100px;
      margin-right:10px;
      @CourierNewFont();
    }

    & .xalter, .xdelete{
      font-size:14px;
      border: 1px solid grey;
      border-radius: 4px;
      text-align:center;
      line-height: 30px;
      height:30px;
      min-width: 50px;
      padding:0 10px;
      margin-right:20px;
      cursor:pointer;
      transition: background 0.3s;
      @CourierNewFont();

      &:hover {
        background: #eee;
      }
    }
  }
}

</style>
