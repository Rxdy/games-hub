<script setup lang="ts">
import { computed } from 'vue'
import NotFoundView from './NotFoundView.vue'
import ContentSection from '../components/molecules/ContentSection.vue'
import FeatureCard from '../components/molecules/FeatureCard.vue'
import GameCard from '../components/molecules/GameCard.vue'
import TagList from '../components/molecules/TagList.vue'
import GameHero from '../components/organisms/GameHero.vue'
import GameOverview from '../components/organisms/GameOverview.vue'
import MediaGallery from '../components/organisms/MediaGallery.vue'
import { findGame, games } from '../data/games'
import { usePageHead } from '../head'

const props = defineProps<{ slug: string }>()
const game = computed(() => findGame(props.slug))
const others = computed(() => games.filter((g) => g.slug !== props.slug))

// La page 404 pose ses propres balises.
if (game.value) {
  usePageHead({
    title: `${game.value.title} · games.rxdy.fr`,
    description: `${game.value.tagline} ${game.value.summary}`,
    path: `/${props.slug}`,
  })
}
</script>

<template>
  <NotFoundView v-if="!game" />

  <!-- La clé repart de zéro (galerie comprise) quand on passe d'un jeu à l'autre. -->
  <article v-else :key="game.slug">
    <GameHero :game="game" />
    <div class="wrap">
      <GameOverview :description="game.description" :steps="game.steps" />

      <ContentSection id="galerie" title="Galerie">
        <MediaGallery :media="game.media" :emblem="game.emblem" />
      </ContentSection>

      <ContentSection id="points-forts" title="Points forts">
        <ul class="features">
          <FeatureCard v-for="f in game.features" :key="f.title" :title="f.title" :text="f.text" />
        </ul>
      </ContentSection>

      <ContentSection id="technos" title="Sous le capot">
        <TagList :tags="game.tags" />
      </ContentSection>

      <ContentSection id="autres-jeux" title="Les autres jeux">
        <div class="others">
          <GameCard v-for="g in others" :key="g.slug" :game="g" />
        </div>
      </ContentSection>
    </div>
  </article>
</template>

<style scoped>
.features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
}
.others {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
</style>
