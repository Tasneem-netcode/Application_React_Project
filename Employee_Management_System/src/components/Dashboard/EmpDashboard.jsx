import React from 'react'
import Header from '../Dashboard_Components/Header'
import TaskList from '../TaskList/TaskList'
import TaskListnew from '../Dashboard_Components/TaskListnew'

const EmpDashboard = ({data}) => {
  console.log("Data is", data);
  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
        <Header data={data}/>
        <div className='flex gap-6 mt-10'>
          <div className='flex-1'>
            <TaskList data={data}/>
          </div>
          <div className='w-[35%]'>
            <TaskListnew data={data}/>
          </div>
        </div>
    </div>
  )
}

export default EmpDashboard