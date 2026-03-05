import React from 'react'

const FailedTask = ({ data }) => {
  const failedTasks = data.tasks.filter(task => task.failed)

  if (failedTasks.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-10 text-center'>
        <span className='text-4xl mb-3'>🎯</span>
        <p className='text-gray-400 text-base font-medium'>No failed tasks!</p>
        <p className='text-gray-600 text-sm mt-1'>Keep it up — nothing has gone wrong yet.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      {failedTasks.map((task, index) => (
        <div
          key={index}
          className='p-5 rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5'
          style={{ backgroundColor: '#D1F2EB' }}
        >
          {/* Top Row */}
          <div className='flex justify-between items-start mb-2'>
            <div>
              <h3 className='text-black text-lg font-bold leading-tight'>{task.title}</h3>
              <span className='text-black text-sm opacity-60 font-medium'>{task.category}</span>
            </div>
            <div className='flex flex-col items-end gap-1'>
              <span className='text-black text-sm opacity-50 whitespace-nowrap'>{task.date}</span>
              <span className='text-black text-sm font-bold px-2.5 py-0.5 rounded-full bg-[#90dac5]'>
                ❌ Failed
              </span>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className='text-black text-base opacity-70 mt-1 leading-relaxed'>
              {task.description}
            </p>
          )}

          {/* Failure note */}
          <p className='text-black text-sm opacity-50 mt-3 font-medium'>
            ⚠️ This task was marked as failed.
          </p>
        </div>
      ))}
    </div>
  )
}

export default FailedTask
