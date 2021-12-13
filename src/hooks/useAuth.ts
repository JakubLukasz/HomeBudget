import { useContext } from 'react'
import { AuthContext } from '@Contexts/AuthContext'
import { IAuthCtx } from '@/types'

export const useAuth = (): IAuthCtx => {
  return useContext(AuthContext)
}
