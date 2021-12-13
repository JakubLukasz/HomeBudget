import dayjs from 'dayjs'

interface DayObject {
  currentDay: string
  currentMonth: string
  currentYear: string
  date: string
}

export const currentDate = (): DayObject => {
  const todaysDate = dayjs().format('YYYY-MM-DD').split('-')
  const currentDay = todaysDate[2]
  const currentMonth = todaysDate[1]
  const currentYear = todaysDate[0]
  const date = `${currentYear}.${currentMonth}.${currentDay}`
  return { currentDay, currentMonth, currentYear, date }
}
