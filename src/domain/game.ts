// Le vocabulaire du site : ce qu'est un jeu. Aucun contenu ici (voir data/games.ts), aucun composant.

export type GameStatus = 'en-ligne' | 'en-developpement'
export type EmblemName = 'duck' | 'queens' | 'tracks'

export interface Fact {
  label: string
  value: string
}

export interface Step {
  title: string
  text: string
}

export interface Feature {
  title: string
  text: string
}

/** Une vraie capture du jeu. `alt` est obligatoire : décrire ce qu'on voit, pas « capture d'écran ». */
export interface Media {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

export interface Game {
  slug: string
  title: string
  tagline: string
  summary: string
  description: string[]
  /** « Comment on joue » : toujours trois étapes. */
  steps: Step[]
  features: Feature[]
  /** Lignes de la fiche (plateforme, mode…). L'état est affiché à part, par la pastille. */
  facts: Fact[]
  tags: string[]
  status: GameStatus
  /** Adresse du vrai jeu. Absente tant qu'il n'est pas en ligne. */
  url?: string
  /** Petit dessin de marque du jeu. Ce n'est jamais présenté comme une capture. */
  emblem: EmblemName
  /** Vraies captures. Vide tant qu'il n'y en a pas : le site l'indique au lieu d'inventer un écran. */
  media: Media[]
}

export const statusLabel: Record<GameStatus, string> = {
  'en-ligne': 'En ligne',
  'en-developpement': 'En développement',
}
