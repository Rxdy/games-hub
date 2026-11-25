.PHONY: up down logs build check test e2e image dev prod release

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

test:   ## Tests unitaires et d'intégration (Vitest)
	npm test

e2e: build ## Tests e2e Playwright, bureau + téléphone (npx playwright install chromium la première fois)
	npm run test:e2e

image:  ## Construit l'image et teste de vraies requêtes HTTP dessus
	docker build -t games-hub:ci . && scripts/tester-image.sh games-hub:ci

prod:   ## Sur le Pi : tire l'image depuis GHCR et la lance sur games.rxdy.fr (TAG=v1.0.0 pour une version précise)
	docker compose -f docker-compose.prod.yml up -d

release: ## Publie une version : make release V=1.0.0 (tag vX.Y.Z sur main ; la CI pose la version sur l'image et crée la release)
	@scripts/release.sh "$(V)"
