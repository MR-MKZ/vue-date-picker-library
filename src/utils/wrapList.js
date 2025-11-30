const wrapList = (list, count = 2) => {
  if (!Array.isArray(list)) return [];
  if (list.length <= 5) return list.map((i) => ({ value: i, zone: "original" }));

  const start = list.slice(0, count).map((i) => ({ value: i, zone: "head" }));
  const end = list.slice(list.length - count).map((i) => ({ value: i, zone: "tail" }));
  const middle = list.map((i) => ({ value: i, zone: "original" }));

  return [...end, ...middle, ...start];
};

export default wrapList;
