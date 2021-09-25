import { useState, useEffect, useContext, createContext, FC } from 'react'
import axios, { AxiosInstance } from 'axios'
import { signInWithPopup, OAuthProvider, User, UserCredential } from 'firebase/auth'

import { firebaseAuth } from 'firebase/config'

const { REACT_APP_PROXY, REACT_APP_ENV } = process.env

interface AuthContextType {
  user: User | null | undefined
  api: AxiosInstance
  authInitialized: boolean
  logout: typeof firebaseAuth.signOut
  signInWithGoogle: () => Promise<UserCredential>
}

const noAuthProvider = () => {
  throw new Error('This component should be wrapper with a Auth Context Provider.')
}

const api = axios.create()

if (REACT_APP_ENV === 'development') {
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

if (REACT_APP_PROXY) {
  api.defaults.baseURL = REACT_APP_PROXY
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
