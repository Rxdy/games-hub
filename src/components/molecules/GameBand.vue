<script setup lang="ts">
// Le bandeau d'un jeu sur la page d'accueil : tout le bandeau est un lien vers la page du jeu.
import type { Game } from '../../domain/game'
import GameEmblem from '../atoms/GameEmblem.vue'
import StatusBadge from '../atoms/StatusBadge.vue'

defineProps<{ game: Game; index: number }>()
</script>

<template>
  <RouterLink :to="`/${game.slug}`" class="band">
    <div class="text">
      <p class="index">0{{ index + 1 }}</p>
      <h2>{{ game.title }}</h2>
      <p class="tagline">{{ game.tagline }}</p>
      <p class="summary">{{ game.summary }}</p>
      <div class="foot">
        <StatusBadge :status="game.status" />
        <span class="more">Découvrir <span aria-hidden="true">→</span></span>
      </div>
    </div>
    <div class="art"><GameEmblem :name="game.emblem" /></div>
  </RouterLink>
</template>

<style scoped>
.band {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2rem;
  align-items: center;
  padding: 2rem 2.2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}
.band:hover {
  transform: translateY(-3px);
  border-color: var(--color-primary);
  box-shadow: 0 14px 40px -18px color-mix(in srgb, var(--color-primary) 55%, transparent);
}
.index {
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  margin-bottom: 0.4rem;
}
h2 {
  font-size: clamp(1.9rem, 4.5vw, 2.8rem);
  letter-spacing: -0.025em;
  margin-bottom: 0.4rem;
}
.tagline {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.summary {
  color: var(--color-text-muted);
  margin-bottom: 1.2rem;
}
.foot {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.more {
  font-weight: 700;
  color: var(--color-primary);
}
.band:hover .more span {
  display: inline-block;
  transform: translateX(4px);
}
.art {
  max-width: 360px;
  justify-self: end;
  width: 100%;
}
@media (max-width: 760px) {
  .band {
    grid-template-columns: 1fr;
    gap: 1.4rem;
    padding: 1.5rem 1.3rem;
  }
  .art {
    justify-self: start;
    max-width: 280px;
    order: -1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .band,
  .more span {
    transition: none;
  }
}
</style>
