<script setup lang="ts">
// L'emblème d'un jeu : un dessin de marque, décoratif. Ce n'est PAS une capture d'écran
// et le site ne le présente jamais comme tel (les vraies captures sont des MediaImage).
import type { EmblemName } from '../../domain/game'

defineProps<{ name: EmblemName }>()

// Emblème de Queens : numéro de zone de chaque case, et position des reines (ligne, colonne).
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

// Emblème de Duck : 4×4 cases losanges en vue isométrique ; les bases sont les deux coins gauche et droit.
const isoTiles = Array.from({ length: 16 }, (_, n) => {
  const i = Math.floor(n / 4)
  const j = n % 4
  const cx = 120 + (i - j) * 28
  const cy = 40 + (i + j) * 14
  return {
    key: `${i}-${j}`,
    points: `${cx},${cy - 14} ${cx + 28},${cy} ${cx},${cy + 14} ${cx - 28},${cy}`,
    base: (i === 0 && j === 3) || (i === 3 && j === 0),
  }
})
</script>

<template>
  <svg class="emblem" :data-emblem="name" viewBox="0 0 240 160" role="img" aria-hidden="true" focusable="false">
    <!-- Duck : un plateau en vue isométrique, deux bases aux coins, un canard-mascotte dans le coin -->
    <g v-if="name === 'duck'">
      <polygon v-for="t in isoTiles" :key="t.key" :points="t.points" :class="t.base ? 'base' : 'cell'" />
      <g transform="translate(200 20)">
        <circle cx="0" cy="4" r="9" class="duck-body" />
        <circle cx="7" cy="-4" r="6" class="duck-body" />
        <path d="M12 -5 l8 3 l-8 3 z" class="duck-beak" />
      </g>
    </g>

    <!-- Queens : des zones colorées, une reine par zone -->
    <g v-else-if="name === 'queens'">
      <template v-for="(row, r) in zones" :key="r">
        <g v-for="(z, c) in row" :key="`${r}-${c}`">
          <rect :x="40 + c * 32" :y="r * 32" width="30" height="30" rx="4" :class="`zone zone-${z}`" />
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
.emblem {
  width: 100%;
  height: auto;
  display: block;
}
.cell {
  fill: var(--color-border);
  opacity: 0.55;
  stroke: var(--color-bg);
  stroke-width: 2;
}
.base {
  fill: var(--color-primary);
  stroke: var(--color-bg);
  stroke-width: 2;
}
.duck-body {
  fill: var(--color-accent);
}
.duck-beak {
  fill: var(--color-primary);
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
