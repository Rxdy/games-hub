# games-hub — game.rxdy.fr

Le hub qui réunit les jeux de Rudy : une page d'accueil avec un bandeau par jeu, et une page de présentation
par jeu avec un lien pour y jouer. **Ce site ne contient aucun jeu** et n'a pas de backend : ce sont des pages
statiques, générées à la compilation.

Vue 3 + Vite + [vite-ssg](https://github.com/antfu-collective/vite-ssg) (une vraie page HTML par route, utile
pour le référencement et les aperçus de liens), servies par nginx dans un conteneur.

## Lancer en local

```bash
make up        # http://localhost:8081
make down
```

Rien à installer à part Docker : le build tourne dans un conteneur Node 22.

## Ajouter ou modifier un jeu

Tout le contenu est dans [`src/data/games.ts`](src/data/games.ts) : titre, accroche, description, points forts,
technos, état (`en-ligne` / `en-developpement`) et adresse du jeu (`url`).

Pour un nouveau jeu : ajouter une entrée dans ce fichier, puis un motif (petit dessin SVG) dans
[`src/components/GameMotif.vue`](src/components/GameMotif.vue), et l'adresse dans `public/sitemap.xml`.
Pour Duck, renseigner `url` et passer `status` à `en-ligne` quand il sera jouable : le bouton « Jouer » apparaît.

## Mise en ligne (Raspberry Pi, Traefik)

Le DNS `*.rxdy.fr` et Traefik sont déjà en place (voir le dépôt `infra`) : il suffit des labels de
[`docker-compose.prod.yml`](docker-compose.prod.yml).

```bash
# sur le Pi
git clone <ce dépôt> ~/games-hub && cd ~/games-hub
make prod
```

Le portfolio (`rxdy.fr`) renvoie vers ce hub ; le hub renvoie vers le portfolio (en-tête et pied de page).

## Style

Une seule DA pour tout le site, palette reprise du portfolio, thème clair ou sombre selon le système.
Les couleurs sont des variables CSS en tête de [`src/style.css`](src/style.css).
