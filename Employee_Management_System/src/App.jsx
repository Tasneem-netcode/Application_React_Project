import React, { useContext, useState, useEffect } from 'react'
import Loginmain from './pages/Loginmain'
import EmpDashboard from './components/Dashboard/EmpDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthContext'

const App = () => {

  const [user, setuser] = useState(null)
  const [loggedInUserData, setloggedInUserData] = useState(null)
  const authData = useContext(AuthContext)

  // On mount: restore session from localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("LoggedInUser")
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser)
      setuser(userData.role?.toLowerCase())
      setloggedInUserData(userData.data)
      // If already logged in on page load, ensure there's a dashboard history entry
      // so the back button has something to go back from
      window.history.pushState({ page: 'dashboard' }, '', '/')
    }
  }, [])

  // Listen for browser back button — log user out and return to login
  useEffect(() => {
    const handlePopState = () => {
      localStorage.removeItem("LoggedInUser")
      setuser(null)
      setloggedInUserData(null)
    }

    window.addEventListener('popstate', handlePopState)

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const HandleLogin = (email, password) => {
    if (!authData) {
      alert('System not ready yet, please try again.')
      return
    }

    // Check against admin list from localStorage
    const admin = authData.admin?.find((a) => a.email === email && a.password === password)
    if (admin) {
      setuser('admin')
      setloggedInUserData(admin)
      localStorage.setItem("LoggedInUser", JSON.stringify({ role: "admin", data: admin }))
      window.history.pushState({ page: 'dashboard' }, '', '/')
      return
    }

    // Check against employee list from localStorage
    const employee = authData.employees?.find((emp) => emp.email === email && emp.password === password)
    if (employee) {
      setuser('employee')
      setloggedInUserData(employee)
      localStorage.setItem("LoggedInUser", JSON.stringify({ role: "employee", data: employee }))
      window.history.pushState({ page: 'dashboard' }, '', '/')
      return
    }

    alert('Invalid Credentials')
  }

  const HandleLogout = () => {
    localStorage.removeItem("LoggedInUser")
    setuser(null)
    // window.location.reload()
    setloggedInUserData(null)
  }

  return (
    <>
      {!user ? <Loginmain HandleLogin={HandleLogin} /> : null}
      {user === 'admin' ? <AdminDashboard HandleLogout={HandleLogout} /> : user === 'employee' ? <EmpDashboard data={loggedInUserData} HandleLogout={HandleLogout} /> : null}
    </>
  )
}

export default App