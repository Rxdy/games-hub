<script setup lang="ts">
import GameMotif from '../components/GameMotif.vue'
import { games, statusLabel } from '../data/games'
import { usePageHead } from '../head'

usePageHead({
  title: 'Les jeux de Rudy · games.rxdy.fr',
  description:
    'Les jeux de Rudy réunis au même endroit : Duck, Queens et Train Tracks. Une page de présentation par jeu et un lien pour y jouer.',
  path: '/',
})
</script>

<template>
  <section class="hero">
    <div class="wrap">
      <p class="eyebrow">games.rxdy.fr</p>
      <h1>Les jeux de Rudy</h1>
      <p class="lead">
        Trois jeux faits maison, réunis au même endroit. Chacun a sa page de présentation, et un lien
        pour y jouer.
      </p>
    </div>
  </section>

  <section class="wrap bands" aria-label="Les jeux">
    <RouterLink v-for="(game, i) in games" :key="game.slug" :to="`/${game.slug}`" class="band">
      <div class="band-text">
        <p class="band-index">0{{ i + 1 }}</p>
        <h2>{{ game.title }}</h2>
        <p class="band-tagline">{{ game.tagline }}</p>
        <p class="band-summary">{{ game.summary }}</p>
        <div class="band-foot">
          <span class="status" :data-status="game.status">{{ statusLabel[game.status] }}</span>
          <span class="more">Découvrir <span aria-hidden="true">→</span></span>
        </div>
      </div>
      <div class="band-art">
        <GameMotif :name="game.motif" />
      </div>
    </RouterLink>
  </section>
</template>
