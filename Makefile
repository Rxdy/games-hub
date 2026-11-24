.PHONY: up down logs build prod dev

dev:    ## Mode développement avec rechargement automatique : http://localhost:5173
	docker run --rm -it -p 5173:5173 -v $(CURDIR):/app -w /app node:22-alpine sh -c "npm ci --no-audit --no-fund && npm run dev -- --host 0.0.0.0"

up:     ## Aperçu local sur http://localhost:8081
	docker compose up -d --build

down:   ## Arrête l'aperçu
	docker compose down

logs:
	docker compose logs -f

build:  ## Génère les pages dans ./dist (Node 22 dans Docker, rien à installer)
	docker run --rm -v $(CURDIR):/app -w /app node:22-alpine sh -c "npm ci --no-audit --no-fund && npm run build"

prod:   ## Sur le Pi : (re)construit et publie sur game.rxdy.fr
	docker compose -f docker-compose.prod.yml up -d --build
