<script setup lang="ts">
import AppButton from '../atoms/AppButton.vue'
import { githubUrl, portfolioUrl } from '../../data/games'
</script>

<template>
  <footer class="site-footer">
    <div class="wrap">
      <div class="author">
        <div>
          <p class="title">Un projet de Rudy</p>
          <p class="text">Portfolio, autres projets et contact.</p>
        </div>
        <div class="links">
          <AppButton :href="portfolioUrl">Voir le portfolio</AppButton>
          <AppButton :href="githubUrl" variant="ghost">GitHub</AppButton>
        </div>
      </div>
      <p class="note">Ce site présente les jeux, il n’en contient aucun.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 5rem;
  padding-block: 2rem 3rem;
  border-top: 1px solid var(--color-border);
}
.author {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.2rem;
  padding: 1.4rem 1.6rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.title {
  font-size: 1.15rem;
  font-weight: 800;
  margin: 0;
}
.text,
.note {
  color: var(--color-text-muted);
  margin: 0;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}
.note {
  margin-top: 1.2rem;
  font-size: 0.92rem;
}
</style>
