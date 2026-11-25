<script setup lang="ts">
// Le cadre commun de tout visuel du site : même arrondi, même ombre, même fond.
// C'est lui qui assure la cohérence de la DA, quel que soit le contenu.
// - avec `media` : une vraie capture
// - sans : l'emblème du jeu et la mention « Aperçu bientôt » (jamais un faux écran)
import type { EmblemName, Media } from '../../domain/game'
import GameEmblem from '../atoms/GameEmblem.vue'
import MediaImage from '../atoms/MediaImage.vue'

defineProps<{ media?: Media; emblem: EmblemName }>()
</script>

<template>
  <figure class="media-frame" :data-kind="media ? 'capture' : 'apercu'">
    <div class="frame">
      <MediaImage v-if="media" :src="media.src" :alt="media.alt" :width="media.width" :height="media.height" />
      <div v-else class="soon">
        <GameEmblem :name="emblem" class="soon-emblem" />
        <p class="soon-text">Aperçu bientôt</p>
      </div>
    </div>
    <figcaption v-if="media?.caption" class="caption">{{ media.caption }}</figcaption>
  </figure>
</template>

<style scoped>
.media-frame {
  margin: 0;
}
.frame {
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: 0 18px 40px -26px color-mix(in srgb, var(--color-primary) 45%, transparent);
}
.soon {
  display: grid;
  justify-items: center;
  gap: 0.6rem;
  padding: 1.4rem 1.4rem 1.2rem;
}
.soon-emblem {
  max-width: 320px;
}
.soon-text {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.caption {
  margin-top: 0.5rem;
  color: var(--color-text-muted);
  font-size: 0.92rem;
}
</style>
