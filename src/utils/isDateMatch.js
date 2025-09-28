export const isDateMatch = (entryDate, targetDate) => {
  return entryDate.toISOString().split("T")[0] === targetDate;
};
