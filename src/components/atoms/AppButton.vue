<script setup lang="ts">
// Un seul composant pour tous les boutons du site :
// - `to`       : lien interne (routeur)
// - `href`     : lien externe (un jeu, le portfolio)
// - sans lien  : un vrai <button> (galerie)
// - `disabled` : bouton inactif, annoncé comme tel aux lecteurs d'écran (« Pas encore jouable »)
withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'ghost'
    disabled?: boolean
  }>(),
  { variant: 'primary' },
)
</script>

<template>
  <span v-if="disabled" class="btn btn-off" aria-disabled="true"><slot /></span>
  <RouterLink v-else-if="to" :to="to" class="btn" :class="`btn-${variant}`"><slot /></RouterLink>
  <a v-else-if="href" :href="href" class="btn" :class="`btn-${variant}`"><slot /></a>
  <button v-else type="button" class="btn" :class="`btn-${variant}`"><slot /></button>
</template>

<style scoped>
.btn {
  display: inline-block;
  text-decoration: none;
  font: inherit;
  font-weight: 700;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 0.8rem 1.4rem;
  border-radius: 12px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}
.btn-primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
}
.btn-primary:hover {
  background: var(--color-primary-hover);
}
.btn-ghost {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text);
}
.btn-ghost:hover {
  border-color: var(--color-primary);
}
.btn-off {
  background: var(--color-surface);
  color: var(--color-text-muted);
  border: 1px dashed var(--color-border);
  cursor: not-allowed;
}
</style>
