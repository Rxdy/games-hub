<script setup lang="ts">
import BaseButton from '../components/atoms/BaseButton.vue'
import LeadText from '../components/atoms/LeadText.vue'
import PageHero from '../components/molecules/PageHero.vue'
import { usePageHead } from '../head'

usePageHead({
  title: 'Page introuvable · games.rxdy.fr',
  description: 'Cette page n’existe pas.',
  path: '/404',
  noindex: true,
})
</script>

<template>
  <PageHero eyebrow="404" title="Page introuvable">
    <LeadText>Cette page n’existe pas, ou plus.</LeadText>
    <p><BaseButton to="/">Voir tous les jeux</BaseButton></p>
  </PageHero>
</template>
