import { useHead } from '@unhead/vue'
import { siteUrl } from './data/games'

interface PageHead {
  title: string
  description: string
  path: string
  noindex?: boolean
}

/** Titre, description, lien canonique et aperçu de partage de la page courante. */
export function usePageHead({ title, description, path, noindex }: PageHead) {
  // Les pages sont générées en /duck/index.html : l'adresse réelle porte un « / » final.
  const url = siteUrl + (path.endsWith('/') ? path : `${path}/`)
  useHead({
    title,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: description },
      ...(noindex ? [{ name: 'robots', content: 'noindex' }] : []),
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'game.rxdy.fr' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: 'fr_FR' },
      { name: 'twitter:card', content: 'summary' },
    ],
  })
}
