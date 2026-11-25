#!/usr/bin/env bash
# Sert l'image du hub et teste de vraies requêtes HTTP (ce que fait nginx, pas le code).
# Usage : scripts/tester-image.sh [image]   (par défaut : games-hub:ci)
set -euo pipefail

IMAGE="${1:-games-hub:ci}"
PORT="${PORT:-8081}"
NOM="games-hub-test-$$"
trap 'docker rm -f "$NOM" >/dev/null 2>&1 || true' EXIT

docker run -d --name "$NOM" -p "$PORT:80" "$IMAGE" >/dev/null
for _ in $(seq 1 20); do curl -fs -o /dev/null "http://localhost:$PORT/" && break; sleep 1; done

erreurs=0
code() { curl -s -o /dev/null -w '%{http_code}' "http://localhost:$PORT$1"; }
attendre() { # chemin code
  local obtenu; obtenu=$(code "$1")
  if [ "$obtenu" = "$2" ]; then echo "ok   $1 → $2"; else echo "ECHEC $1 : $obtenu au lieu de $2" >&2; erreurs=$((erreurs + 1)); fi
}

attendre / 200
for slug in $(grep -oE "slug: '[a-z0-9-]+'" src/data/games.ts | sed -E "s/slug: '(.*)'/\1/"); do
  attendre "/$slug/" 200
  attendre "/$slug" 301        # redirigé vers /slug/ (curl sans -L)
done
attendre /inexistant 404
attendre /robots.txt 200
attendre /sitemap.xml 200

curl -s "http://localhost:$PORT/" | grep -q 'games.rxdy.fr' || { echo "ECHEC : l'accueil ne contient pas games.rxdy.fr" >&2; erreurs=$((erreurs + 1)); }
for chemin in / /duck/ /inexistant; do
  curl -sI "http://localhost:$PORT$chemin" | grep -qi '^x-content-type-options: nosniff' || { echo "ECHEC : nosniff absent sur $chemin" >&2; erreurs=$((erreurs + 1)); }
done
curl -sI "http://localhost:$PORT/" | grep -qi '^cache-control: no-cache' || { echo "ECHEC : les pages HTML doivent être revalidées" >&2; erreurs=$((erreurs + 1)); }

[ "$erreurs" -eq 0 ] && echo "OK : l'image répond comme attendu." || { echo "$erreurs échec(s)." >&2; exit 1; }
