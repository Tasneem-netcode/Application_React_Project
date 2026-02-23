import React, { useState } from 'react'
import { AuthContext } from './AuthContext'
import { getLocalStorage } from '../utils/LocalStorage'
import { useEffect } from 'react'
const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState(null)

  useEffect(() => {
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