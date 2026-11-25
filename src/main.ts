import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './routes'

export const createApp = ViteSSG(App, {
  routes,
  // À chaque changement de page : retour en haut.
  scrollBehavior: () => ({ top: 0 }),
})
