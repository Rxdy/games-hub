<script setup lang="ts">
// Une vraie image de jeu. `alt` est obligatoire (décrire ce qu'on voit).
// Dimensions obligatoires aussi : le navigateur réserve la place, la page ne saute pas au chargement.
defineProps<{ src: string; alt: string; width: number; height: number }>()
</script>

<template>
  <img class="media-image" :src="src" :alt="alt" :width="width" :height="height" loading="lazy" decoding="async" />
</template>

<style scoped>
.media-image {
  display: block;
  width: 100%;
  height: auto;
}
</style>
