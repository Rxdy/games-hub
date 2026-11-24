# Étape 1 : génère les pages HTML statiques (Node 22 : Vite 7 ne tourne pas sur Node 18).
# Toujours sur la machine qui construit ($BUILDPLATFORM) : le résultat est du HTML, identique pour toutes
# les architectures, donc inutile de le recompiler sous émulation pour l'arm64 du Pi.
FROM --platform=$BUILDPLATFORM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# Étape 2 : sert uniquement les fichiers générés, rien d'autre dans l'image (cette étape suit l'architecture visée).
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://127.0.0.1/ || exit 1
