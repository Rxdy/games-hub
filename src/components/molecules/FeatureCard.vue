<script setup lang="ts">
// Un point fort. À placer dans une liste <ul> (c'est un <li>).
defineProps<{ title: string; text: string }>()
</script>

<template>
  <li class="feature-card">
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </li>
</template>

<style scoped>
.feature-card {
  padding: 1.2rem 1.3rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
}
h3 {
  font-size: 1.05rem;
  margin-bottom: 0.3rem;
}
p {
  color: var(--color-text-muted);
  margin: 0;
  font-size: 0.97rem;
}
</style>
