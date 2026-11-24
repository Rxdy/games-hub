<script setup lang="ts">
import { portfolioUrl } from './data/games'
</script>

<template>
  <a class="skip" href="#contenu">Aller au contenu</a>

  <header class="site-header">
    <div class="wrap bar">
      <RouterLink class="brand" to="/" aria-label="games.rxdy.fr, accueil">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>games<span class="brand-dim">.rxdy.fr</span></span>
      </RouterLink>
      <a class="back" :href="portfolioUrl">← rxdy.fr</a>
    </div>
  </header>

  <main id="contenu">
    <RouterView />
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <p>Les jeux de Rudy. Ce site présente les jeux, il n’en contient aucun.</p>
      <p><a :href="portfolioUrl">rxdy.fr</a> · <a href="https://github.com/Rxdy">GitHub</a></p>
    </div>
  </footer>
</template>
