<template>
  <span class="tag"><slot /></span>
</template>

<style scoped>
.tag {
  display: inline-block;
  padding: 0.3rem 0.9rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 600;
}
</style>
