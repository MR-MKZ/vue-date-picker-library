<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { englishToPersianDigit, persianToEnglish } from "@/utils/replaceNumbers";
import { splitDateParts } from "@/utils/splitDateParts";
import wrapList from "@/helpers/wrapList";

const props = defineProps({
  availableMonths: { type: Array, required: true },
  availableYears: { type: Array, required: true },
  calendarEngine: { type: Object, required: true },
  today: { type: Object, required: true },
  minDate: { type: String, required: true },
  maxDate: { type: String, required: true },
});

const emit = defineEmits(["changed", "update-month", "update-year"]);

const minDateParts = splitDateParts(props.minDate);
const maxDateParts = splitDateParts(props.maxDate);

const selectedDate = reactive({ ...props.today });
const dayColumnRef = ref(null);
const monthColumnRef = ref(null);
const yearColumnRef = ref(null);
const skipInitialEmit = ref(true);

const scrollableDays = computed(() => wrapList(filteredDays.value));
const scrollableMonths = computed(() => wrapList(filteredMonths.value));
const scrollableYears = computed(() => wrapList(props.availableYears));

const filteredMonths = computed(() => {
  if (selectedDate.year === minDateParts[0] && selectedDate.year === maxDateParts[0])
    return props.availableMonths.filter(
      (_, idx) => idx + 1 >= minDateParts[1] && idx + 1 <= maxDateParts[1],
    );
  if (selectedDate.year === minDateParts[0])
    return props.availableMonths.filter((_, idx) => idx + 1 >= minDateParts[1]);
  if (selectedDate.year === maxDateParts[0])
    return props.availableMonths.filter((_, idx) => idx + 1 <= maxDateParts[1]);
  return props.availableMonths;
});

const filteredDays = computed(() => {
  const grid = props.calendarEngine.calendarGrid.value.filter((i) => i.current);
  const days = grid.map((i) => i.day);
  if (selectedDate.year === minDateParts[0] && selectedDate.month === minDateParts[1])
    return days.filter((day) => day >= minDateParts[2]);
  if (selectedDate.year === maxDateParts[0] && selectedDate.month === maxDateParts[1])
    return days.filter((day) => day <= maxDateParts[2]);
  return days;
});

const getCenterVisibleItem = (container) => {
  if (!container) return null;
  const center = getContainerCenter(container);
  return getClosestChildToCenter(container.children, center);
};

const getClosestChildToCenter = (children, center) => {
  let closestElement = null;
  let smallestDistance = Infinity;
  for (const child of children) {
    const childCenter = child.offsetTop + child.offsetHeight / 2;
    const distance = Math.abs(childCenter - center);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestElement = child;
    }
  }
  return closestElement;
};

const getContainerCenter = (container) => container.scrollTop + container.clientHeight / 2;

const clampSelectedDateWithinRange = () => {
  const num = clampDateValue(selectedDate);
  const year = Math.floor(num / 10000);
  const month = Math.floor((num % 10000) / 100);
  const day = num % 100;
  selectedDate.year = year;
  selectedDate.month = month;
  selectedDate.day = day;
};

const clampDateValue = ({ year, month, day }) => {
  const num = year * 10000 + month * 100 + day;
  const minNum = minDateParts[0] * 10000 + minDateParts[1] * 100 + minDateParts[2];
  const maxNum = maxDateParts[0] * 10000 + maxDateParts[1] * 100 + maxDateParts[2];
  if (num < minNum) return minNum;
  if (num > maxNum) return maxNum;
  return num;
};

watch([() => selectedDate.year, () => selectedDate.month], () => {
  emit("update-year", selectedDate.year);
  emit("update-month", selectedDate.month);
});

const handlers = {
  day: (num) => (selectedDate.day = Number(persianToEnglish(num))),
  month: (num) => (selectedDate.month = filteredMonths.value.indexOf(num) + 1),
  year: (num) => (selectedDate.year = Number(persianToEnglish(num))),
};

const makeScrollHandler = (ref, key) => {
  return () => {
    const element = getCenterVisibleItem(ref.value);
    if (!element) return;
    handlers[key](element.innerText);
    clampSelectedDateWithinRange();
  };
};

const handleDayScroll = makeScrollHandler(dayColumnRef, "day");
const handleMonthScroll = makeScrollHandler(monthColumnRef, "month");
const handleYearScroll = makeScrollHandler(yearColumnRef, "year");

useInfiniteScroll(dayColumnRef, () => filteredDays.value);
useInfiniteScroll(monthColumnRef, () => filteredMonths.value);
useInfiniteScroll(yearColumnRef, () => props.availableYears);

watch(
  () => [selectedDate.year, selectedDate.month, selectedDate.day],
  () => {
    if (skipInitialEmit.value) return;
    emit("changed", { status: true, ...selectedDate });
  },
);

const scrollColumnToCurrentDate = (ref) => {
  const element = ref.value?.querySelector(".calendar__block__text--today");
  if (element) element.scrollIntoView({ block: "center" });
};

onMounted(async () => {
  await nextTick();
  [dayColumnRef, monthColumnRef, yearColumnRef].forEach(scrollColumnToCurrentDate);
  skipInitialEmit.value = false;
});
</script>

<template>
  <div class="calendar">
    <div class="calendar__block" ref="dayColumnRef" @scroll="handleDayScroll">
      <span
        v-for="(item, i) in scrollableDays"
        :key="i"
        class="calendar__block__text"
        :class="{
          'calendar__block__text--today':
            selectedDate.day === item.value && item.zone === 'original',
        }"
      >
        {{ englishToPersianDigit(item.value) }}
      </span>
    </div>
    <div class="calendar__block" ref="monthColumnRef" @scroll="handleMonthScroll">
      <span
        v-for="(item, i) in scrollableMonths"
        :key="i"
        class="calendar__block__text"
        :class="{
          'calendar__block__text--today':
            selectedDate.month === filteredMonths.indexOf(item.value) + 1 &&
            item.zone === 'original',
        }"
      >
        {{ item.value }}
      </span>
    </div>
    <div class="calendar__block" ref="yearColumnRef" @scroll="handleYearScroll">
      <span
        v-for="(item, i) in scrollableYears"
        :key="i"
        class="calendar__block__text"
        :class="{
          'calendar__block__text--today':
            selectedDate.year === item.value && item.zone === 'original',
        }"
      >
        {{ englishToPersianDigit(item.value) }}
      </span>
    </div>
  </div>
</template>
