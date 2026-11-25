<script setup lang="ts">
import { statusLabel, type GameStatus } from '../../data/games'

defineProps<{ status: GameStatus }>()
</script>

<template>
  <span class="badge" :data-status="status">{{ statusLabel[status] }}</span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
}
.badge[data-status='en-ligne'] {
  color: var(--color-online);
  background: var(--color-online-bg);
}
.badge[data-status='en-developpement'] {
  color: var(--color-soon);
  background: var(--color-soon-bg);
}
</style>
