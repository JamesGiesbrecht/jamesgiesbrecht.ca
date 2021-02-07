import React, { useState, useEffect, createContext } from 'react'

export const AuthContext = createContext()

export default ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  useEffect(() => {
    console.log('Saving user to LS', user)
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  // TODO: Redirect on sign in/logout
  const store = {
    user,
    setUser,
    logout,
  }

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}
