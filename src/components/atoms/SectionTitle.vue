<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h2 :id="id" class="section-title"><slot /></h2>
</template>

<style scoped>
.section-title {
  font-size: 1.5rem;
  letter-spacing: -0.01em;
  margin-bottom: 0.9rem;
}
</style>
