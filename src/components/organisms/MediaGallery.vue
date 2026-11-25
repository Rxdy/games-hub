<script setup lang="ts">
// Galerie de vraies captures, avec agrandissement. Clavier : flèches et Échap. Tactile : balayage.
// Sans capture, un seul cadre « Aperçu bientôt » (jamais un faux écran).
import { computed, ref } from 'vue'
import type { EmblemName, Media } from '../../domain/game'
import AppButton from '../atoms/AppButton.vue'
import MediaImage from '../atoms/MediaImage.vue'
import MediaFrame from '../molecules/MediaFrame.vue'

const props = defineProps<{ media: Media[]; emblem: EmblemName }>()

const dialog = ref<HTMLDialogElement>()
const index = ref<number | null>(null)
const current = computed(() => (index.value === null ? undefined : props.media[index.value]))

function open(i: number) {
  index.value = i
  dialog.value?.showModal()
}
function close() {
  dialog.value?.close()
}
function move(step: number) {
  if (index.value === null) return
  index.value = (index.value + step + props.media.length) % props.media.length
}

let touchStart: number | null = null
function onTouchStart(event: TouchEvent) {
  touchStart = event.changedTouches[0]?.clientX ?? null
}
function onTouchEnd(event: TouchEvent) {
  const end = event.changedTouches[0]?.clientX
  if (touchStart === null || end === undefined) return
  const distance = end - touchStart
  if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1)
  touchStart = null
}
</script>

<template>
  <div v-if="!media.length" class="empty">
    <MediaFrame :emblem="emblem" />
  </div>

  <template v-else>
    <ul class="gallery">
      <li v-for="(item, i) in media" :key="item.src">
        <button type="button" class="thumb" :aria-label="`Agrandir : ${item.alt}`" @click="open(i)">
          <MediaFrame :media="item" :emblem="emblem" />
        </button>
      </li>
    </ul>

    <dialog
      ref="dialog"
      class="lightbox"
      aria-label="Capture agrandie"
      @close="index = null"
      @keydown.left="move(-1)"
      @keydown.right="move(1)"
      @click.self="close"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <figure v-if="current" class="viewer">
        <MediaImage :src="current.src" :alt="current.alt" :width="current.width" :height="current.height" />
        <figcaption aria-live="polite">{{ current.caption ?? current.alt }} ({{ index! + 1 }}/{{ media.length }})</figcaption>
      </figure>
      <div class="controls">
        <template v-if="media.length > 1">
          <AppButton data-action="previous" @click="move(-1)">Précédente</AppButton>
          <AppButton data-action="next" @click="move(1)">Suivante</AppButton>
        </template>
        <AppButton variant="ghost" data-action="close" @click="close">Fermer</AppButton>
      </div>
    </dialog>
  </template>
</template>

<style scoped>
.empty {
  max-width: 420px;
}
.gallery {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  align-items: start;
}
.thumb {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: zoom-in;
}
.lightbox {
  width: min(960px, 100% - 2rem);
  padding: 1rem;
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.lightbox::backdrop {
  background: rgb(0 0 0 / 0.75);
}
.viewer {
  margin: 0;
}
.viewer :deep(img) {
  max-height: 70vh;
  object-fit: contain;
}
figcaption {
  margin-top: 0.6rem;
  color: var(--color-text-muted);
}
.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-top: 0.8rem;
}
</style>
