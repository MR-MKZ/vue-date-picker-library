<script setup>
import { ref, reactive, onMounted, nextTick, computed } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { englishToPersianDigit } from "@/utils/replaceNumbers";

const props = defineProps({
  activeLang: String,
  months: Array,
  years: Array,
  engine: Object,
  today: Object,
});

const todayDate = reactive({ ...props.today });

const dayRef = ref(null);
const monthRef = ref(null);
const yearRef = ref(null);

const currentGrid = computed(() => props.engine.grid.value.filter((item) => item.current));

useInfiniteScroll(dayRef, () => props.engine.grid.value, { distance: 32 });
useInfiniteScroll(monthRef, () => props.months, { distance: 32 });
useInfiniteScroll(yearRef, () => props.years, { distance: 32 });

onMounted(async () => {
  await nextTick();
  const todayDayEl = dayRef.value.querySelector(".selected");
  if (todayDayEl) todayDayEl.scrollIntoView({ block: "center" });

  const todayMonthEl = monthRef.value.querySelector(".selected");
  if (todayMonthEl) todayMonthEl.scrollIntoView({ block: "center" });

  const todayYearEl = yearRef.value.querySelector(".selected");
  if (todayYearEl) todayYearEl.scrollIntoView({ block: "center" });
});
</script>

<template>
  <div class="calender">
    <div class="calender__block" ref="dayRef">
      <span
        v-for="item in currentGrid"
        :key="item.day"
        :class="{ selected: todayDate.day === item.day }"
        class="calender__block--text"
      >
        {{ item.current && englishToPersianDigit(item.day) }}
      </span>
    </div>
    <div class="calender__block" ref="monthRef">
      <span
        v-for="(month, i) in months"
        :key="i"
        class="calender__block--text"
        :class="{ selected: todayDate.month - 1 === i % props.months.length }"
      >
        {{ month }}
      </span>
    </div>
    <div class="calender__block" ref="yearRef">
      <span
        v-for="year in years"
        :key="year"
        class="calender__block--text"
        :class="{ selected: todayDate.year === year }"
      >
        {{ englishToPersianDigit(year) }}
      </span>
    </div>
  </div>
</template>
