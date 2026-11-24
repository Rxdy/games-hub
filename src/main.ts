import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './style.css'

export const createApp = ViteSSG(
  App,
  {
    routes: [
      { path: '/', component: () => import('./views/HomeView.vue') },
      { path: '/404', component: () => import('./views/NotFoundView.vue') },
      { path: '/:slug', component: () => import('./views/GameView.vue'), props: true },
      { path: '/:pathMatch(.*)*', component: () => import('./views/NotFoundView.vue') },
    ],
    // À chaque changement de page : retour en haut.
    scrollBehavior: () => ({ top: 0 }),
  },
)
