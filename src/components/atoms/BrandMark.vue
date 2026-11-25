<template>
  <span class="brand-mark" aria-hidden="true"></span>
</template>

<style scoped>
.brand-mark {
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background:
    linear-gradient(var(--color-primary) 0 0) 0 0 / 9px 9px no-repeat,
    linear-gradient(var(--color-accent) 0 0) 100% 100% / 9px 9px no-repeat,
    linear-gradient(var(--color-border) 0 0) 100% 0 / 9px 9px no-repeat,
    linear-gradient(var(--color-border) 0 0) 0 100% / 9px 9px no-repeat;
}
</style>
