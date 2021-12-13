import React, { createContext, useState } from 'react'
import { IUiCtx } from '@/types'

// {
//   isBillModalOpen: false,
//   setIsBillModalOpen: () => undefined,
//   isExpensesModalOpen: false,
//   setIsExpensesModalOpen: () => undefined,
//   isEarningsModalOpen: false,
//   setIsEarningsModalOpen: () => undefined,
// }

export const UiContext = createContext({} as IUiCtx)

export const UiContextProvider: React.FC = ({ children }) => {
  const [isBillModalOpen, setIsBillModalOpen] = useState(false)
  const [isExpensesModalOpen, setIsExpensesModalOpen] = useState(false)
  const [isEarningsModalOpen, setIsEarningsModalOpen] = useState(false)

  const ctx = {
    isBillModalOpen,
    setIsBillModalOpen,
    isExpensesModalOpen,
    setIsExpensesModalOpen,
    isEarningsModalOpen,
    setIsEarningsModalOpen,
  }

  return <UiContext.Provider value={ctx}>{children}</UiContext.Provider>
}
