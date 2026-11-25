<script setup lang="ts">
withDefaults(defineProps<{ target?: string }>(), { target: '#contenu' })
</script>

<template>
  <a class="skip" :href="target"><slot>Aller au contenu</slot></a>
</template>

<style scoped>
.skip {
  position: absolute;
  left: 1rem;
  top: -4rem;
  background: var(--color-primary);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  z-index: 10;
}
.skip:focus {
  top: 1rem;
}
</style>
