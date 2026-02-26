import React from 'react'

const TaskListnew = ({ data }) => {
  const tasks = data.tasks

  // Color based on task status
  const getTaskColor = (task) => {
    if (task.newTask)   return '#F8C8C4'  // pink  — New
    if (task.active)    return '#FDEBD0'  // orange — Active
    if (task.completed) return '#D5D8FF'  // purple — Completed
    if (task.failed)    return '#D1F2EB'  // green  — Failed
    return '#e5e5e5'
  }

  const getStatusLabel = (task) => {
    if (task.newTask)   return 'New'
    if (task.active)    return 'Active'
    if (task.completed) return 'Completed'
    if (task.failed)    return 'Failed'
    return 'Unknown'
  }

  return (
    <div className='h-full bg-[#2a2a2a] rounded-xl p-5'>
      <h2 className='text-white text-lg font-semibold mb-4'>My Tasks</h2>
      <div className='flex flex-col gap-3'>
        {tasks.map((task, index) => (
          <div
            key={index}
            className='p-4 rounded-xl'
            style={{ backgroundColor: getTaskColor(task) }}
          >
            {/* Task Info */}
            <div className='flex justify-between items-start mb-3'>
              <div>
                <p className='text-black text-sm font-semibold'>{task.title}</p>
                <span className='text-black text-xs opacity-60'>{task.category}</span>
              </div>
              <div className='flex flex-col items-end gap-1'>
                <span className='text-black text-xs opacity-60 whitespace-nowrap'>{task.date}</span>
                <span className='text-black text-xs font-bold opacity-70 bg-black/10 px-2 py-0.5 rounded-full'>
                  {getStatusLabel(task)}
                </span>
              </div>
            </div>

            {/* Buttons — only show for new/active tasks */}
            {(task.newTask || task.active) && (
              <div className='flex justify-between mt-1 gap-2'>
                <button className='flex-1 py-1.5 px-3 rounded-xl text-black text-xs font-semibold bg-[#D5D8FF] hover:opacity-80 transition'>
                  Mark as Complete
                </button>
                <button className='flex-1 py-1.5 px-3 rounded-xl text-black text-xs font-semibold bg-black/10 hover:opacity-80 transition'>
                  Mark as Failed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskListnew