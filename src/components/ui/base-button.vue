<script setup>
defineProps({ text: String });
</script>

<template>
  <button>{{ text }}</button>
</template>

<style lang="scss" scoped>
button {
  background-color: var(--primary-600);
  height: var(--base-button-height);
  padding-inline: var(--base-button-inline-padding);
  border-radius: var(--radius-lg);
  cursor: pointer;
  color: var(--base-button-text);
}
</style>
