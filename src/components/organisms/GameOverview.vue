<script setup lang="ts">
// « Le principe » : la description dans son encart, puis « Comment on joue ».
import type { Step } from '../../domain/game'
import ContentSection from '../molecules/ContentSection.vue'
import StepItem from '../molecules/StepItem.vue'

defineProps<{ description: string[]; steps: Step[] }>()
</script>

<template>
  <ContentSection id="principe" title="Le principe">
    <div class="description">
      <p v-for="paragraph in description" :key="paragraph">{{ paragraph }}</p>
    </div>
  </ContentSection>
  <ContentSection id="comment-jouer" title="Comment on joue">
    <ol class="steps">
      <StepItem v-for="(step, i) in steps" :key="step.title" :number="i + 1" :title="step.title" :text="step.text" />
    </ol>
  </ContentSection>
</template>

<style scoped>
.description {
  padding: 1.5rem 1.7rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 5px solid var(--color-primary);
  border-radius: 14px;
  font-size: 1.1rem;
}
.description p:last-child {
  margin-bottom: 0;
}
.steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.4rem;
}
</style>
