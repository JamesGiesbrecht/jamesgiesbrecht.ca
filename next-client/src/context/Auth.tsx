/* eslint-disable prefer-destructuring */
import { useState, useEffect, useContext, createContext, FC } from 'react'
import axios, { AxiosInstance } from 'axios'
import { signInWithPopup, OAuthProvider, User, UserCredential, getAuth } from 'firebase/auth'

import { firebaseApp } from '../firebase/config'

const NEXT_PUBLIC_PROXY = process.env.NEXT_PUBLIC_PROXY
const NEXT_PUBLIC_ENV = process.env.NEXT_PUBLIC_ENV

interface AuthContextType {
  user: User | null | undefined
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

if (NEXT_PUBLIC_PROXY) {
  api.defaults.baseURL = NEXT_PUBLIC_PROXY
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  api,
  authInitialized: false,
  logout: noAuthProvider,
  signInWithGoogle: noAuthProvider,
})

export const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>()
  const [authInitialized, setAuthInitialized] = useState<AuthContextType['authInitialized']>(false)
  const googleAuthProvider = new OAuthProvider('google.com')
  const firebaseAuth = getAuth(firebaseApp)

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

  // FIXME
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const store = {
    user,
    api,
    authInitialized,
    logout: firebaseAuth.signOut.bind(firebaseAuth),
    signInWithGoogle: async () => signInWithPopup(firebaseAuth, googleAuthProvider),
  }
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
