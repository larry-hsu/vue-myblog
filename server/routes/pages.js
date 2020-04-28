const router = require('koa-router')()
const Article = require('../models/article');
const Time = require('./utils/fomatTime');

router.prefix('/pages');

router.get('/:pages', async (ctx, next) => {
  let articles = new Article();
  const pageNum = 5;

  let page = ctx.params.pages;

  let result = await articles.getAll();

  let len = result.length;
  for (let i = 0; i < len; i++) {
    tmp = result[i].postTime;
    result[i].postTime = Time.getFormatTime(tmp);
  }

  if (page * pageNum <= len) {
    // slice包含开头不包含结尾
    result = result.slice(pageNum * (page - 1), pageNum * page);
  } else {
    result = result.slice(pageNum * (page - 1));
  }

  ctx.body = JSON.stringify(result);
});

module.exports = router;