<script setup>
import { computed, ref, watch } from "vue";
import { langDates } from "@/constants/langDates";
import { createCalendarEngine } from "@/composables/useCalenderEngine";
import useGetToday from "@/composables/useGetToday";
import dateFormatter from "@/utils/dateFormatter";
import MobileDatepicker from "@/components/mobile/mobile-datepicker.vue";
import DesktopDatepicker from "@/components/desktop/desktop-datepicker.vue";
import BaseInput from "@/components/ui/base-input.vue";

const props = defineProps({
  format: { type: String, default: "YYYY-MM-DD" },
  min: { type: String, default: "1400/01/01" },
  max: { type: String, default: "1410/01/15" },
  assign: { type: Boolean, default: false },
  mode: {
    type: String,
    default: "single",
    validator(value) {
      return ["range", "single"].includes(value);
    },
  },
});

const emit = defineEmits(["close", "open", "changed"]);
const model = defineModel();

const activeLang = ref("fa");
const result = ref("");
const showCalender = ref(props.assign ? true : false);
const today = useGetToday();

const adapter = computed(() => langDates.langs[activeLang.value].adapter);
const months = computed(() => langDates.langs[activeLang.value].months);
const engine = createCalendarEngine(adapter.value, today.year, today.month, true, [
  props.min,
  props.max,
]);

const years = computed(() => {
  const out = [];
  const start = Number(props.min.split("/")[0]);
  const end = Number(props.max.split("/")[0]);
  for (let y = start; y <= end; y++) out.push(y);
  return out;
});

const formatDate = (date) => {
  if (props.mode === "single") result.value = dateFormatter(date, props.format);
  else result.value = date;

  model.value = result.value;
  showCalender.value = false;
};

watch([showCalender], () => emit(showCalender.value ? "open" : "close"));
</script>

<template>
  <div class="container" v-if="showCalender">
    <desktop-datepicker
      :active-lang="activeLang"
      :months="months"
      :years="years"
      @date="formatDate"
      @changed="$emit('changed')"
      :mode="mode"
      :engine="engine"
      :today-date="today"
    />
    <mobile-datepicker
      :months="months"
      :showCalender="showCalender"
      :years="years"
      :active-lang="activeLang"
      :engine="engine"
      :today="today"
    />
  </div>
  <base-input
    v-if="!showCalender && !assign"
    @click="showCalender = true"
    :value="result"
    :placeholder="result"
  />
</template>
