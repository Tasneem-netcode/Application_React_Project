import React from 'react'
import Header from '../Dashboard_Components/Header'
import TaskList from '../Dashboard_Components/TaskList'
import TaskListnew from '../Dashboard_Components/TaskListnew'

const EmpDashboard = () => {
  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
        <Header/>
        <div className='flex gap-6 mt-10'>
          <div className='flex-1'>
            <TaskList/>
          </div>
          <div className='w-[35%]'>
            <TaskListnew/>
          </div>
        </div>
    </div>
  )
}

export default EmpDashboard