import React, { useState, useEffect, createContext } from 'react'

export const AuthContext = createContext()

export default ({ children }) => {
  const [profile, setProfile] = useState({
    info: {},
    token: null,
  })

  useEffect(() => {
    console.log(profile)
    localStorage.setItem('profile', JSON.stringify(profile))
  }, [profile])

  const store = {
    profile,
    setProfile,
  }

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}
