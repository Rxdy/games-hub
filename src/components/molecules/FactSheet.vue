<script setup lang="ts">
// L'encart « Fiche » d'un jeu : l'essentiel d'un coup d'œil, et l'action principale (le bouton passé en contenu).
import type { Fact, GameStatus } from '../../domain/game'
import StatusBadge from '../atoms/StatusBadge.vue'

defineProps<{ status: GameStatus; facts: Fact[] }>()
</script>

<template>
  <aside class="fact-sheet" aria-labelledby="fiche-titre">
    <div class="head">
      <h2 id="fiche-titre" class="title">Fiche</h2>
      <StatusBadge :status="status" />
    </div>
    <dl class="facts">
      <div v-for="fact in facts" :key="fact.label" class="row">
        <dt>{{ fact.label }}</dt>
        <dd>{{ fact.value }}</dd>
      </div>
    </dl>
    <div v-if="$slots.default" class="action"><slot /></div>
  </aside>
</template>

<style scoped>
.fact-sheet {
  padding: 1.3rem 1.4rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.9rem;
}
.title {
  font-size: 1.05rem;
  margin: 0;
}
.facts {
  margin: 0;
}
.row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.55rem 0;
  border-top: 1px solid var(--color-border);
}
dt {
  color: var(--color-text-muted);
}
dd {
  margin: 0;
  font-weight: 600;
  text-align: right;
}
.action {
  margin-top: 1rem;
}
.action :deep(.btn) {
  display: block;
  text-align: center;
}
</style>
