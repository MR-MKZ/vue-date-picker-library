import moment from "moment-jalaali";

const getDaysInMonth = (year, month) => moment.jDaysInMonth(year, month - 1);

const getFirstWeekday = (year, month) => {
  const m = moment(`${year}-${month}-01`, "jYYYY-jMM-jDD");
  return (m.day() + 1) % 7;
};

const getPreviousMonth = (year, month) => {
  const m = moment(`${year}-${month}-01`, "jYYYY-jMM-jDD").subtract(1, "jMonth");
  return { year: m.jYear(), month: m.jMonth() + 1 };
};

const getNextMonth = (year, month) => {
  const m = moment(`${year}-${month}-01`, "jYYYY-jMM-jDD").add(1, "jMonth");
  return { year: m.jYear(), month: m.jMonth() + 1 };
};

export const jalaliAdapter = {
  getDaysInMonth,
  getFirstWeekday,
  getPreviousMonth,
  getNextMonth,
};
