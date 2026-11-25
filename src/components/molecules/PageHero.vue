<script setup lang="ts">
defineProps<{ eyebrow: string; title: string }>()
</script>

<template>
  <section class="hero">
    <div class="wrap">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: 3rem 2.5rem;
}
.eyebrow {
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.82rem;
  margin-bottom: 0.8rem;
}
</style>
