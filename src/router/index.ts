import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import EditorRouter from '../views/Editor.vue'
import LogIn from "@/views/LogIn.vue";
import config from "../../projectConfig";
import Register from "@/views/Register.vue";
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: EditorRouter
  },
  {
    path: '/login',
    name: 'Login',
    component: LogIn
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "projects" */ '../views/Projects.vue')
  },
  {
    path: '/editor',
    name: 'Editor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "projects" */ '../views/Editor.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  let res = { status: 200 }
  try {
    res = await fetch(config.codeExecServiceUrl + '/isAuthenticated', {
      credentials: "include",
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
    console.log('sss')
  } catch (e) {
    console.log('www')
    res.status = 401
  }
  console.log(res)
  if (res.status !== 200 && !['Register', 'Login'].includes(to.name || '')) {
    next({ name: 'Login' })
  }
  next()
})

export default router
