import { useContext } from 'react'
import { UiContext } from '@Contexts/UiContext'
import { IUiCtx } from '@/types'

export const useUi = (): IUiCtx => {
  return useContext(UiContext)
}
