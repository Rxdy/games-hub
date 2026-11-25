<script setup lang="ts">
import GameBand from './GameBand.vue'
import PageSection from '../molecules/PageSection.vue'
import type { Game } from '../../data/games'

defineProps<{ games: Game[] }>()
</script>

<template>
  <PageSection label="Les jeux">
    <div class="bands">
      <GameBand v-for="(game, i) in games" :key="game.slug" :game="game" :index="i" />
    </div>
  </PageSection>
</template>

<style scoped>
.bands {
  display: grid;
  gap: 1.2rem;
}
</style>
