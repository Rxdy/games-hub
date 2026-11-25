<script setup lang="ts">
// La version compacte d'un jeu, pour proposer les autres jeux en bas d'une page.
import type { Game } from '../../domain/game'
import GameEmblem from '../atoms/GameEmblem.vue'

defineProps<{ game: Game }>()
</script>

<template>
  <RouterLink :to="`/${game.slug}`" class="game-card">
    <div class="art"><GameEmblem :name="game.emblem" /></div>
    <div>
      <h3>{{ game.title }}</h3>
      <p>{{ game.tagline }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.game-card {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  text-decoration: none;
  transition: border-color 0.15s ease;
}
.game-card:hover {
  border-color: var(--color-primary);
}
h3 {
  font-size: 1.05rem;
  margin-bottom: 0.3rem;
}
p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}
</style>
