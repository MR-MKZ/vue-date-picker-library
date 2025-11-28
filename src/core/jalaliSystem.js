import moment from "moment-jalaali";

const parse = (year, month, day) => moment(`${year}-${month}-${day}`, "jYYYY-jMM-jDD");
const getDaysInMonth = (year, month) => moment.jDaysInMonth(year, month - 1);
const getFirstWeekday = (year, month) => (parse(year, month, 1).day() + 1) % 7;
const getPreviousMonth = (year, month) => {
  const m = parse(year, month, 1).subtract(1, "jMonth");
  return { year: m.jYear(), month: m.jMonth() + 1 };
};
const getNextMonth = (year, month) => {
  const m = parse(year, month, 1).add(1, "jMonth");
  return { year: m.jYear(), month: m.jMonth() + 1 };
};

export const jalaliAdapter = { getDaysInMonth, getFirstWeekday, getPreviousMonth, getNextMonth };
