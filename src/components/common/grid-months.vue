<script setup>
defineProps({
  currentView: { type: String, required: true },
  selectedDates: { type: Object, required: true },
  availableMonths: { type: Array, required: true },
});

defineEmits(["clicked"]);
</script>

<template>
  <div class="content__months" v-if="currentView === 'months'">
    <div
      class="content__months__month"
      v-for="(month, index) in availableMonths"
      :key="month"
      :class="{ 'content__months__month--selected': selectedDates.month - 1 === index }"
      @click="$emit('clicked', { year: selectedDates.year, month: index })"
    >
      {{ month }}
    </div>
  </div>
</template>
