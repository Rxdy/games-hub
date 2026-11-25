<script setup lang="ts">
import BaseLink from '../atoms/BaseLink.vue'
import GameMotif from '../atoms/GameMotif.vue'
import type { Game } from '../../data/games'

defineProps<{ game: Game }>()
</script>

<template>
  <BaseLink class="teaser" :to="`/${game.slug}`">
    <div class="art"><GameMotif :name="game.motif" /></div>
    <div>
      <h3>{{ game.title }}</h3>
      <p>{{ game.tagline }}</p>
    </div>
  </BaseLink>
</template>

<style scoped>
.teaser {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 1rem;
  align-items: center;
  height: 100%;
  padding: 1rem 1.2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  text-decoration: none;
  transition: border-color 0.15s ease;
}
.teaser:hover {
  border-color: var(--color-primary);
}
p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}
</style>
