import firebase from 'firebase/app'

interface IDataset {
  data: number[]
  backgroundColor: string[]
  hoverOffset: number
}

export interface IMonth {
  name: string
  id: string
}

export interface ITransaction {
  id: string
  title: string
  category: string
  date: string
  amount: number
  isSpent: boolean
  currency: string
}

export interface IUserData {
  currency: string
  earnings: number
  firstname: string
  isConfigured: boolean
  moneyLeft: number
  payday: string
  paydayData: string[]
  email?: string
  uid?: string
}

export interface IExpense {
  id: string
  title: string
  months: IMonth[]
  dayOfCollection: string
  amount: number
  category: string
  isSpent: boolean
  currency: string
  expenseCollection: string[]
}

export interface IPayday {
  paydayData: string[]
  payday: string
  earnings: number
}

export interface IGroupedCategoryObj {
  category: string
  amount: number
}

export interface IDoughnutRecipe {
  labels: string[]
  datasets: IDataset[]
}

export interface IGraph {
  title: string
  data: IDoughnutRecipe
}

export interface IFirestoreCtx {
  createUserData: ({
    email,
    uid,
  }: {
    email: string
    uid: string
  }) => Promise<void>
  setupUserData: (setupData: IUserData) => void
  checkIsUserConfigured: (user: { uid: string }) => Promise<any>
  getUserData: () => Promise<IUserData>
  getCurrency: () => Promise<string>
  checkPayday: () => Promise<void>
  isConfigured: boolean
  setIsConfigured: React.Dispatch<React.SetStateAction<boolean>>
  checkExpense: (expense: IExpense) => void
  addNewExpense: (expense: IExpense) => void
  updateEarnings: (earnings: number) => void
  addNewBill: (bill: ITransaction) => void
  removeFromCollection: (collectionName: string, id: string) => void
  createGuestData: (
    { email, uid }: { email: string; uid: string },
    username: string
  ) => Promise<void>
  getUnusedTransactionsId: () => Promise<string>
  getUnusedExpensesId: () => Promise<string>
  getTransactionsData: () => Promise<ITransaction[]>
  getExpensesData: () => Promise<IExpense[]>
}

export interface IAuthCtx {
  currentUser: firebase.User | null
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

export interface IUiCtx {
  isBillModalOpen: boolean
  setIsBillModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isExpensesModalOpen: boolean
  setIsExpensesModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isEarningsModalOpen: boolean
  setIsEarningsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
