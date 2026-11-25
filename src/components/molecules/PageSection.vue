<script setup lang="ts">
import { useId } from 'vue'

// Section de page à la largeur du site. Titre visible (`title`) ou, sans titre, nom accessible (`label`).
defineProps<{ title?: string; label?: string }>()
const titleId = useId()
</script>

<template>
  <section class="wrap section" :aria-labelledby="title ? titleId : undefined" :aria-label="title ? undefined : label">
    <h2 v-if="title" :id="titleId">{{ title }}</h2>
    <slot />
  </section>
</template>

<style scoped>
.section {
  margin-top: 3rem;
}
</style>
