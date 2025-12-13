<script setup>
import { ref, watch, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { updateMultiple, updateRange, updateSingle } from "@/helpers/updateDates";
import useGetProvidersData from "@/composables/useGetProvidersData";
import IconClose from "@/components/icons/icon-close.vue";
import BaseButton from "@/components/ui/base-button.vue";
import GridFilter from "@/components/common/grid-filter.vue";
import GridDays from "@/components/common/grid-days.vue";
import GridMonths from "@/components/common/grid-months.vue";
import GridYears from "@/components/common/grid-years.vue";
import GridClock from "@/components/common/grid-clock.vue";

const props = defineProps({
  selectionMode: {
    type: String,
    default: "single",
    validator: (value) => ["single", "range", "multiple"].includes(value),
  },
  availableMonths: { type: Array, required: true },
  availableYears: { type: Array, required: true },
  today: { type: Object, required: true },
  calenderEngine: { type: Object, required: true },
  pickerType: { type: String, required: true },
});
const currentView = ref(props.pickerType === "clock" ? "clock" : "days");
const selectedDates = reactive({
  single: { year: null, month: null, day: null, time: { hour: "00", minute: "00" } },
  range: { start: {}, end: {} },
  multiple: [],
});
const { locale, getLocaleMessage } = useI18n();
const providerData = useGetProvidersData(
  getLocaleMessage,
  locale,
  selectedDates.single,
  props.today,
);

watch([selectedDates.single], () => {
  selectedDates.range = { start: {}, end: {} };
  syncEngine(selectedDates.single.year, selectedDates.single.month);
});

watch([selectedDates.range, () => selectedDates.single, selectedDates.multiple], () =>
  emit("changed"),
);

const selectionHandlers = {
  single: (cell) => updateSingle(cell, selectedDates),
  multiple: (cell) => updateMultiple(cell, selectedDates),
  range: (cell) => updateRange(cell, selectedDates),
};

const handleDayClick = (cell) => {
  selectionHandlers[props.selectionMode]?.(cell);
  if (props.pickerType !== "date" && props.selectionMode === "single") currentView.value = "clock";
};

const handleMonthClick = (selectedDate) => {
  selectedDates.single.month = selectedDate.month + 1;
  selectedDates.single.day = null;
  if (!selectedDates.single.year) selectedDates.single.year = selectedDate.year;
  currentView.value = "days";
};

const syncEngine = (year, month) => {
  emit("update-year", year);
  emit("update-month", month);
};

const handleYearClick = ({ year }) => {
  selectedDates.single.year = year;
  currentView.value = "months";
};

const handleTimeChange = (time) => (selectedDates.single.time = time);

const emit = defineEmits(["date", "changed", "closed", "update-year", "update-month"]);

function buildOutputDateValue() {
  if (props.pickerType === "clock") {
    return {
      value: `${selectedDates.single?.time?.hour}:${selectedDates.single?.time?.minute}`,
    };
  }
  switch (props.selectionMode) {
    case "range":
      const start = selectedDates.range.start;
      const end = selectedDates.range.end;
      if (!start.day || !end.day) return null;
      return {
        value: `${start.year}/${start.month}/${start.day} | ${end.year}/${end.month}/${end.day}`,
      };
    case "multiple":
      return { value: selectedDates.multiple.length ? selectedDates.multiple : null };
    case "single":
      const single = selectedDates.single;
      const timeTemplate = ` - ${single?.time?.hour}:${single?.time?.minute}`;
      return single.day
        ? {
            value: `${single.year}/${single.month}/${single.day}${props.pickerType !== "date" ? timeTemplate : ""}`,
          }
        : null;
  }
  return null;
}

const submitSelection = () => {
  const finalDate = buildOutputDateValue();
  emit("date", finalDate);
  emit("closed");
  syncEngine(props.today.year, props.today.month);
};
</script>

<template>
  <header class="header">
    <icon-close class="header__close" @click="$emit('closed')" />
    <p class="header__title">{{ providerData.mainText }}</p>
  </header>
  <div class="content">
    <grid-filter
      :current-month-text="providerData.currentMonthText.value"
      :current-view="currentView"
      :year="
        selectedDates.single.year
          ? selectedDates.single.year
          : calenderEngine.calendarGrid.value[0].year
      "
      @update:current-view="currentView = $event.current"
      v-if="pickerType !== 'clock'"
    />
    <div
      class="content__weekdays"
      v-if="currentView === 'days' && pickerType !== 'clock'"
      :dir="providerData.direction.value"
    >
      <span
        class="content__weekdays__day"
        v-for="weekday in providerData?.weekdays.value"
        :key="weekday"
      >
        {{ weekday }}
      </span>
    </div>
    <grid-clock
      v-if="pickerType !== 'date'"
      :current-view="currentView"
      @changed="handleTimeChange"
    />
    <grid-days
      v-if="pickerType !== 'clock'"
      :selection-mode="selectionMode"
      :current-view="currentView"
      :selected-dates="selectedDates"
      :today="today"
      :locale="locale"
      :today-text="providerData.todayText.value"
      :calender-engine="calenderEngine"
      :dir="providerData.direction.value"
      @clicked="handleDayClick"
    />
    <grid-months
      v-if="pickerType !== 'clock'"
      :current-view="currentView"
      :selected-dates="selectedDates.single.month ? selectedDates.single : today"
      :available-months="availableMonths"
      :dir="providerData.direction.value"
      @clicked="handleMonthClick"
    />
    <grid-years
      v-if="pickerType !== 'clock'"
      :current-view="currentView"
      :selected-dates="selectedDates.single.month ? selectedDates.single : today"
      :available-years="availableYears"
      :dir="providerData.direction.value"
      @clicked="handleYearClick"
      :locale="locale"
    />
    <base-button :text="locale === 'jalaali' ? 'تایید' : 'submit'" @click="submitSelection" />
  </div>
</template>
