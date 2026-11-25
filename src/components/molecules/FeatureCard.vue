<script setup lang="ts">
defineProps<{ title: string; text: string }>()
</script>

<template>
  <article class="feature">
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </article>
</template>

<style scoped>
.feature {
  height: 100%;
  padding: 1.2rem 1.3rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
}
.feature p {
  color: var(--color-text-muted);
  margin: 0;
  font-size: 0.97rem;
}
</style>
