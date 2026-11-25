# games-hub — games.rxdy.fr

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

Tout le contenu est dans [`src/data/games.ts`](src/data/games.ts) : titre, accroche, description, étapes de
« Comment on joue », fiche, points forts, technos, état (`en-ligne` / `en-developpement`) et adresse du jeu (`url`).

Pour un nouveau jeu : ajouter une entrée dans ce fichier, un emblème dans
[`GameEmblem.vue`](src/components/atoms/GameEmblem.vue) (et son nom dans [`domain/game.ts`](src/domain/game.ts)),
puis l'adresse dans `public/sitemap.xml`. `make test` vérifie que la fiche est complète.
Pour Duck, renseigner `url` et passer `status` à `en-ligne` quand il sera jouable : le bouton « Jouer » apparaît.

### Ajouter des captures

Poser les images dans `public/`, puis les déclarer dans `media` (`src`, `alt`, `width`, `height`, `caption`
facultative). La première s'affiche en haut de la page, toutes apparaissent dans la galerie.
Sans capture, le site affiche l'emblème et « Aperçu bientôt » : un emblème n'est jamais présenté comme le jeu.

## Composants

`src/components/` : `atoms/` (bouton, pastille, image…), `molecules/` (fiche, cadre, bandeau…),
`organisms/` (en-tête, pied de page, haut de page, galerie). Les pages de `src/views/` les assemblent.

## Tests

| Commande | Ce qui est testé |
|---|---|
| `make test` | Unitaires (`src/**/__tests__/`) et intégration avec le vrai routeur (`tests/integration/`) |
| `make e2e` | `e2e/` : navigation, vraie 404, accessibilité (axe), thèmes clair et sombre, bureau et mobile |

## CI/CD et releases

Même chemin que les autres projets (`traintracks`, `queens`, `portfolio`) : GitHub construit l'image, GHCR la
stocke, Watchtower la déploie sur le Pi.

| Événement | Workflow | Ce qui se passe |
|---|---|---|
| Demande de fusion | [`ci.yml`](.github/workflows/ci.yml) | Tests unitaires et d'intégration, types, compilation, pages générées (une par jeu, accueil, 404), puis l'image servie par nginx, de vraies requêtes et les tests e2e |
| Fusion dans `main` | [`images.yml`](.github/workflows/images.yml) | La CI, puis l'image `amd64` + `arm64` publiée sur `ghcr.io/rxdy/games-hub` en `latest`. Watchtower la déploie sur le Pi (vérification toutes les 5 minutes). |
| Tag `vX.Y.Z` | [`release.yml`](.github/workflows/release.yml) | L'image de ce commit reçoit le tag de version (jamais reconstruite), et une release GitHub est créée avec le site compilé en archive |

Publier une version :

```bash
make release V=1.0.0     # tag v1.0.0 sur main ; la CI fait le reste
```

`make release` refuse si on n'est pas sur `main`, si des modifications ne sont pas commitées, si `main` n'est pas
identique à `origin/main`, ou si le tag existe déjà. Une version se pose toujours sur ce qui est déjà en production.

Vérifier en local ce que vérifie la CI : `make check`.

## Mise en ligne (Raspberry Pi, Traefik)

Le DNS `*.rxdy.fr` et Traefik sont déjà en place (voir le dépôt `infra`). Sur le Pi, il suffit du fichier
[`docker-compose.prod.yml`](docker-compose.prod.yml) : l'image vient de GHCR, rien n'est compilé sur le Pi.

```bash
# sur le Pi, une seule fois
docker login ghcr.io          # indispensable tant que le dépôt (donc l'image) est privé
make prod                     # ou : TAG=v1.0.0 make prod  pour une version précise
```

Ensuite, chaque fusion dans `main` met le site à jour sans rien faire (Watchtower).

Le portfolio (`rxdy.fr`) renvoie vers ce hub ; le hub renvoie vers le portfolio (en-tête et pied de page).

## Style

Une seule DA pour tout le site, palette reprise du portfolio, thème clair ou sombre selon le système.
Les couleurs sont des variables CSS en tête de [`src/style.css`](src/style.css).
