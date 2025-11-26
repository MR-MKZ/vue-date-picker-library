import { jalaliAdapter } from "@/core/jalaliSystem";

const langDates = {
  langs: {
    fa: {
      calendar: "jalali",
      adaptor: jalaliAdapter,
      weekdays: ["شنبه", "۱شنبه", "۲شنبه", "۳شنبه", "۴شنبه", "۵شنبه", "جمعه"],
      months: [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ],
      translations: {
        label: "شمسی",
      },
    },
  },
};

export { langDates };
