import React from 'react'

const AcceptTask = ({data}) => {
  const newTaskCount =  data.tasks.filter(task => task.newTask).length;
  return (
    <div>
         <div className='py-6 px-9 rounded-xl text-black bg-[#F8C8C4]'>
            <h2 className='text-2xl font-semibold'>{newTaskCount}</h2>
            <h3 className='text-xl font-medium'>New Task</h3>
        </div>
          <div className='flex justify-between mt-4'>
        <button className='py-2 px-4 rounded-xl text-black bg-[#FDEBD0]'>Mark as Complete</button>
        <button className='py-2 px-4 rounded-xl text-black bg-[#D1F2EB]'>Mark as Failed</button>

          </div>
    </div>
  )
}

export default  AcceptTask