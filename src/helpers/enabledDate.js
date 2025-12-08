const enabledDate = (year, month, day, limits) => {
  if (!Array.isArray(limits) || limits.length !== 2) return false;

  const parse = (str) => {
    const [yy, mm, dd] = str.split("/").map(Number);
    return yy * 10000 + mm * 100 + dd;
  };

  const target = year * 10000 + month * 100 + day;
  const minValue = parse(limits[0]);
  const maxValue = parse(limits[1]);
  return target >= minValue && target <= maxValue;
};

export default enabledDate;
