import { useContext } from 'react'
import { FirestoreContext } from '@Contexts/FirestoreContext'
import { IFirestoreCtx } from '@/types'

export const useFirestore = (): IFirestoreCtx => {
  return useContext(FirestoreContext)
}
