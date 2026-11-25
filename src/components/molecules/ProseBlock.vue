<script setup lang="ts">
defineProps<{ paragraphs: string[] }>()
</script>

<template>
  <div class="prose">
    <p v-for="p in paragraphs" :key="p">{{ p }}</p>
  </div>
</template>

<style scoped>
.prose {
  max-width: 44rem;
}
.prose p {
  font-size: 1.1rem;
}
</style>
