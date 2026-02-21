import React, { useState } from 'react'
import Loginmain from './pages/Loginmain'
import EmpDashboard from './components/Dashboard/EmpDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'

const App = () => {

  const [user, setuser] = useState(null)

  const HandleLogin = (email, password) => {
    if(email == 'admin@me.com' && password == '123'){
      setuser('Admin')
    }
    else if(email == 'user@me.com' && password == '123'){
      setuser('Employee')
    }
    else{
      alert('Invalid Credentials')
    }
  }

  return (
   <>
   {!user ? <Loginmain HandleLogin={HandleLogin}/> : null}
   {user == 'Admin' ? <AdminDashboard/> : user == 'Employee' ? <EmpDashboard /> : null}
   </>
  )
}

export default App