<script setup lang="ts">
import { computed } from 'vue'
import GameMotif from '../components/GameMotif.vue'
import NotFoundView from './NotFoundView.vue'
import { findGame, games, statusLabel } from '../data/games'
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
    <section class="game-hero">
      <div class="wrap game-hero-grid">
        <div>
          <RouterLink class="crumb" to="/">← Tous les jeux</RouterLink>
          <h1>{{ game.title }}</h1>
          <p class="lead">{{ game.tagline }}</p>
          <div class="cta-row">
            <a v-if="game.url" class="btn" :href="game.url">Jouer à {{ game.title }} <span aria-hidden="true">↗</span></a>
            <span v-else class="btn btn-off" aria-disabled="true">Pas encore jouable</span>
            <span class="status" :data-status="game.status">{{ statusLabel[game.status] }}</span>
          </div>
        </div>
        <div class="hero-art"><GameMotif :name="game.motif" /></div>
      </div>
    </section>

    <section class="wrap prose">
      <h2>Le jeu</h2>
      <p v-for="p in game.description" :key="p">{{ p }}</p>
    </section>

    <section class="wrap">
      <h2>Ce qu’on y trouve</h2>
      <ul class="features">
        <li v-for="f in game.features" :key="f.title">
          <h3>{{ f.title }}</h3>
          <p>{{ f.text }}</p>
        </li>
      </ul>
    </section>

    <section class="wrap">
      <h2>Sous le capot</h2>
      <ul class="tags">
        <li v-for="t in game.tags" :key="t">{{ t }}</li>
      </ul>
    </section>

    <section class="wrap others" aria-label="Les autres jeux">
      <h2>Les autres jeux</h2>
      <div class="others-grid">
        <RouterLink v-for="g in others" :key="g.slug" :to="`/${g.slug}`" class="other">
          <div class="other-art"><GameMotif :name="g.motif" /></div>
          <div>
            <h3>{{ g.title }}</h3>
            <p>{{ g.tagline }}</p>
          </div>
        </RouterLink>
      </div>
    </section>
  </template>
</template>
