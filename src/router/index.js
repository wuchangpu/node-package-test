import Vue from 'vue'
// import store from '@/store'
import Router from 'vue-router'



/* Layout */
// import Layout from '@/views/layout';

/* modules */
// import aModuleRoutes from './modules/aModuleRoutes'

Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
    },
    {
      path: '/mathJax',
      name: 'MathJax',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ '@/views/MathJax.vue')
    },
		// aModuleRoutes,
  ]
})

// const whiteList = ['/home/login', '/autoLogin'] // 不重定向白名单
// router.beforeEach((to, from, next) => {
// 	console.log('store.state.common.userInfo',store.state.common.userInfo)
// 	if(store.state.common.userInfo){
// 		if(to.path === '/home/login'){
// 			next({ path: '/home/index' });
// 		} else {
// 			next();
// 		}
// 	} else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
// 			Vue.prototype.$toast('请登录');
// 			next({ path: '/home/login' });	// 手动登录
//     }
// 	}
// })

export default router;
