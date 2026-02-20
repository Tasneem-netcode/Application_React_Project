import React from 'react'

const TaskList = () => {
  return (
    <div className='grid grid-cols-2 gap-5'>
        <div className='py-6 px-9 rounded-xl text-black bg-[#F8C8C4]'>
            <h2 className='text-2xl font-semibold'>0</h2>
            <h3 className='text-xl font-medium'>New Task</h3>
        </div>
        <div className='py-6 px-9 rounded-xl text-black bg-[#FDEBD0]'>
            <h2 className='text-2xl font-semibold'>0</h2>
            <h3 className='text-xl font-medium'>Active Task</h3>
        </div>
        <div className='py-6 px-9 rounded-xl text-black bg-[#D5D8FF]'>
            <h2 className='text-2xl font-semibold'>0</h2>
            <h3 className='text-xl font-medium'>Completed Task</h3>
        </div>
        <div className='py-6 px-9 rounded-xl text-black bg-[#D1F2EB]'>
            <h2 className='text-2xl font-semibold'>0</h2>
            <h3 className='text-xl font-medium'>Failed Task</h3>
        </div>
    </div>
  )
}

export default TaskList