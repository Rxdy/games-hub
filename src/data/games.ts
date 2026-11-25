// Source unique du contenu : la page d'accueil et chaque page de jeu en sont générées.
// Pour ajouter un jeu, ajouter une entrée ici (et un motif dans components/GameMotif.vue).

export type GameStatus = 'en-ligne' | 'en-developpement'
export type MotifName = 'duck' | 'queens' | 'tracks'

export interface Game {
  slug: string
  title: string
  tagline: string
  summary: string
  description: string[]
  features: { title: string; text: string }[]
  tags: string[]
  status: GameStatus
  /** Adresse du vrai jeu. Absente tant qu'il n'est pas en ligne. */
  url?: string
  motif: MotifName
}

export const siteUrl = 'https://games.rxdy.fr'
export const portfolioUrl = 'https://rxdy.fr'
export const githubUrl = 'https://github.com/Rxdy'

export const games: Game[] = [
  {
    slug: 'queens',
    title: 'Queens',
    tagline: 'Une reine par zone, aucune ne se touche.',
    summary:
      'Une application autour du problème des N-Reines, version zones colorées, avec un vrai solveur de grille.',
    description: [
      'Le plateau est découpé en zones colorées. Il faut placer exactement une reine par zone, sans qu’aucune ne partage une ligne, une colonne, une diagonale ou une case voisine avec une autre.',
      'Dessine ta propre grille, ou importe une photo d’un plateau, puis lance la résolution. Deux méthodes s’affrontent : un modèle de raisonnement et une approche classique par recherche locale.',
    ],
    features: [
      { title: 'Dessin du plateau', text: 'Trace les zones colorées directement à l’écran.' },
      { title: 'Import d’image', text: 'Extrait une grille de zones à partir d’une photo.' },
      { title: 'Deux solveurs', text: 'Un modèle de raisonnement face à une méthode gloutonne avec recherche locale.' },
      { title: 'Benchmark', text: 'Compare les deux méthodes sur des grilles de 4 à 12 reines, temps à l’appui.' },
    ],
    tags: ['Vue', 'Python', 'Docker'],
    status: 'en-ligne',
    url: 'https://queens.rxdy.fr',
    motif: 'queens',
  },
  {
    slug: 'duck',
    title: 'Duck',
    tagline: 'Un duel de canards sur une grille, en ligne.',
    summary:
      'Jeu multijoueur en ligne sur grille, inspiré des mini-jeux créés avec les Wired de Habbo Hotel.',
    description: [
      'Chaque joueur contrôle un canard sur un plateau. Le but : atteindre la base adverse pour marquer des points, avant que l’autre équipe n’en fasse autant.',
      'Les règles sont gérées par un serveur qui fait autorité : tout le monde voit la même partie, au même moment.',
    ],
    features: [
      { title: 'Multijoueur en temps réel', text: 'Les parties se jouent à plusieurs, en ligne, avec un serveur unique qui arbitre.' },
      { title: 'Rendu 3D', text: 'Le plateau et les canards sont affichés en 3D directement dans le navigateur.' },
      { title: 'Éditeur de cartes', text: 'Les cartes se créent et se modifient avec un éditeur dédié.' },
      { title: 'Cartes générées', text: 'Un générateur propose des plateaux différents d’une partie à l’autre.' },
    ],
    tags: ['TypeScript', 'React', 'Three.js', 'WebSocket', 'Node.js'],
    status: 'en-developpement',
    motif: 'duck',
  },
  {
    slug: 'traintracks',
    title: 'Train Tracks',
    tagline: 'Relie les deux bouts de la voie ferrée.',
    summary:
      'Un puzzle de logique ferroviaire, avec une nouvelle grille à résoudre chaque jour.',
    description: [
      'Sur une grille, relie l’entrée à la sortie en posant des rails. Les chiffres au bord de chaque ligne et de chaque colonne indiquent combien de cases contiennent un rail, et quelques morceaux sont donnés au départ.',
      'La voie doit former un chemin unique et continu, sans boucle ni embranchement.',
    ],
    features: [
      { title: 'Un puzzle par jour', text: 'Une nouvelle grille chaque jour, avec une solution unique garantie.' },
      { title: 'Des niveaux progressifs', text: 'Des grilles de plus en plus grandes pour monter en difficulté.' },
      { title: 'Des comptes', text: 'Retrouve ta progression d’un appareil à l’autre.' },
      { title: 'Application web', text: 'Léger, pensé pour le mobile et installable comme une application.' },
    ],
    tags: ['Vue 3', 'TypeScript', 'Fastify', 'PostgreSQL', 'PWA'],
    status: 'en-ligne',
    url: 'https://traintracks.rxdy.fr',
    motif: 'tracks',
  },
]

export const findGame = (slug: string) => games.find((g) => g.slug === slug)

export const statusLabel: Record<GameStatus, string> = {
  'en-ligne': 'En ligne',
  'en-developpement': 'En développement',
}
