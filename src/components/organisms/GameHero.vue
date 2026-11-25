<script setup lang="ts">
// Haut d'une page de jeu : titre, accroche, grand visuel, et la fiche avec l'action principale.
import type { Game } from '../../domain/game'
import AppButton from '../atoms/AppButton.vue'
import FactSheet from '../molecules/FactSheet.vue'
import MediaFrame from '../molecules/MediaFrame.vue'

defineProps<{ game: Game }>()
</script>

<template>
  <div class="wrap game-hero">
    <div class="intro">
      <h1>{{ game.title }}</h1>
      <p class="lead">{{ game.tagline }}</p>
    </div>
    <MediaFrame class="visual" :media="game.media[0]" :emblem="game.emblem" />
    <FactSheet class="sheet" :status="game.status" :facts="game.facts">
      <AppButton v-if="game.url" :href="game.url">Jouer à {{ game.title }} <span aria-hidden="true">↗</span></AppButton>
      <AppButton v-else disabled>Pas encore jouable</AppButton>
    </FactSheet>
  </div>
</template>

<style scoped>
.game-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  grid-template-areas:
    'intro intro'
    'visual sheet';
  gap: 1.5rem;
  align-items: start;
  padding-top: 1.5rem;
}
.intro {
  grid-area: intro;
}
.intro .lead {
  margin-bottom: 0;
}
.visual {
  grid-area: visual;
}
.sheet {
  grid-area: sheet;
}
@media (max-width: 760px) {
  .game-hero {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'intro'
      'visual'
      'sheet';
  }
}
</style>
