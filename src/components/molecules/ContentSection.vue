<script setup lang="ts">
// Une section de page : un titre, et un contenu. Le titre nomme la section pour les lecteurs d'écran.
import { computed } from 'vue'
import SectionTitle from '../atoms/SectionTitle.vue'

const props = defineProps<{ id: string; title: string }>()
const titleId = computed(() => `${props.id}-titre`)
</script>

<template>
  <section :id="id" class="content-section" :aria-labelledby="titleId">
    <SectionTitle :id="titleId">{{ title }}</SectionTitle>
    <slot />
  </section>
</template>

<style scoped>
.content-section {
  margin-top: 3rem;
}
</style>
