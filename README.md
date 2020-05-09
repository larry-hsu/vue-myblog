预览地址： [https://www.larryhsu.com](https://www.larryhsu.com)

## 技术栈

前端：vue2 + vuex + vuecli + vue router + ES6/7 + less + axios + nginx

后端：koa2

## 项目运行

#### 源码地址:  [https://github.com/larry-hsu/vue-myblog](https://github.com/larry-hsu/vue-myblog) 

#### 如何运行

这个博客可能需要一些数据才能进行更好的展示：websites.sql 为数据库文件需要导入到你的数据中。发表博客采用上传md文件的方式，vue引用了marked模块用来处理md文档的展示，使用了highlight.js高亮代码。

运行前请先安装`nodejs`

`clone`项目到本地

```shell
git clone https://github.com/larry-hsu/vue-myblog.git
```

后端运行

```shell
cd vue-myblog/server
npm install或者cnpm install
npm start
```

前端运行

```shell
cd vue-myblog/application
npm install或者cnpm install
npm run serve
```

为了确保运行正确，请先运行后端服务。再运行前端，之后访问 http://localhost:8080

## 组件

根据首页的各模块的功能不同，划分出了多个组件。各个vue文件说明如下：

```shell
/src/views目录下：
├── Home.vue  // 首页
│ 
├── Archives.vue  // 归档页
│   
├── Article  // 文章内容页
│   
└── admin/  // 后台文件夹
   ├── Sign.vue  // 登陆
   ├── EditData.vue  // 编辑个人资料
   ├── EditPost.vue  // 编辑文章
   ├── MyPosts.vue  // 用户发表的文章
   ├── AllUser.vue  // 管理员管理用户
   ├── WritePost.vue  // 写文章
   └── Users.vue  // 个人中心

/src/components目录下：
├── BackToTop.vue  // 返回顶部组件
│   
├── Footer  // 页脚组件
│   
├── Header  // 页头组件
│   
├── Post.vue  // 文章组件
│
├── PageIndex  // 文章分页组件
│
└── admin/  // 后台用到的组件
   ├── AdminHeader  // 后台页头组件
   ├── AdminPost.vue  // 后台管理文章用到的组件
   └── AdminUser.vue  // 后台管理用户用到的组件
```

## 状态管理

目前的状态管理采用`vuex`。只用在了一个地方，那就是文章的分页功能，用来记住当前所在的页面，根据这个数据去渲染底部的分页导航的样式

## 样式

样式文件使用的是`less`，暂未使用任何`vue`现成的UI组件。

#### 后端发布

后端采用`pm2`做项目管理

安装`pm2`

```shell
npm install pm2 -g
```

```
cd vue-myblog && npm install 
pm2 start bin/www
```

#### 前端发布

```
npm run build
```

配置nginx服务器。

   ```
   location / {
     root 你的dist文件夹所在的位置
     index index.html;
     try_files $uri $uri/ /index.html;
   }

   location /api {
       proxy_pass  http://127.0.0.1; # 从3000端口拿数据
   }
   ```

## 总结

目前主要功能都已经完成的差不多。基本可以作为一个轻量的博客网站。