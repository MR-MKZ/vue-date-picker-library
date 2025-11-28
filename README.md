# moli-datepicker

> A vue responsive UI library to select jalali date and time

## Installation

### npm

```bash
npm install moli-datepicker --save
```

### Usage

```vue
<script setup>
import MoliDatepicker from "moli-datepicker";
const date = ref("");
</script>

<template>
  <moli-datepicker v-model="date" />
</template>
```

## 🎯 Common Props

calender component accept these common props:

| Prop     | Type      | Default                   | Description                 | Other options             |
| -------- | --------- | ------------------------- | --------------------------- | ------------------------- |
| `format` | `string`  | `"YYYY/MM/DD"`            | Format of the dates         | `YYYY.MM.DD` `YYYY-MM-DD` |
| `min`    | `string`  | `1400/1/1`                | min age that calender shows | `any`                     |
| `max`    | `string`  | `end of the current year` | max age that calender shows | `any`                     |
| `mode`   | `string`  | `single`                  | change the mode of calender | `multiple` `range`        |
| `assign` | `boolean` | `false`                   | assign to a input           | `true`                    |

## Built With

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework.
- [moment-jalaali](https://github.com/jalaali/moment-jalaali) - A Jalaali (Jalali, Persian, Khorshidi, Shamsi) calendar system plugin for moment.js.

## Change log

### 1.0.0 (2025-11-28)
