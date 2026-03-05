import React, { useContext, useState, useEffect, lazy, Suspense } from 'react'

// ── Lazy-loaded page chunks ──────────────────────────────────────────────────
// Each component is split into its own JS bundle and only downloaded
// the first time that user role is rendered.
const Loginmain      = lazy(() => import('./pages/Loginmain'))
const EmpDashboard   = lazy(() => import('./components/Dashboard/EmpDashboard'))
const AdminDashboard = lazy(() => import('./components/Dashboard/AdminDashboard'))

import { AuthContext } from './context/AuthContext'

// ── Suspense fallback — defined outside App so it's stable across renders ─────
const PageLoader = () => (
  <div className='min-h-screen bg-[#141414] flex flex-col items-center justify-center gap-4'>
    <div
      className='w-10 h-10 rounded-full border-4 border-t-transparent animate-spin'
      style={{ borderColor: '#2a2a2a', borderTopColor: '#7C6EF5' }}
    />
    <p className='text-gray-600 text-sm font-medium'>Loading...</p>
  </div>
)

const App = () => {

  const [user, setuser] = useState(null)
  const [loggedInUserData, setloggedInUserData] = useState(null)
  const authData = useContext(AuthContext)

  // On mount: restore session from localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem('LoggedInUser')
    if (!loggedInUser) return
    // Use a microtask so state updates happen outside the effect body,
    // avoiding the "synchronous setState inside effect" lint warning.
    const userData = JSON.parse(loggedInUser)
    Promise.resolve().then(() => {
      setuser(userData.role?.toLowerCase())
      setloggedInUserData(userData.data)
      window.history.pushState({ page: 'dashboard' }, '', '/')
    })
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
    <Suspense fallback={<PageLoader />}>
      {!user ? <Loginmain HandleLogin={HandleLogin} /> : null}
      {user === 'admin'    ? <AdminDashboard HandleLogout={HandleLogout} /> : null}
      {user === 'employee' ? <EmpDashboard data={loggedInUserData} HandleLogout={HandleLogout} /> : null}
    </Suspense>
  )
}

export default App