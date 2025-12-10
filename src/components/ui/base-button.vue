<script setup>
defineProps({ text: String });
</script>

<template>
  <button>{{ text }}</button>
</template>

<style lang="scss" scoped>
button {
  background-color: $primary-600;
  height: $base-button-height;
  padding-inline: $base-button-inline-padding;
  border-radius: $radius-lg;
  cursor: pointer;
  color: $base-button-text;
}
</style>
