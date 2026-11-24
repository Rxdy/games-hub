<script setup lang="ts">
import type { MotifName } from '../data/games'

defineProps<{ name: MotifName }>()

// Plateau de Queens : numéro de zone de chaque case, et position des reines (ligne, colonne).
const zones = [
  [0, 0, 1, 1, 1],
  [0, 2, 2, 1, 3],
  [0, 2, 3, 3, 3],
  [4, 4, 4, 3, 2],
  [4, 2, 2, 2, 2],
]
const queens = [
  [0, 2],
  [1, 0],
  [2, 3],
  [3, 1],
  [4, 4],
]
const isQueen = (r: number, c: number) => queens.some(([qr, qc]) => qr === r && qc === c)
</script>

<template>
  <svg class="motif" viewBox="0 0 240 160" role="img" aria-hidden="true" focusable="false">
    <!-- Duck : une grille, deux bases, un canard entre les deux -->
    <g v-if="name === 'duck'">
      <template v-for="r in 5" :key="r">
        <rect
          v-for="c in 8"
          :key="`${r}-${c}`"
          :x="10 + (c - 1) * 28"
          :y="10 + (r - 1) * 28"
          width="24"
          height="24"
          rx="5"
          class="cell"
        />
      </template>
      <rect x="10" y="66" width="24" height="24" rx="5" class="base" />
      <rect x="206" y="66" width="24" height="24" rx="5" class="base" />
      <path d="M38 78 H96" class="trail" />
      <circle cx="122" cy="80" r="15" class="duck-body" />
      <circle cx="133" cy="66" r="9" class="duck-body" />
      <path d="M140 64 l11 4 l-11 4 z" class="duck-beak" />
      <circle cx="135" cy="64" r="1.8" class="duck-eye" />
    </g>

    <!-- Queens : un plateau de zones colorées, une reine par zone -->
    <g v-else-if="name === 'queens'">
      <template v-for="(row, r) in zones" :key="r">
        <g v-for="(z, c) in row" :key="`${r}-${c}`">
          <rect
            :x="40 + c * 32"
            :y="0 + r * 32"
            width="30"
            height="30"
            rx="4"
            :class="`zone zone-${z}`"
          />
          <circle v-if="isQueen(r, c)" :cx="55 + c * 32" :cy="15 + r * 32" r="8" class="queen" />
        </g>
      </template>
    </g>

    <!-- Train Tracks : une voie qui serpente, des traverses, deux extrémités -->
    <g v-else>
      <path d="M14 132 C 70 132, 70 50, 124 50 S 196 108, 226 34" class="sleepers" />
      <path d="M14 132 C 70 132, 70 50, 124 50 S 196 108, 226 34" class="rail-outer" />
      <path d="M14 132 C 70 132, 70 50, 124 50 S 196 108, 226 34" class="rail-inner" />
      <circle cx="14" cy="132" r="7" class="end" />
      <circle cx="226" cy="34" r="7" class="end" />
    </g>
  </svg>
</template>

<style scoped>
.motif {
  width: 100%;
  height: auto;
  display: block;
}
.cell {
  fill: var(--color-border);
  opacity: 0.55;
}
.base {
  fill: var(--color-primary);
}
.trail {
  stroke: var(--color-primary);
  stroke-width: 3;
  stroke-dasharray: 2 8;
  stroke-linecap: round;
  fill: none;
}
.duck-body {
  fill: var(--color-accent);
}
.duck-beak {
  fill: var(--color-primary);
}
.duck-eye {
  fill: var(--color-bg);
}
.zone-0 { fill: hsl(215 80% 62% / 0.55); }
.zone-1 { fill: hsl(160 60% 48% / 0.55); }
.zone-2 { fill: hsl(38 90% 58% / 0.55); }
.zone-3 { fill: hsl(340 75% 62% / 0.55); }
.zone-4 { fill: hsl(265 65% 66% / 0.55); }
.queen {
  fill: var(--color-text);
}
.sleepers {
  fill: none;
  stroke: var(--color-border);
  stroke-width: 22;
  stroke-dasharray: 3 9;
}
.rail-outer {
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 12;
}
.rail-inner {
  fill: none;
  stroke: var(--color-surface);
  stroke-width: 8;
}
.end {
  fill: var(--color-accent);
}
</style>
