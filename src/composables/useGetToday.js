import { persianToEnglish } from "@/utils/replaceNumbers";

const options = { year: "numeric", month: "numeric", day: "numeric" };

const adapters = {
  fa: {
    locale: "fa-IR-u-ca-persian",
    parse(date) {
      const formatter = new Intl.DateTimeFormat(this.locale, options);

      const dates = formatter
        .format(date)
        .split("/")
        .map((item) => Number(persianToEnglish(item)));
      const [year, month, day] = dates;
      return { year, month, day };
    },
  },
};

const useGetToday = (locale = "fa") => {
  const adapter = adapters[locale];
  if (!adapter) throw new Error(`Unsupported locale: ${locale}`);
  const today = new Date();
  return adapter.parse(today);
};

export default useGetToday;
