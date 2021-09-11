import { useState, useEffect, useContext, createContext, FC } from 'react'
import { signInWithPopup, OAuthProvider, User, UserCredential } from 'firebase/auth'

import { firebaseAuth } from 'firebase/config'

interface AuthContextType {
  user: User | null | undefined
  logout: typeof firebaseAuth.signOut
  signInWithGoogle: () => Promise<UserCredential>
}

const noAuthProvider = () => {
  throw new Error('This component should be wrapper with a Auth Context Provider.')
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: noAuthProvider,
  signInWithGoogle: noAuthProvider,
})

export const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>()
  const googleAuthProvider = new OAuthProvider('google.com')

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((authUser) => setUser(authUser))
    return () => {
      unsubscribe()
    }
  })

  const store = {
    user,
    logout: firebaseAuth.signOut.bind(firebaseAuth),
    signInWithGoogle: async () => signInWithPopup(firebaseAuth, googleAuthProvider),
  }
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
