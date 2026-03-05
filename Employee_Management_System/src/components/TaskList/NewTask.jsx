import React from 'react'

const NewTask = ({ data, onTaskUpdate }) => {
  const newTasks = data.tasks.filter(task => task.newTask)

  const handleAcceptTask = (taskIndex) => {

    // Build the updated tasks array: flip newTask → false, active → true
    const updatedTasks = data.tasks.map((task, i) => {
      if (i === taskIndex) {
        return { ...task, newTask: false, active: true }
      }
      return task
    })

    // Persist to localStorage
    const allEmployees = JSON.parse(localStorage.getItem('employees')) || []
    const updatedEmployees = allEmployees.map(emp => {
      if (emp.id === data.id) {
        return { ...emp, tasks: updatedTasks }
      }
      return emp
    })
    localStorage.setItem('employees', JSON.stringify(updatedEmployees))

    // Notify parent to refresh state
    if (onTaskUpdate) {
      onTaskUpdate({ ...data, tasks: updatedTasks })
    }
  }

  if (newTasks.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-10 text-center'>
        <span className='text-4xl mb-3'>🎉</span>
        <p className='text-gray-400 text-base font-medium'>No new tasks right now!</p>
        <p className='text-gray-600 text-sm mt-1'>All caught up. Check back later.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      {data.tasks.map((task, index) => {
        if (!task.newTask) return null
        return (
          <div
            key={index}
            className='p-5 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5'
            style={{ backgroundColor: '#F8C8C4' }}
          >
            {/* Top Row: Title + Date */}
            <div className='flex justify-between items-start mb-2'>
              <div>
                <h3 className='text-black text-lg font-bold leading-tight'>{task.title}</h3>
                <span className='text-black text-sm opacity-60 font-medium'>{task.category}</span>
              </div>
              <div className='flex flex-col items-end gap-1'>
                <span className='text-black text-sm opacity-50 whitespace-nowrap'>{task.date}</span>
                <span className='text-black text-sm font-bold px-2.5 py-0.5 rounded-full bg-[#e8a09a]'>
                  🆕 New
                </span>
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <p className='text-black text-base opacity-70 mt-1 mb-3 leading-relaxed'>
                {task.description}
              </p>
            )}

            {/* Accept Task Button */}
            <button
              onClick={() => handleAcceptTask(index)}
              className='w-full mt-2 py-2.5 px-4 rounded-xl text-black text-base font-semibold
                         bg-[#FDEBD0] hover:bg-[#f5c98a] active:scale-95
                         transition-all duration-150 shadow-sm hover:shadow-md'
            >
              ✅ Accept Task
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default NewTask
