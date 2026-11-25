<script setup lang="ts">
import TagChip from '../atoms/TagChip.vue'

defineProps<{ tags: string[] }>()
</script>

<template>
  <ul class="tags">
    <li v-for="t in tags" :key="t"><TagChip>{{ t }}</TagChip></li>
  </ul>
</template>

<style scoped>
.tags {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
</style>
