import React from 'react'

const CompleteTask = ({ data }) => {
  const completedTasks = data.tasks.filter(task => task.completed)

  if (completedTasks.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-10 text-center'>
        <span className='text-4xl mb-3'>📭</span>
        <p className='text-gray-400 text-sm font-medium'>No completed tasks yet</p>
        <p className='text-gray-600 text-xs mt-1'>Finish a task to see it here.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      {completedTasks.map((task, index) => (
        <div
          key={index}
          className='p-5 rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5'
          style={{ backgroundColor: '#D5D8FF' }}
        >
          {/* Top Row */}
          <div className='flex justify-between items-start mb-2'>
            <div>
              <h3 className='text-black text-base font-bold leading-tight'>{task.title}</h3>
              <span className='text-black text-xs opacity-60 font-medium'>{task.category}</span>
            </div>
            <div className='flex flex-col items-end gap-1'>
              <span className='text-black text-xs opacity-50 whitespace-nowrap'>{task.date}</span>
              <span className='text-black text-xs font-bold px-2 py-0.5 rounded-full bg-[#a8adee]'>
                ✅ Completed
              </span>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className='text-black text-sm opacity-70 mt-1 leading-relaxed'>
              {task.description}
            </p>
          )}

          {/* Completion note */}
          <p className='text-black text-xs opacity-50 mt-3 font-medium'>
            🎉 Great work! This task was completed successfully.
          </p>
        </div>
      ))}
    </div>
  )
}

export default CompleteTask