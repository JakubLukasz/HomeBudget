import React, { useState, createContext } from 'react'
import dayjs from 'dayjs'
import { db } from '@Services/firebase'
import { useAuth } from '@Hooks/useAuth'
import { currentDate } from '@Helpers/currentDate'
import { uniqueKey } from '@Helpers/uniqueKey'
import {
  IFirestoreCtx,
  ITransaction,
  IUserData,
  IExpense,
  IPayday,
  IMonth,
} from '@/types'

export const FirestoreContext = createContext({} as IFirestoreCtx)

export const FirestoreContextProvider: React.FC = ({ children }) => {
  const [isConfigured, setIsConfigured] = useState(true)
  const { currentUser } = useAuth()

  const createUserData = async ({
    email,
    uid,
  }: {
    email: string
    uid: string
  }): Promise<void> => {
    const userDoc = db.collection('users').doc(uid)
    const userData = {
      uid,
      email,
      isConfigured: false,
    }
    setIsConfigured(false)
    await userDoc.set(userData)
  }

  const createGuestData = async (
    { email, uid }: { email: string; uid: string },
    username: string
  ): Promise<void> => {
    const userDoc = db.collection('users').doc(uid)
    await userDoc.set({
      uid,
      email,
      isConfigured: true,
      payday: '01',
      firstname: username,
      earnings: 3000,
      moneyLeft: 0,
      paydayData: [],
      currency: 'zł',
    })
  }

  const setupUserData = async (setupData: IUserData): Promise<void> => {
    const userRef = db.collection('users').doc(currentUser.uid)
    await userRef.update(setupData)
  }

  const getTransactionsData = async (): Promise<ITransaction[]> => {
    const ref = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('transactions')
    const tmp: ITransaction[] = []
    const docs = await ref.get()
    docs.forEach((doc) => tmp.push(doc.data() as ITransaction))
    return tmp
  }

  const getExpensesData = async (): Promise<IExpense[]> => {
    const ref = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('expenses')
    const tmp: IExpense[] = []
    const docs = await ref.get()
    docs.forEach((doc) => tmp.push(doc.data() as IExpense))
    return tmp
  }

  const getUnusedTransactionsId = async (): Promise<string> => {
    const collection = await getTransactionsData()
    const randomId = getRandomId(collection)
    return randomId
  }

  const getUnusedExpensesId = async (): Promise<string> => {
    const collection = await getExpensesData()
    const randomId = getRandomId(collection)
    return randomId
  }

  const getRandomId = (array: ITransaction[] | IExpense[]): string => {
    const randomId = uniqueKey()
    array.forEach(({ id }) => {
      if (id === randomId) {
        return getRandomId(array)
      }
    })
    return randomId
  }

  const getUserData = async (uid = currentUser.uid): Promise<IUserData> => {
    const userRef = db.collection('users').doc(uid)
    const doc = await userRef.get()
    return doc.data() as IUserData
  }

  const getCurrency = async (): Promise<string> => {
    const { currency } = await getUserData()
    return currency
  }

  const checkIsUserConfigured = async (user: { uid: string }): Promise<any> => {
    const data = await getUserData(user.uid)
    setIsConfigured(data.isConfigured)
  }

  const executePayday = async (
    data: IPayday,
    paydayCollectionDate: string
  ): Promise<void> => {
    const userRef = db.collection('users').doc(currentUser.uid)
    const id = await getUnusedTransactionsId()
    const currency = await getCurrency()
    const { earnings, paydayData } = data
    paydayData.push(paydayCollectionDate)
    userRef.update({
      paydayData,
    })
    addNewBill({
      id,
      title: 'Payday',
      category: 'Payday',
      date: dayjs().format('YYYY-MM-DD'),
      amount: earnings,
      isSpent: false,
      currency,
    })
  }

  const updateEarnings = (earnings: number): void => {
    const userRef = db.collection('users').doc(currentUser.uid)
    userRef.update({ earnings })
  }

  const checkPayday = async (): Promise<void> => {
    const { currentDay, currentMonth, currentYear } = currentDate()
    const data = await getUserData()
    const { paydayData, payday } = data
    const paydayCollectionDate = `${currentYear}-${currentMonth}-${payday}`
    const isPaydayCollected = paydayData.includes(paydayCollectionDate)
    if (currentDay >= payday && !isPaydayCollected)
      executePayday(data, paydayCollectionDate)
  }

  const executeExpense = async (
    expense: IExpense,
    expenseCollectionDate: string
  ): Promise<void> => {
    const { title, amount, isSpent, id, expenseCollection, category } = expense
    const userRef = db.collection('users').doc(currentUser.uid)
    const expenseRef = userRef.collection('expenses').doc(id)
    expenseCollection.push(expenseCollectionDate)
    expenseRef.update({
      expenseCollection,
    })
    const ID = await getUnusedTransactionsId()
    const currency = await getCurrency()
    addNewBill({
      id: ID,
      title,
      category,
      date: dayjs(expenseCollectionDate).format('YYYY-MM-DD'),
      amount,
      isSpent,
      currency,
    })
  }

  const checkMonth = (months: IMonth[], currentMonth: string): boolean => {
    return months.some(({ id }) => id === currentMonth)
  }

  const checkExpense = (expense: IExpense): void => {
    const { currentDay, currentMonth, currentYear } = currentDate()
    const { dayOfCollection, months, expenseCollection } = expense
    const expenseCollectionDate = `${currentYear}-${currentMonth}-${dayOfCollection}`
    const isMonthIncluded = checkMonth(months, currentMonth)
    const isMonthCollected = expenseCollection.includes(expenseCollectionDate)
    if (currentDay >= dayOfCollection && isMonthIncluded && !isMonthCollected)
      executeExpense(expense, expenseCollectionDate)
  }

  const removeFromCollection = (collectionName: string, id: string): void => {
    const ref = db
      .collection('users')
      .doc(currentUser.uid)
      .collection(collectionName)
    ref.doc(id).delete()
  }

  const addNewBill = (bill: ITransaction): void => {
    const transactionsRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('transactions')
    transactionsRef.add(bill)
    updateTotal(bill)
  }

  const addNewExpense = (expense: IExpense): void => {
    const { id } = expense
    const expensesRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('expenses')
      .doc(id)
    expensesRef.set(expense)
  }

  const updateTotal = async ({
    amount,
    isSpent,
  }: {
    amount: number
    isSpent: boolean
  }): Promise<void> => {
    const { moneyLeft } = await getUserData()
    const userRef = db.collection('users').doc(currentUser.uid)
    const value = isSpent ? moneyLeft - amount : moneyLeft + amount
    userRef.update({
      moneyLeft: value,
    })
  }

  const ctx = {
    createUserData,
    setupUserData,
    checkIsUserConfigured,
    getUserData,
    getCurrency,
    checkPayday,
    isConfigured,
    setIsConfigured,
    checkExpense,
    addNewExpense,
    updateEarnings,
    addNewBill,
    removeFromCollection,
    getUnusedTransactionsId,
    getUnusedExpensesId,
    getTransactionsData,
    getExpensesData,
    createGuestData,
  }

  return (
    <FirestoreContext.Provider value={ctx}>
      {children}
    </FirestoreContext.Provider>
  )
}
