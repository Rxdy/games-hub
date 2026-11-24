<script setup lang="ts">
import { usePageHead } from '../head'

usePageHead({
  title: 'Page introuvable · game.rxdy.fr',
  description: 'Cette page n’existe pas.',
  path: '/404',
  noindex: true,
})
</script>

<template>
  <section class="hero">
    <div class="wrap">
      <p class="eyebrow">404</p>
      <h1>Page introuvable</h1>
      <p class="lead">Cette page n’existe pas, ou plus.</p>
      <p><RouterLink class="btn" to="/">Voir tous les jeux</RouterLink></p>
    </div>
  </section>
</template>
