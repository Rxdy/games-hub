<script setup lang="ts">
import BaseButton from '../atoms/BaseButton.vue'
import GameMotif from '../atoms/GameMotif.vue'
import LeadText from '../atoms/LeadText.vue'
import StatusBadge from '../atoms/StatusBadge.vue'
import type { Game } from '../../data/games'

defineProps<{ game: Game }>()
</script>

<template>
  <section class="game-hero">
    <div class="wrap grid">
      <div class="text">
        <h1>{{ game.title }}</h1>
        <LeadText>{{ game.tagline }}</LeadText>
        <div class="cta-row">
          <BaseButton v-if="game.url" :href="game.url">Jouer à {{ game.title }} <span aria-hidden="true">↗</span></BaseButton>
          <BaseButton v-else disabled>Pas encore jouable</BaseButton>
          <StatusBadge :status="game.status" />
        </div>
      </div>
      <div class="art"><GameMotif :name="game.motif" /></div>
    </div>
  </section>
</template>

<style scoped>
.game-hero {
  padding-block: 1.5rem 2rem;
}
.grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2.5rem;
  align-items: center;
}
.cta-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.6rem;
}
.art {
  padding: 1.4rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

/* Téléphone : l'illustration passe en bannière pleine largeur tout en haut, le texte dessous. */
@media (max-width: 760px) {
  .game-hero {
    padding-block: 0 1rem;
  }
  .grid {
    width: 100%;
    grid-template-columns: 1fr;
    gap: 0;
  }
  .art {
    order: -1;
    display: flex;
    justify-content: center;
    padding: 1.3rem 1rem;
    border: 0;
    border-bottom: 1px solid var(--color-border);
    border-radius: 0;
    background: color-mix(in srgb, var(--color-primary) 7%, var(--color-bg));
  }
  .art :deep(.motif) {
    width: auto;
    height: 150px;
  }
  .text {
    padding: 1.2rem 1rem 0;
  }
}
</style>
