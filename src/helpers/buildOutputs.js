const buildSingleOutput = (selectedDates, pickerType) => {
  const single = selectedDates.single;
  const timeTemplate = ` - ${single.time?.hour}:${single.time?.minute}`;
  const dateTemplate = `${single.year}/${single.month}/${single.day}${pickerType !== "date" ? timeTemplate : ""}`;
  return single.day ? { value: dateTemplate } : null;
};

const buildRangeOutput = (selectedDates) => {
  const start = selectedDates.range.start;
  const end = selectedDates.range.end;
  if (!start.day || !end.day) return null;
  const dateTemplate = `${start.year}/${start.month}/${start.day} | ${end.year}/${end.month}/${end.day}`;
  return { value: dateTemplate };
};

const buildMultipleOutput = (selectedDates) => ({
  value: selectedDates.multiple.length ? selectedDates.multiple : null,
});

const buildClockOutput = (selectedDates) => {
  const hourTemplate = `${selectedDates.single?.time?.hour}:${selectedDates.single?.time?.minute}`;
  return { value: hourTemplate };
};

export const buildOutputs = {
  buildSingleOutput,
  buildRangeOutput,
  buildMultipleOutput,
  buildClockOutput,
};
