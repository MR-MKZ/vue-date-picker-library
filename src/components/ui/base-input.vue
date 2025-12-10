<script setup>
const props = defineProps(["placeholder"]);
</script>

<template>
  <div class="date-input">
    <input class="date-input__field" readonly :placeholder="placeholder" />
    <div class="date-input__button">📅</div>
  </div>
</template>

<style scoped lang="scss">
.date-input {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--base-input-background-color);
  border-radius: var(--radius-lg);
  gap: var(--space-sm);
  width: var(--base-input-width);
  padding: var(--space-sm) var(--space-md);
  border: var(--base-input-border);

  &__field {
    border: none;
    outline: none;
    flex: 1;
    font-size: var(--font-sm);
  }

  &__button {
    width: var(--base-input-button-width);
    height: var(--base-input-button-height);
    background: var(--base-input-button-background);
    border-radius: var(--radius-md);
    transition: 0.2s;
    cursor: pointer;
    @include flex(center, center);
  }
}
</style>
