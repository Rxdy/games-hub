<script setup lang="ts">
import SiteFooter from './components/organisms/SiteFooter.vue'
import SiteHeader from './components/organisms/SiteHeader.vue'
</script>

<template>
  <a class="skip" href="#contenu">Aller au contenu</a>
  <SiteHeader />
  <main id="contenu">
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </RouterView>
  </main>
  <SiteFooter />
</template>
