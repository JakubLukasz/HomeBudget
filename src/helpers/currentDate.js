export const currentDate = () => {
  const today = new Date();
  const currentDay = String(today.getDate()).padStart(2, '0');
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  const currentYear = String(today.getFullYear());
  const date = `${currentDay}.${currentMonth}.${currentYear}`;
  return { currentDay, currentMonth, currentYear, date };
};
