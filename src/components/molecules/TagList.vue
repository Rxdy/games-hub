<script setup lang="ts">
import TagPill from '../atoms/TagPill.vue'

defineProps<{ tags: string[] }>()
</script>

<template>
  <ul class="tag-list">
    <li v-for="tag in tags" :key="tag"><TagPill>{{ tag }}</TagPill></li>
  </ul>
</template>

<style scoped>
.tag-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
</style>
