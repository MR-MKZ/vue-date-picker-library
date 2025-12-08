import enabledDate from "@/helpers/enabledDate";
import { ref, computed } from "vue";

const DAYS_IN_GRID = 35;

export const useCalendar = (provider, initialDate, limits) => {
  const year = ref(initialDate.year);
  const month = ref(initialDate.month);
  const enabledCache = new Map();

  const updateYear = (y) => (year.value = y);
  const updateMonth = (m) => (month.value = m);

  const calendarGrid = computed(() => {
    const cells = [];

    const daysInCurrentMonth = provider.getDaysInMonth(year.value, month.value);
    const firstWeekday = provider.getFirstWeekday(year.value, month.value);

    const { year: previousYear, month: previousMonth } = provider.getPreviousMonth(
      year.value,
      month.value,
    );
    const daysInPreviousMonth = provider.getDaysInMonth(previousYear, previousMonth);

    for (let i = firstWeekday - 1; i >= 0; i--) {
      const day = daysInPreviousMonth - i;
      cells.push(createCell(previousYear, previousMonth, day, false));
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      cells.push(createCell(year.value, month.value, day, true));
    }

    const { year: nextYear, month: nextMonth } = provider.getNextMonth(year.value, month.value);
    const remainingCells = DAYS_IN_GRID - cells.length;
    for (let day = 1; day <= remainingCells; day++) {
      cells.push(createCell(nextYear, nextMonth, day, false));
    }

    return cells;
  });

  function isEnabled(year, month, day) {
    const key = `${year}-${month}-${day}`;
    if (!enabledCache.has(key)) {
      enabledCache.set(key, enabledDate(year, month, day, limits));
    }
    return enabledCache.get(key);
  }

  function createCell(cellYear, cellMonth, day, isCurrent) {
    return {
      year: cellYear,
      month: cellMonth,
      day,
      current: isCurrent,
      enable: isEnabled(cellYear, cellMonth, day),
    };
  }

  return { updateYear, updateMonth, calendarGrid };
};
