<script setup lang="ts">
// Lien interne (`to`, navigation sans rechargement) ou externe (`href`). Les classes passées tombent sur le <a>.
defineProps<{ to?: string; href?: string }>()
</script>

<template>
  <RouterLink v-if="to" :to="to"><slot /></RouterLink>
  <a v-else :href="href"><slot /></a>
</template>
