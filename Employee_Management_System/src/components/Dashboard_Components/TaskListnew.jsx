import React from 'react'

const TaskListnew = () => {
  const tasks = [
    { id: 1, title: 'Complete Project Report', category: 'Work', date: '2026-02-20', color: '#F8C8C4' },
    { id: 2, title: 'Team Meeting at 3 PM', category: 'Meeting', date: '2026-02-20', color: '#FDEBD0' },
    { id: 3, title: 'Review Pull Requests', category: 'Development', date: '2026-02-20', color: '#D5D8FF' },
    { id: 4, title: 'Update Employee Records', category: 'Admin', date: '2026-02-20', color: '#D1F2EB' },
  ]

  return (
    <div className='h-full bg-[#2a2a2a] rounded-xl p-5'>
      <h2 className='text-white text-lg font-semibold mb-4'>My Tasks</h2>
      <div className='flex flex-col gap-3'>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='flex items-center gap-3 p-3 rounded-xl'
            style={{ backgroundColor: task.color }}
          >
            <div className='w-2 h-2 rounded-full bg-black opacity-40 flex-shrink-0'></div>
            <div className='flex flex-1 justify-between items-start'>
              <div>
                <p className='text-black text-sm font-semibold'>{task.title}</p>
                <span className='text-black text-xs opacity-60'>{task.category}</span>
              </div>
              <span className='text-black text-xs opacity-60 ml-2 whitespace-nowrap'>{task.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskListnew