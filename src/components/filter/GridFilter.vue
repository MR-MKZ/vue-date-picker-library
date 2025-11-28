<script setup>
import { englishToPersianDigit } from "@/utils/replaceNumbers";
import ArrowIcon from "@/components/icons/arrow-icon.vue";
import chevronIcon from "@/components/icons/chevron-icon.vue";

defineProps({
  showMonths: Boolean,
  showYears: Boolean,
  today: Object,
  currentMonthText: String,
});

const emit = defineEmits(["update:showMonths", "update:showYears"]);
</script>

<template>
  <div class="content__filter" v-if="!showYears">
    <div
      class="content__filter--item"
      @click="
        emit('update:showYears', false);
        emit('update:showMonths', true);
      "
    >
      <span>{{ currentMonthText }}</span>
      <chevron-icon />
    </div>
    <div
      class="content__filter--item"
      @click="
        emit('update:showYears', true);
        emit('update:showMonths', false);
      "
    >
      <span>{{ englishToPersianDigit(today.year) }}</span>
      <chevron-icon />
    </div>
  </div>
  <div class="content__filter" v-if="showYears">
    <div class="content__filter--item" style="rotate: 180deg">
      <arrow-icon />
    </div>
    <div class="content__filter--item" @scroll="onScroll('day', $event)">
      <span>{{ englishToPersianDigit(today.year) }}</span>
    </div>
    <div class="content__filter--item">
      <arrow-icon />
    </div>
  </div>
</template>
