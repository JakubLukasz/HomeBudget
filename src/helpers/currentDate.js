export const currentDate = () => {
  const today = new Date();
  const currentDay = String(today.getDate());
  const currentMonth = String(today.getMonth() + 1);
  const currentYear = String(today.getFullYear());
  const date = `${currentDay}.${currentMonth}.${currentYear}`;
  return { currentDay, currentMonth, currentYear, date };
};
