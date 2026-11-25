<script setup lang="ts">
import GameBand from '../components/molecules/GameBand.vue'
import { games } from '../data/games'
import { usePageHead } from '../head'

usePageHead({
  title: 'Les jeux de Rudy · games.rxdy.fr',
  description:
    'Les jeux de Rudy réunis au même endroit : Duck, Queens et Train Tracks. Une page de présentation par jeu et un lien pour y jouer.',
  path: '/',
})
</script>

<template>
  <div class="wrap page-hero">
    <p class="eyebrow">games.rxdy.fr</p>
    <h1>Les jeux de Rudy</h1>
    <p class="lead">
      Trois jeux faits maison, réunis au même endroit. Chacun a sa page de présentation, et un lien
      pour y jouer.
    </p>
  </div>

  <section class="wrap bands" aria-label="Les jeux">
    <GameBand v-for="(game, i) in games" :key="game.slug" :game="game" :index="i" />
  </section>
</template>

<style scoped>
.bands {
  display: grid;
  gap: 1.2rem;
}
</style>
