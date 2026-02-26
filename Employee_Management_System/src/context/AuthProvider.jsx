import React, { useState } from 'react'
import { AuthContext } from './AuthContext'
import { getLocalStorage, setLocalStorage } from '../utils/LocalStorage'
import { useEffect } from 'react'
const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    setLocalStorage()
    const { employees, admin } = getLocalStorage()
    setUserData({ employees, admin })
  }, [])

  
  return (
    <AuthContext.Provider value={userData}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider