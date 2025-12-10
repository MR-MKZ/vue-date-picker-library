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
  background: $base-input-background-color;
  border-radius: $radius-lg;
  gap: $space-sm;
  width: $base-input-width;
  padding: $space-sm $space-md;
  border: $base-input-border;

  &__field {
    border: none;
    outline: none;
    flex: 1;
    font-size: $font-sm;
  }

  &__button {
    width: $base-input-button-width;
    height: $base-input-button-height;
    background: $base-input-button-background;
    border-radius: $radius-md;
    transition: 0.2s;
    cursor: pointer;
    @include flex(center, center);
  }
}
</style>
