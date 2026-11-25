<script setup lang="ts">
// Une étape de « Comment on joue ». À placer dans une liste ordonnée <ol> (c'est un <li>).
defineProps<{ number: number; title: string; text: string }>()
</script>

<template>
  <li class="step-item">
    <span class="number" aria-hidden="true">{{ number }}</span>
    <div>
      <h3>{{ title }}</h3>
      <p>{{ text }}</p>
    </div>
  </li>
</template>

<style scoped>
.step-item {
  display: grid;
  grid-template-columns: 2.4rem 1fr;
  gap: 0.9rem;
  align-items: start;
}
.number {
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-weight: 800;
}
h3 {
  font-size: 1.05rem;
  margin-bottom: 0.2rem;
}
p {
  color: var(--color-text-muted);
  margin: 0;
}
</style>
