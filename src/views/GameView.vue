<script setup lang="ts">
import { computed } from 'vue'
import FeatureList from '../components/molecules/FeatureList.vue'
import PageSection from '../components/molecules/PageSection.vue'
import ProseBlock from '../components/molecules/ProseBlock.vue'
import TagList from '../components/molecules/TagList.vue'
import GameHero from '../components/organisms/GameHero.vue'
import OtherGames from '../components/organisms/OtherGames.vue'
import NotFoundView from './NotFoundView.vue'
import { findGame, games } from '../data/games'
import { usePageHead } from '../head'

const props = defineProps<{ slug: string }>()
const game = computed(() => findGame(props.slug))
const others = computed(() => games.filter((g) => g.slug !== props.slug))

usePageHead({
  title: game.value ? `${game.value.title} · games.rxdy.fr` : 'Page introuvable · games.rxdy.fr',
  description: game.value ? `${game.value.tagline} ${game.value.summary}` : 'Cette page n’existe pas.',
  path: `/${props.slug}`,
  noindex: !game.value,
})
</script>

<template>
  <NotFoundView v-if="!game" />

  <template v-else>
    <GameHero :game="game" />
    <PageSection title="Le jeu"><ProseBlock :paragraphs="game.description" /></PageSection>
    <PageSection title="Ce qu’on y trouve"><FeatureList :features="game.features" /></PageSection>
    <PageSection title="Sous le capot"><TagList :tags="game.tags" /></PageSection>
    <OtherGames :games="others" />
  </template>
</template>
