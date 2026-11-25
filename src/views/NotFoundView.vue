<script setup lang="ts">
import AppButton from '../components/atoms/AppButton.vue'
import { usePageHead } from '../head'

usePageHead({
  title: 'Page introuvable · games.rxdy.fr',
  description: 'Cette page n’existe pas.',
  path: '/404',
  noindex: true,
})
</script>

<template>
  <div class="wrap page-hero">
    <p class="eyebrow">404</p>
    <h1>Page introuvable</h1>
    <p class="lead">Cette page n’existe pas, ou plus.</p>
    <p><AppButton to="/">Voir tous les jeux</AppButton></p>
  </div>
</template>
