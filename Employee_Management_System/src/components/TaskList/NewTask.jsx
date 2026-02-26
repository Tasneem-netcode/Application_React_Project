import React from 'react'

const NewTask = ({ data }) => {
  const newTaskCount = data.tasks.filter(task => task.newTask).length;
  return (
    <div className='py-6 px-9 rounded-xl text-black bg-[#F8C8C4]'>
      <h2 className='text-2xl font-semibold'>{newTaskCount}</h2>
      <h3 className='text-xl font-medium'>New Task</h3>
    </div>
  )
}

export default NewTask
