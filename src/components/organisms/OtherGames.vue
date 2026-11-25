<script setup lang="ts">
import GameTeaser from '../molecules/GameTeaser.vue'
import PageSection from '../molecules/PageSection.vue'
import type { Game } from '../../data/games'

defineProps<{ games: Game[] }>()
</script>

<template>
  <PageSection title="Les autres jeux">
    <div class="grid">
      <GameTeaser v-for="g in games" :key="g.slug" :game="g" />
    </div>
  </PageSection>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
</style>
