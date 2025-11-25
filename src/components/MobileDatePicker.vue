<script setup>
import { ref, reactive, computed } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { englishToPersianDigit } from "@/utils/replaceNumbers";
import { langDates } from "@/constants/langDates";
import { createCalendarEngine } from "@/composables/useCalenderEngine";
import useGetToday from "@/composables/useGetToday";

const props = defineProps({
  activeLang: { type: String, required: true },
  months: { type: Array, required: true },
  years: { type: Array, required: true },
});

const today = useGetToday();
const todayDate = reactive({ year: today.year, month: today.month, day: today.day, });
const adapter = computed(() => langDates.langs[props.activeLang].adaptor);
const engine = createCalendarEngine(adapter.value, todayDate.year, todayDate.month, false);

const dayRef = ref(null);
const monthRef = ref(null);
const yearRef = ref(null);
const days = ref([...engine.grid.value]);
const months = ref([...props.months]);
const years = ref([...props.years]);

useInfiniteScroll(dayRef, () => {
  const append = engine.grid.value.map(d => ({ day: d.day }));
  days.value = [...days.value, ...append];
}, { distance: 42, canLoadMore: false });

useInfiniteScroll(monthRef, () => months.value = [...months.value, ...props.months], { distance: 42, canLoadMore: false });
useInfiniteScroll(yearRef, () => years.value = [...years.value, ...props.years], { distance: 42, canLoadMore: false });
</script>


<template>
  <div class="calender">
    <div class="calender__block" ref="dayRef">
      <span v-for="item in days" :key="item.day + '-' + Math.random()" class="calender__block--text"
        :class="{ selected: todayDate.day === item.day }">
        {{ englishToPersianDigit(item.day) }}
      </span>
    </div>
    <div class="calender__block" ref="monthRef">
      <span v-for="(month, i) in months" :key="month + '-' + i" class="calender__block--text"
        :class="{ selected: todayDate.month - 1 === i % props.months.length }">
        {{ month }}
      </span>
    </div>
    <div class="calender__block" ref="yearRef">
      <span v-for="year in years" :key="year + '-' + Math.random()" class="calender__block--text"
        :class="{ selected: todayDate.year === year }">
        {{ englishToPersianDigit(year) }}
      </span>
    </div>
  </div>
</template>
