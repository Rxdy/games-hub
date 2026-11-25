<script setup lang="ts">
import BaseLink from './BaseLink.vue'

// Lien discret (retour, fil d'Ariane).
defineProps<{ to?: string; href?: string }>()
</script>

<template>
  <BaseLink class="back-link" :to="to" :href="href"><slot /></BaseLink>
</template>

<style scoped>
.back-link {
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.95rem;
}
.back-link:hover {
  color: var(--color-text);
}
</style>
