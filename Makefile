.PHONY: up down logs build check dev prod release test e2e

up:     ## Aperçu local sur http://localhost:8081
	docker compose up -d --build

down:   ## Arrête l'aperçu
	docker compose down

logs:
	docker compose logs -f

dev:    ## Mode développement avec rechargement automatique : http://localhost:5173
	docker run --rm -it -p 5173:5173 -v $(CURDIR):/app -w /app node:22-alpine sh -c "npm ci --no-audit --no-fund && npm run dev -- --host 0.0.0.0"

build:  ## Génère les pages dans ./dist (Node 22 dans Docker, rien à installer)
	docker run --rm -v $(CURDIR):/app -w /app node:22-alpine sh -c "npm ci --no-audit --no-fund && npm run build"

check: build ## Compile puis vérifie les pages générées (ce que fait la CI)
	scripts/verifier-dist.sh dist

test:   ## Tests unitaires et d'intégration
	docker run --rm -v $(CURDIR):/app -w /app node:22-alpine sh -c "npm ci --no-audit --no-fund && npm test"

e2e: up ## Tests dans de vrais navigateurs, sur le site servi par nginx (même version que @playwright/test)
	docker run --rm --network host -v $(CURDIR):/app -w /app mcr.microsoft.com/playwright:v1.65.1-noble npx playwright test

prod:   ## Sur le Pi : tire l'image depuis GHCR et la lance sur games.rxdy.fr (TAG=v1.0.0 pour une version précise)
	docker compose -f docker-compose.prod.yml up -d

release: ## Publie une version : make release V=1.0.0 (tag vX.Y.Z sur main ; la CI pose la version sur l'image et crée la release)
	@scripts/release.sh "$(V)"
