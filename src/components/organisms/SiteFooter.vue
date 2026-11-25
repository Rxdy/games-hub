<script setup lang="ts">
import { githubUrl, portfolioUrl } from '../../data/games'
</script>

<template>
  <footer class="site-footer">
    <div class="wrap">
      <p>Les jeux de Rudy. Ce site présente les jeux, il n’en contient aucun.</p>
      <p><a :href="portfolioUrl">rxdy.fr</a> · <a :href="githubUrl">GitHub</a></p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 5rem;
  padding-block: 2rem 3rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.92rem;
}
.site-footer p {
  margin: 0 0 0.3rem;
}
</style>
