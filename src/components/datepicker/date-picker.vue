<script setup>
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useCalendar } from "@/composables/useCalenderCreator";
import { parseDate } from "@/utils/parseDate";
import useGetToday from "@/composables/useGetToday";
import dateFormatter from "@/helpers/dateFormatter";
import MobileDatepicker from "@/components/datepicker/mobile-datepicker.vue";
import DesktopDatepicker from "@/components/datepicker/desktop-datepicker.vue";
import BaseInput from "@/components/ui/base-input.vue";

const props = defineProps({
  min: { type: String, default: "1404/01/08" },
  max: { type: String, default: "2026/12/08" },
  defaults: { type: Array, default: [] },
  headless: { type: Boolean, default: false },
  locales: { type: Boolean, default: true },
  mode: {
    type: String,
    default: "single",
    validator(value) {
      return ["range", "single", "multiple"].includes(value);
    },
  },
  format: "YYYY/MM/DD",
});

const emit = defineEmits(["close", "open", "changed"]);
const model = defineModel();

const { locale, getLocaleMessage } = useI18n();
const showCalender = ref(props.headless);
const dateText = ref("");

const provider = computed(() => getLocaleMessage(locale.value).provider);
const months = computed(() => getLocaleMessage(locale.value).months);
const today = computed(() => useGetToday(locale.value));
const engine = computed(() => useCalendar(provider.value, today.value, [props.min, props.max]));
const defaultDates = computed(() => {
  const defaults = props.defaults;
  if (props.mode === "single") {
    if (!defaults[0]) return null;
    const [year, month, day] = parseDate(defaults[0]);
    return `${year}/${month}/${day}`;
  }
  if (props.mode === "range") {
    if (props.defaults.length < 2) return null;
    const [startYear, startMonth, startDay] = parseDate(defaults[0]);
    const [endYear, endMonth, endDay] = parseDate(defaults[1]);
    return `${startYear}/${startMonth}/${startDay} | ${endYear}/${endMonth}/${endDay}`;
  }
  if (props.mode === "multiple") {
    if (props.defaults.length < 1) return null;
    return props.defaults.map((item) => {
      const [year, month, day] = item.split("/");
      return { year, month, day };
    });
  }
});
const years = computed(() => {
  let start = parseDate(props.min)[0];
  let end = parseDate(props.max)[0];
  return [...Array(end - start + 1).keys()].map((i) => start + i);
});

const formatDate = (date) => {
  const result = date ? date : defaultDates.value;
  const formattedDate = dateFormatter(result, props.format);
  if (typeof formattedDate === "object" && !Array.isArray(formattedDate))
    model.value = formattedDate.text;
  else model.value = formattedDate;

  if (!props.headless) showCalender.value = false;
  else emit("close");
};

watch(showCalender, (value) => {
  if (!props.headless && value) emit("open");
});

const closeHandler = () => {
  if (!props.headless) showCalender.value = false;
  emit("close");
};

const changeDateHandler = (item) => {
  if (item?.status) {
    const formattedDate = dateFormatter(item.date, props.format);
    model.value = formattedDate;
    if (typeof formattedDate === "object") model.value = formattedDate.text;
  }
  emit("changed");
};
</script>

<template>
  <div class="datepicker">
    <div v-if="showCalender" class="overlay" @click="closeHandler"></div>
    <div class="container" v-if="showCalender">
      <desktop-datepicker
        :months="months"
        :years="years"
        @date="formatDate"
        @changed="changeDateHandler"
        @closed="closeHandler"
        :mode="props.mode"
        :engine="engine"
        :today-date="today"
      />
      <mobile-datepicker
        :months="months"
        :showCalender="showCalender"
        :years="years"
        @changed="changeDateHandler"
        :engine="engine"
        :today="today"
        :min="min"
        :max="max"
      />
    </div>
    <base-input
      v-if="!headless"
      @click="showCalender = true"
      :value="model"
      :placeholder="props.mode !== 'multiple' ? model : ''"
    />
  </div>
</template>
