<script setup lang="ts">
import BackLink from '../atoms/BackLink.vue'
import BrandLink from '../molecules/BrandLink.vue'
import { portfolioUrl } from '../../data/games'
</script>

<template>
  <header class="site-header">
    <div class="wrap bar">
      <BrandLink />
      <BackLink :href="portfolioUrl">← rxdy.fr</BackLink>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  padding-block: 1.2rem;
}
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
</style>
