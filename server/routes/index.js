/**
 * 路由汇总文件
 */
const router = require('koa-router')()

// const users = require('./users')
const api = require('./api')
// const sign = require('./sign')
// const archives = require('./archives')
// const article = require('./article');
const pages = require('./pages');



/**
 * ctx的所有属性
 * {
    request, response, app, req, res, originalUrl, state,
    render, matched, router, _matchedRoute, captures,
    params, routerName, onerror, inspect, toJSON, assert, 
    throw, cookies, attachment, redirect, remove, vary, 
    has, set, append,flushHeaders, status, message, body, 
    length, type, lastModified, etag, headerSent, writable, 
    acceptsLanguages, acceptsEncodings, acceptsCharsets, 
    accepts, get, is, querystring, idempotent, socket, 
    search, method, query, path, url, accept, origin, href,
    subdomains, protocol, host, hostname, URL, header, headers, 
    secure, stale, fresh, ips, ip,
  }
 */

/* GET home page. */
router.get('/', async (ctx, next) => {
  ctx.redirect('/pages/1');
});

// router.use(users.routes(), users.allowedMethods())
router.use(api.routes(), api.allowedMethods())
// router.use(sign.routes(), sign.allowedMethods())
// router.use(archives.routes(), archives.allowedMethods())
// router.use(article.routes(), article.allowedMethods())
router.use(pages.routes(), pages.allowedMethods())

module.exports = router
