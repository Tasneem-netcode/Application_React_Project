import React from 'react'

const AcceptTask = ({ data, onTaskUpdate }) => {
  const tasks = data.tasks

  // ── Update task status in localStorage and notify parent ──────────────────
  const updateTaskStatus = (taskIndex, updates) => {
    const allEmployees = JSON.parse(localStorage.getItem('employees')) || []

    const updatedEmployees = allEmployees.map((emp) => {
      if (emp.id !== data.id) return emp

      const updatedTasks = emp.tasks.map((task, i) =>
        i === taskIndex ? { ...task, ...updates } : task
      )
      return { ...emp, tasks: updatedTasks }
    })

    // Save to localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees))

    // Notify parent (EmpDashboard) to refresh its state
    if (onTaskUpdate) {
      const updatedTasks = data.tasks.map((task, i) =>
        i === taskIndex ? { ...task, ...updates } : task
      )
      onTaskUpdate({ ...data, tasks: updatedTasks })
    }
  }

  const handleMarkComplete = (index) => {
    updateTaskStatus(index, {
      newTask:   false,
      active:    false,
      completed: true,
      failed:    false,
    })
  }

  const handleMarkFailed = (index) => {
    updateTaskStatus(index, {
      newTask:   false,
      active:    false,
      completed: false,
      failed:    true,
    })
  }

  // ── Color palette based on task status ────────────────────────────────────
  const getTaskColor = (task) => {
    if (task.newTask)   return { bg: '#F8C8C4', badge: '#e8a09a' }
    if (task.active)    return { bg: '#FDEBD0', badge: '#f5c98a' }
    if (task.completed) return { bg: '#D5D8FF', badge: '#a8adee' }
    if (task.failed)    return { bg: '#D1F2EB', badge: '#90dac5' }
    return { bg: '#e5e5e5', badge: '#ccc' }
  }

  const getStatusLabel = (task) => {
    if (task.newTask)   return 'New'
    if (task.active)    return 'Active'
    if (task.completed) return 'Completed'
    if (task.failed)    return 'Failed'
    return 'Unknown'
  }

  return (
    <div className='flex flex-col gap-4'>
      {tasks.map((task, index) => {
        const colors = getTaskColor(task)
        return (
          <div
            key={index}
            className='p-5 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md'
            style={{ backgroundColor: colors.bg }}
          >
            {/* Top Row: Title + Status Badge */}
            <div className='flex justify-between items-start mb-2'>
              <div>
                <h3 className='text-black text-lg font-bold'>{task.title}</h3>
                <span className='text-black text-sm opacity-60'>{task.category}</span>
              </div>
              <div className='flex flex-col items-end gap-1'>
                <span className='text-black text-sm opacity-60 whitespace-nowrap'>{task.date}</span>
                <span
                  className='text-black text-sm font-bold px-2.5 py-0.5 rounded-full'
                  style={{ backgroundColor: colors.badge }}
                >
                  {getStatusLabel(task)}
                </span>
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <p className='text-black text-base opacity-70 mt-1 mb-3 leading-relaxed'>
                {task.description}
              </p>
            )}

            {/* Action Buttons — only for new or active tasks */}
            {(task.newTask || task.active) && (
              <div className='flex justify-between gap-3 mt-3'>
                <button
                  onClick={() => handleMarkComplete(index)}
                  className='flex-1 py-2.5 px-4 rounded-xl text-black text-base font-semibold bg-[#D5D8FF] hover:bg-[#bbbfff] active:scale-95 transition-all duration-150 shadow-sm'
                >
                  ✅ Mark as Complete
                </button>
                <button
                  onClick={() => handleMarkFailed(index)}
                  className='flex-1 py-2.5 px-4 rounded-xl text-black text-base font-semibold bg-black/10 hover:bg-black/20 active:scale-95 transition-all duration-150 shadow-sm'
                >
                  ❌ Mark as Failed
                </button>
              </div>
            )}

            {/* Completed message */}
            {task.completed && (
              <p className='text-black text-sm opacity-60 mt-2 font-medium'>🎉 Task Completed</p>
            )}

            {/* Failed message */}
            {task.failed && (
              <p className='text-black text-sm opacity-60 mt-2 font-medium'>⚠️ Task Failed</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default AcceptTask