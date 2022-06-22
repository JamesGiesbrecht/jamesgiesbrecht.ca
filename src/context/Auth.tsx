/* eslint-disable prefer-destructuring */
import { useState, useEffect, useContext, createContext, FC, useMemo } from 'react'
import axios, { AxiosInstance } from 'axios'
import { initializeApp } from 'firebase/app'
import { Analytics, getAnalytics } from 'firebase/analytics'
import { signInWithPopup, OAuthProvider, User, UserCredential, getAuth } from 'firebase/auth'

import { firebaseConfig } from '../firebase/config'

let firebaseAnalytics: Analytics

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)

if (firebaseApp.name && typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  firebaseAnalytics = getAnalytics(firebaseApp)
}

const NEXT_PUBLIC_ENV = process.env.NEXT_PUBLIC_ENV

interface AuthContextType {
  user: User | null
  api: AxiosInstance
  authInitialized: boolean
  logout: () => Promise<void>
  signInWithGoogle: () => Promise<UserCredential>
}

const noAuthProvider = () => {
  throw new Error('This component should be wrapper with a Auth Context Provider.')
}

const api = axios.create()

if (NEXT_PUBLIC_ENV === 'development') {
  api.interceptors.response.use(
    (response) => {
      // eslint-disable-next-line no-console
      console.log(response.config.url, response)
      return response
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.error(error)
      return Promise.reject(error)
    },
  )
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  api,
  authInitialized: false,
  logout: noAuthProvider,
  signInWithGoogle: noAuthProvider,
})

const googleAuthProvider = new OAuthProvider('google.com')

export const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null)
  const [authInitialized, setAuthInitialized] = useState<AuthContextType['authInitialized']>(false)

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        api.defaults.headers.common.Authorization = `Bearer ${await authUser.getIdToken()}`
      } else {
        api.defaults.headers.common.Authorization = ''
      }
      setAuthInitialized(true)
      setUser(authUser)
    })
    return () => {
      unsubscribe()
    }
  })

  const store = useMemo(
    () => ({
      user,
      api,
      authInitialized,
      logout: firebaseAuth.signOut.bind(firebaseAuth),
      signInWithGoogle: async () => signInWithPopup(firebaseAuth, googleAuthProvider),
    }),
    [user, authInitialized],
  )
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
