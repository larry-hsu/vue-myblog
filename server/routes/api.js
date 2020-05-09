const router = require('koa-router')();
const Article = require('../models/article');
const myPolice = require('../models/police')
const Time = require('./utils/fomatTime');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('./utils/config')
const util = require('util');
const verify = util.promisify(jwt.verify);
const crypto = require('crypto');

router.prefix('/api');

router.get('/pages/:pages', async (ctx, next) => {
  let articles = new Article();
  const pageNum = 5;

  let page = ctx.params.pages;

  let result = await articles.getAll();

  let len = result.length;
  for (let i = 0; i < len; i++) {
    tmp = result[i].postTime;
    result[i].postTime = Time.getFormatTime(tmp);
    result[i].content = result[i].content.slice(0, 300);
  }

  if (page * pageNum <= len) {
    // slice包含开头不包含结尾
    result = result.slice(pageNum * (page - 1), pageNum * page);
  } else {
    result = result.slice(pageNum * (page - 1));
  }

  ctx.body = JSON.stringify(result);
});

// 获取li个数数供给ajax调用
router.get('/artCnt', async (ctx, next) => {
  let articles = new Article();
  let result = await articles.getAll();
  const len = result.length;
  const eachPageNum = 5;
  const total = Math.ceil(len / eachPageNum).toString();
  ctx.body = total;
});

router.get('/total', async (ctx, next) => {
  let article = new Article();
  let result = await article.getAll();
  ctx.body = result.length;
});

// archives page
router.get('/archives', async (ctx, next) => {
  var article = new Article();
  var res = await article.getAll();

  var archives = [];
  for (let i=0; i<res.length; i++) {
    var id = res[i].id;
    var time = Time.getLastDate(res[i].postTime);
    var year = time.substr(0, 4);
    var title = res[i].articleName;
    var timeTitle = time.substr(5) + ' ' + title;
    archives.push([id, year, timeTitle])
  }

  ctx.body = JSON.stringify(archives);
});

// 浏览文章
router.get(`/articles/:articleId`, async (ctx, next) => {
  //要使用req.params获得路径中的参数
  let id = Number(ctx.params.articleId);
  let article = new Article(id);
  let rows = await article.get();
  ctx.body = JSON.stringify(rows[0]);
});

// 删除文章
router.post('/article/delete', async (ctx, next) => {
  var id = ctx.request.body.id;
  var article = new Article();
  article.id = id;
  try {
    await article.delete();
    ctx.body = 'success';
  } catch (err) {
    ctx.body = 'error';
  }
})

router.post('/sign/signIn', async (ctx, next) => {
  let postData = ctx.request.body;

  let res = await myPolice.checkLogin(postData);

  if (res.status) {
    ctx.body = res;
  } else {
    let user = {
      id: res.data.id,
      admin: res.data.admin
    }
    //使用jwt加密
    let token = jwt.sign(user, config.tokenSecret);
    ctx.body = {
      status: res.status,
      message: res.message,
      data: {
        token
      }
    }
  }
});


// 后台所有的操作都是基于user的id，没有user的id就不能判断是谁在操作
router.get('/user/info', async (ctx, next) => {
  try {
    const token = ctx.request.headers['authorization'];
    if (token) {
      try {
        let user = await verify(token.split(' ')[1], config.tokenSecret);
        ctx.body = user;
      } catch (err) {
        console.log('token verify fail: ', err)
      }
    }
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        success: 0,
        message: '认证失败'
      };
    } else {
      err.status = 404;
      ctx.body = {
        success: 0,
        message: '404'
      };
    }
  }
});

router.post('/user/nickname', async (ctx, next) => {
  var postData = ctx.request.body;
  var user = new User();
  user.id = postData.id;
  var row = await user.getById();
  ctx.body = row[0].nickname;
});

router.post('/user/signature', async (ctx, next) => {
  var postData = ctx.request.body;
  var user = new User();
  user.id = postData.id;
  var row = await user.getById();
  ctx.body = row[0].signature;
})

router.get('/allposts', async (ctx, next) => {
  var post = new Article();
  var res = await post.getAll();
  for (let i=0; i<res.length; i++) {
    // 减小传输体积，因为用不到Content所以置空
    res[i].content = ''; 
  }
  ctx.body = JSON.stringify(res);
});

router.post('/myposts', async (ctx, next) => {
  var post = new Article();
  post.author = ctx.request.body.author;
  var res = await post.getArticleByAuthor();
  for (let i=0; i<res.length; i++) {
    // 减小传输体积，因为用不到Content所以置空
    res[i].content = ''; 
  }
  ctx.body = JSON.stringify(res);
});

router.get('/user/allusers', async (ctx, next) => {
  var user = new User();
  var res = await user.getAllUser();
  ctx.body = JSON.stringify(res);
});

router.post('/user/reset', async (ctx, next) => {
  var id = ctx.request.body.id;
  var user = new User();
  user.id = id;
  var md5 = crypto.createHash('md5');
  user.password = md5.update('123456').digest('base64');
  try {
    await user.resetPassword();
    ctx.body = 'success'
  } catch (err) {
    ctx.body = 'error'
  }
});

// 是否需要验证token?
router.post('/user/delete', async (ctx, next) => {
  var id = ctx.request.body.id;
  var user = new User();
  user.id = id;
  try {
    await user.delete();
    ctx.body = 'success';
  } catch (err) {
    ctx.body = 'error'
  }
});

// 修改个性签名和笔名, 改了nickname之后，article里面的笔名也要修改
router.post('/user/editdata', async (ctx, next) => {
  var postData = ctx.request.body;
  var user = new User();
  user.id = postData.id;
  user.nickname = postData.nickname;
  user.signature = postData.signature;

  try {
    // 更新下签名，没有什么关系
    await user.updateSign();
    var res = await user.checkNickName();
    if (res !== 0) {
      ctx.body = 'this nickname is already been used';
      return;
    } else {
      var rows = await user.getById();
      var oldNickname = rows[0].nickname;
      // 更新文章中的笔名
      let article = new Article();
      article.oldAuthor = oldNickname;
      article.author = user.nickname;
      // 更新文章中的笔名
      await article.updateAuthor();
      // 再更新用户表中的笔名
      await user.updatedNickname();
      ctx.body = 'success';
    }
  } catch (err) {
    ctx.body = 'error';
  }
});

// 保存文章
router.post('/article/savepost', async (ctx, next) => {
  var postData = ctx.request.body;

  var art = new Article();
  art.author = postData.author;
  art.title = postData.title;
  art.content = postData.content;

  try {
    await art.save();
    ctx.body = 'success';
  } catch {
    ctx.body = 'something bad happened';
  }
});

// 更新文章
router.post('/article/updatepost', async (ctx, next) => {
  var errors = [];

  var postData = ctx.request.body;

  var art = new Article();
  art.id = postData.id;
  art.title = postData.title;
  art.content = postData.content;
  art.author = postData.author;

  // 如果更新了内容
  if (postData.content) {
    try {
      await art.updateContent();
    } catch (err) {
      errors.push('update content failed');
    }
  }

  // 标题和作者就每次更新下吧
  try {
    await art.updateTitleAndAuthor ();
  } catch (err) {
    errors.push('update Title or author failed');
  }

  if (errors.length) {
    ctx.body = errors.join(' ');
  } else {
    ctx.body = 'success';
  }

})

// 获取文章
router.post('/article/postInfo', async (ctx, next) => {
  var postData = ctx.request.body;
  var art = new Article();
  art.id = postData.id;
  var rows = await art.get();
  ctx.body = JSON.stringify(rows[0]);
})

module.exports = router;