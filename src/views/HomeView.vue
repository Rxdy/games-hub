<script setup lang="ts">
import LeadText from '../components/atoms/LeadText.vue'
import PageHero from '../components/molecules/PageHero.vue'
import GameBandList from '../components/organisms/GameBandList.vue'
import { games } from '../data/games'
import { usePageHead } from '../head'

usePageHead({
  title: 'Les jeux de Rudy · games.rxdy.fr',
  description:
    'Les jeux de Rudy réunis au même endroit : Duck, Queens et Train Tracks. Une page de présentation par jeu et un lien pour y jouer.',
  path: '/',
})
</script>

<template>
  <PageHero eyebrow="games.rxdy.fr" title="Les jeux de Rudy">
    <LeadText>
      Trois jeux faits maison, réunis au même endroit. Chacun a sa page de présentation, et un lien
      pour y jouer.
    </LeadText>
  </PageHero>
  <GameBandList :games="games" />
</template>
