import React, { useState, useEffect, useCallback } from 'react'
import { AuthContext } from './AuthContext'
import { getLocalStorage, setLocalStorage } from '../utils/LocalStorage'

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  const loadData = useCallback(() => {
    const { employees, admin } = getLocalStorage()
    setUserData({ employees, admin })
  }, [])

  useEffect(() => {
    setLocalStorage()   // seed only if localStorage is empty
    loadData()
  }, [loadData])

  // Expose a refreshData function so any component (e.g. AdminDashboard)
  // can trigger a re-read from localStorage after writing new data.
  const contextValue = userData
    ? { ...userData, refreshData: loadData }
    : null

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider