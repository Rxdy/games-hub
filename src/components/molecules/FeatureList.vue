<script setup lang="ts">
import FeatureCard from './FeatureCard.vue'

defineProps<{ features: { title: string; text: string }[] }>()
</script>

<template>
  <ul class="features">
    <li v-for="f in features" :key="f.title"><FeatureCard :title="f.title" :text="f.text" /></li>
  </ul>
</template>

<style scoped>
.features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
}
</style>
