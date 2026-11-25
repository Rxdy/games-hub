<script setup lang="ts">
import BrandMark from '../atoms/BrandMark.vue'
</script>

<template>
  <RouterLink class="brand" to="/" aria-label="games.rxdy.fr, accueil">
    <BrandMark />
    <span>games<span class="dim">.rxdy.fr</span></span>
  </RouterLink>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 800;
  font-size: 1.15rem;
  text-decoration: none;
  letter-spacing: -0.01em;
}
.dim {
  color: var(--color-text-muted);
  font-weight: 600;
}
</style>
