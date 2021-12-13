import React, { createContext, useEffect, useState } from 'react'
import { auth } from '@Services/firebase'
import firebase from 'firebase/app'
import { IAuthCtx } from '@/types'

// {
//   currentUser: null,
//   login: () => undefined,
//   signup: () => undefined,
//   logout: () => undefined,
//   resetPassword: () => undefined,
// }

export const AuthContext = createContext({} as IAuthCtx)

export const AuthContextProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

  const signup = (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const login = (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = (): Promise<void> => auth.signOut()

  const resetPassword = (email: string): Promise<void> =>
    auth.sendPasswordResetEmail(email)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: firebase.User): void =>
      setCurrentUser(user)
    )
    return () => unsubscribe()
  }, [])

  const authCtx = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
  }

  return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
}
