#!/usr/bin/env bash
# Vérifie que la compilation a produit toutes les pages attendues, avec les bonnes balises.
# Usage : scripts/verifier-dist.sh [dossier]   (par défaut : dist)
set -euo pipefail

DIST="${1:-dist}"
# Les jeux viennent de src/data/games.ts : on ne les écrit pas deux fois.
SLUGS=$(grep -oE "slug: '[a-z0-9-]+'" src/data/games.ts | sed -E "s/slug: '(.*)'/\1/")
[ -n "$SLUGS" ] || { echo "Aucun jeu trouvé dans src/data/games.ts" >&2; exit 1; }

erreurs=0
verifier() { # fichier motif description
  if [ ! -f "$1" ]; then echo "MANQUANT : $1" >&2; erreurs=$((erreurs + 1)); return; fi
  if ! grep -q "$2" "$1"; then echo "BALISE ABSENTE ($3) : $1" >&2; erreurs=$((erreurs + 1)); fi
}

verifier "$DIST/index.html" 'rel="canonical" href="https://games.rxdy.fr/"' "adresse canonique"
verifier "$DIST/404/index.html" 'noindex' "page 404 non indexée"
for s in $SLUGS; do
  verifier "$DIST/$s/index.html" "rel=\"canonical\" href=\"https://games.rxdy.fr/$s/\"" "adresse canonique"
  grep -q "https://games.rxdy.fr/$s/" "public/sitemap.xml" || { echo "ABSENT DU SITEMAP : $s" >&2; erreurs=$((erreurs + 1)); }
done
[ -f "$DIST/robots.txt" ] || { echo "MANQUANT : robots.txt" >&2; erreurs=$((erreurs + 1)); }

if [ "$erreurs" -gt 0 ]; then echo "$erreurs problème(s)." >&2; exit 1; fi
echo "OK : accueil, 404 et $(echo "$SLUGS" | wc -w) pages de jeu ($(echo $SLUGS | tr ' ' ', '))."
