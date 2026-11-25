<script setup lang="ts">
import BrandMark from '../atoms/BrandMark.vue'
</script>

<template>
  <header class="site-header">
    <div class="wrap">
      <RouterLink class="brand" to="/" aria-label="games.rxdy.fr, accueil">
        <BrandMark />
        <span>games<span class="dim">.rxdy.fr</span></span>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  padding-block: 1.2rem;
}
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
