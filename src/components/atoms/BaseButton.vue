<script setup lang="ts">
import BaseLink from './BaseLink.vue'

// Bouton d'action. `disabled` : action pas encore disponible, ce n'est plus un lien.
defineProps<{ to?: string; href?: string; disabled?: boolean }>()
</script>

<template>
  <span v-if="disabled" class="btn btn-off" aria-disabled="true"><slot /></span>
  <BaseLink v-else class="btn" :to="to" :href="href"><slot /></BaseLink>
</template>

<style scoped>
.btn {
  display: inline-block;
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  padding: 0.8rem 1.4rem;
  border-radius: 12px;
  transition: background 0.15s ease;
}
.btn:hover {
  background: var(--color-primary-hover);
}
.btn-off {
  background: var(--color-surface);
  color: var(--color-text-muted);
  border: 1px dashed var(--color-border);
  cursor: not-allowed;
}
</style>
