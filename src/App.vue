<script setup lang="ts">
import SkipLink from './components/atoms/SkipLink.vue'
import SiteFooter from './components/organisms/SiteFooter.vue'
import SiteHeader from './components/organisms/SiteHeader.vue'
</script>

<template>
  <SkipLink />
  <SiteHeader />
  <main id="contenu">
    <RouterView />
  </main>
  <SiteFooter />
</template>

<!-- Style global : variables de couleur, base typographique, largeur du site. Le reste est dans chaque composant. -->
<style>
/* Une seule DA pour tout le site. Palette reprise du portfolio (rxdy.fr), clair et sombre. */
:root {
  --color-bg: #f5f7fb;
  --color-surface: #ffffff;
  --color-border: #e2e6ec;
  --color-text: #1a1e27;
  --color-text-muted: #58606d;
  --color-primary: #2f5bd0;
  --color-primary-hover: #244aac;
  --color-accent: #e0a020;
  --color-online: #187a4d;
  --color-online-bg: #e3f6ec;
  --color-soon: #8a5a00;
  --color-soon-bg: #fdf1d6;
  --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  --radius: 18px;
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f1115;
    --color-surface: #171a21;
    --color-border: #262b36;
    --color-text: #e6e8ec;
    --color-text-muted: #9aa2b1;
    --color-primary: #6c8cff;
    --color-primary-hover: #5577f5;
    --color-accent: #f2b84b;
    --color-online: #4fd88a;
    --color-online-bg: #123322;
    --color-soon: #f2b84b;
    --color-soon-bg: #33290f;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 17px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* Fine trame de grille en fond : le fil rouge visuel du site. */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.35;
  mask-image: linear-gradient(to bottom, #000, transparent 70%);
  -webkit-mask-image: linear-gradient(to bottom, #000, transparent 70%);
}

a {
  color: inherit;
}

h1,
h2,
h3 {
  line-height: 1.15;
  margin: 0;
  text-wrap: balance;
}

h1 {
  font-size: clamp(2.4rem, 7vw, 4.2rem);
  letter-spacing: -0.03em;
  font-weight: 800;
}

h2 {
  font-size: 1.5rem;
  letter-spacing: -0.01em;
  margin-bottom: 0.9rem;
}

h3 {
  font-size: 1.05rem;
  margin-bottom: 0.3rem;
}

p {
  margin: 0 0 1rem;
}

.wrap {
  width: min(1040px, 100% - 2rem);
  margin-inline: auto;
}

:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 3px;
  border-radius: 6px;
}
@media (max-width: 760px) {
  body {
    font-size: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  * {
    transition: none !important;
  }
}
</style>
