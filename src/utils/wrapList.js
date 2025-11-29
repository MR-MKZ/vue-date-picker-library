const wrapList = (list, count = 2) => {
  if (!Array.isArray(list)) return [];
  if (list.length <= 5) return [...list];

  const start = list.slice(0, count);
  const end = list.slice(list.length - count);

  return [...end, ...list, ...start];
};

export default wrapList;
