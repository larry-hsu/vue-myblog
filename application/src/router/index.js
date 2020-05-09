import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import myCookie from '../../utils/CookieUtil'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: "Larry·hsu's Blog"
    },
    component: Home
  },
  {
    path: '/archives',
    name: 'Archives',
    meta: {
      title: 'Blog Archives'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Archives.vue')
  },
  {
    path: '/articles/:id',
    name: 'Article',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Article.vue')
  },
  {
    path: '/sign/signIn',
    name: 'sign',
    meta: {
      title: 'login'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/Sign.vue')
  },
  {
    path: '/users/my',
    meta: {
      requireAuth: true,
      title: '个人中心'
    },
    name: 'users',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/Users.vue')
  },
  {
    path: '/users/MyPosts',
    meta: {
      requireAuth: true,
      title: '发表的文章'
    },
    name: 'MyPosts',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/MyPosts.vue')
  },
  {
    path: '/users/all',
    meta: {
      requireAuth: true,
      title: '管理所有用户'
    },
    name: 'all',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/AllUser.vue')
  },
  {
    path: '/users/editdata',
    meta: {
      requireAuth: true,
      title: '编辑文章'
    },
    name: 'all',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/EditData.vue')
  },
  {
    path: '/users/writepost',
    meta: {
      requireAuth: true,
      title: '写文章'
    },
    name: 'writepost',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/WritePost.vue')
  },
  {
    path: '/users/editpost/:postId',
    meta: {
      requireAuth: true,
      title: '编辑文章'
    },
    name: 'editpost',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/EditPost.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    window.document.title = to.meta.title
  }
  if (to.meta.requireAuth) {
    const token = myCookie.get('token')
    if (token && token !== 'null') {
      next()
    } else {
      next('/sign/signIn')
    }
  } else {
    next()
  }
})

export default router
