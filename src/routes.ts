import type { RouteRecordRaw } from 'vue-router'

// Les routes, à part de main.ts pour que les tests montent le même routeur que le site.
export const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./views/HomeView.vue') },
  { path: '/404', component: () => import('./views/NotFoundView.vue') },
  { path: '/:slug', component: () => import('./views/GameView.vue'), props: true },
  { path: '/:pathMatch(.*)*', component: () => import('./views/NotFoundView.vue') },
]
