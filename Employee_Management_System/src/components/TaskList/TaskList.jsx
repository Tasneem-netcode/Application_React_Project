import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

// Re-export all task components so EmpDashboard only needs one import source
export { AcceptTask, NewTask, CompleteTask, FailedTask }

const TaskList = ({ data }) => {
  const newTaskCount       = data.tasks.filter(task => task.newTask).length
  const activeTaskCount    = data.tasks.filter(task => task.active).length
  const completedTaskCount = data.tasks.filter(task => task.completed).length
  const failedTaskCount    = data.tasks.filter(task => task.failed).length

  return (
    <div className='grid grid-cols-2 gap-5'>
      <div className='py-6 px-9 rounded-xl text-black bg-[#F8C8C4]'>
        <h2 className='text-2xl font-semibold'>{newTaskCount}</h2>
        <h3 className='text-xl font-medium'>New Task</h3>
      </div>
      <div className='py-6 px-9 rounded-xl text-black bg-[#FDEBD0]'>
        <h2 className='text-2xl font-semibold'>{activeTaskCount}</h2>
        <h3 className='text-xl font-medium'>Active Task</h3>
      </div>
      <div className='py-6 px-9 rounded-xl text-black bg-[#D5D8FF]'>
        <h2 className='text-2xl font-semibold'>{completedTaskCount}</h2>
        <h3 className='text-xl font-medium'>Completed Task</h3>
      </div>
      <div className='py-6 px-9 rounded-xl text-black bg-[#D1F2EB]'>
        <h2 className='text-2xl font-semibold'>{failedTaskCount}</h2>
        <h3 className='text-xl font-medium'>Failed Task</h3>
      </div>
    </div>
  )
}

export default TaskList