import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',name: 'index',component: () => import('../views/blogIndex.vue'),
    children:[
      { path:'/', component:()=>import('../views/articleList.vue')},
      { path: '/infoArticle/:articleid', component:() => import('../views/infoArticle.vue') },
      { path:'/picture',component:() => import('../views/pictureGroup.vue')},
      { path:'/assort/',component:()=>import('../views/assortArticleList.vue')}
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
