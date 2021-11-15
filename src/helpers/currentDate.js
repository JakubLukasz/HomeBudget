import dayjs from "dayjs";

export const currentDate = () => {
  const todaysDate = dayjs().format('YYYY-MM-DD').split('-');
  const currentDay = todaysDate[2];
  const currentMonth = todaysDate[1];
  const currentYear = todaysDate[0];
  const date = `${currentYear}.${currentMonth}.${currentDay}`;
  return { currentDay, currentMonth, currentYear, date };
};
