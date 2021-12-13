import { categories } from '@Helpers/constantData'

export const getIconByName = (iconName: string): any => {
  const { icon } = categories.find(({ list }) =>
    list.some((val) => val === iconName)
  )
  return icon
}
