import React, { useContext, useState, useEffect } from 'react'
import Loginmain from './pages/Loginmain'
import EmpDashboard from './components/Dashboard/EmpDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthContext'

const App = () => {

  const [user, setuser] = useState(null)
  const [loggedInUserData, setloggedInUserData] = useState(null)
  const authData = useContext(AuthContext)
  
  // useEffect(() => {
  //   if(authData){
  //     const loggedInUser = localStorage.getItem("LoggedInUser")
  //     if(loggedInUser){
  //       setuser(JSON.parse(loggedInUser).role)
  //     }
  //   }
  
  // }, [authData])
  


  const HandleLogin = (email, password) => {
    if(email == 'admin@me.com' && password == '123'){
      setuser('Admin')
      localStorage.setItem("LoggedInUser",JSON.stringify({role:"admin"}))
    }
    else if(authData){
      const employee = authData.employees.find((emp) => email == emp.email && password == emp.password)
      if(employee){
        setuser('Employee')
        setloggedInUserData(employee)
        localStorage.setItem("LoggedInUser",JSON.stringify({role:"employee"}))

      }
    }
    else{
      alert('Invalid Credentials')
    }
  }

 

  return (
   <>
   {!user ? <Loginmain HandleLogin={HandleLogin}/> : null}
   {user == 'Admin' ? <AdminDashboard/> : user == 'Employee' ? <EmpDashboard data={loggedInUserData} /> : null}
   </>
  )
}

export default App