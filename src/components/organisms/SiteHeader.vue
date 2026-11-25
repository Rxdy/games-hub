<script setup lang="ts">
import BrandLink from '../molecules/BrandLink.vue'
</script>

<template>
  <header class="site-header">
    <div class="wrap bar">
      <BrandLink />
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
