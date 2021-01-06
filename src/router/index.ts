import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'


Vue.use(VueRouter)



const routes: Array<RouteConfig> = [
 {
   path:"/",
   redirect:"/home"
 },
 {
   path:"/home",
  name:'Home',
  component: ()=> import ('../components/home/Home.vue')
 },
{
  path:"/category",
  name:"Category",
  component: ()=> import ('../components/category/Category.vue')
},
{
  path:"/shopcart",
  name:"Shopcart",
  component: ()=> import ('../components/shopcart/Shopcart.vue')
},
{
  path:"/user",
  name:"User",
  component: ()=> import ('../components/user/User.vue')
},
]

const router = new VueRouter({
  routes,
  mode:'history',
  linkActiveClass:"jupiter"
})

router.beforeEach((to,from,next)=>{
  //如何获取到路由对应的组件？
  // console.log(router);
  
  next()
})




export default router
