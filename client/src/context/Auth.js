import React, { useState, useEffect, createContext } from 'react'

export const AuthContext = createContext()

export default ({ children }) => {
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')))

  useEffect(() => {
    console.log('Saving Profile to LS', profile)
    localStorage.setItem('profile', JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    console.log('Saving Token to LS', token)
    localStorage.setItem('token', JSON.stringify(profile))
  }, [token])

  const setUser = (user) => {
    if (user.profile) setProfile(user.profile)
    if (user.token) setToken(user.token)
  }

  // Redirect on sign in
  const store = {
    profile,
    token,
    setUser,
  }

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}
