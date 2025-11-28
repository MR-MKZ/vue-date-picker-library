<script setup>
import { computed } from "vue";
import { englishToPersianDigit } from "@/utils/replaceNumbers";

const props = defineProps({
  showMonths: Boolean,
  showYears: Boolean,
  mode: String,
  todayDate: Object,
  selectedRange: Object,
  today: Object,
  engine: Object,
});

defineEmits(["clicked"]);

const rangeVars = computed(() => {
  if (!props.mode === "range" || !props.selectedRange.start.day || !props.selectedRange.end.day) {
    return {};
  }

  const cells = props.engine.grid.value;
  const startIndex = cells.findIndex(
    (c) =>
      c.day === props.selectedRange.start.day &&
      c.month === props.selectedRange.start.month &&
      c.year === props.selectedRange.start.year,
  );

  const endIndex = cells.findIndex(
    (c) =>
      c.day === props.selectedRange.end.day &&
      c.month === props.selectedRange.end.month &&
      c.year === props.selectedRange.end.year,
  );

  if (startIndex === -1 || endIndex === -1) return {};

  const startCol = (startIndex % 7) + 1;
  const startRow = Math.floor(startIndex / 7) + 1;

  const endCol = (endIndex % 7) + 1;
  const endRow = Math.floor(endIndex / 7) + 1;

  return {
    "--range-start-col": startCol,
    "--range-end-col": endCol + 1,
    "--range-start-row": startRow,
    "--range-end-row": endRow + 1,
  };
});
</script>

<template>
  <div class="content__days" v-if="!showMonths && !showYears" :style="rangeVars">
    <div
      class="content__days__day"
      v-for="(cell, i) in engine.grid.value"
      :key="i"
      :class="{
        selected:
          mode !== 'range' && today.day === cell.day && today.month === cell.month && cell.enable,
        today:
          todayDate.day === cell.day &&
          todayDate.month === cell.month &&
          todayDate.year === cell.year,
        'not-current': !cell.current || !cell.enable,
        'range-start':
          mode === 'range' &&
          selectedRange.start.day === cell.day &&
          selectedRange.start.month === cell.month &&
          selectedRange.start.year === cell.year,
        'range-end':
          mode === 'range' &&
          selectedRange.end.day === cell.day &&
          selectedRange.end.month === cell.month &&
          selectedRange.end.year === cell.year,
        'in-range':
          mode === 'range' &&
          selectedRange.start.day &&
          selectedRange.end.day &&
          today.month === cell.month &&
          today.year === cell.year &&
          cell.day > selectedRange.start.day &&
          cell.day < selectedRange.end.day,
      }"
      @click="$emit('clicked', cell)"
    >
      {{ englishToPersianDigit(cell.day) }}
      <span
        class="content__days__day--today"
        v-if="
          todayDate.day === cell.day &&
          todayDate.month === cell.month &&
          todayDate.year === cell.year &&
          cell.current
        "
      >
        امروز
      </span>
    </div>
  </div>
</template>
