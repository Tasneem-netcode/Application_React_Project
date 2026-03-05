import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

// Re-export all task components so EmpDashboard only needs one import source
export { AcceptTask, NewTask, CompleteTask, FailedTask }

const statCards = [
  { key: 'newTask',   label: 'New',       icon: '🆕', accent: '#a78bfa', bg: '#1e1040', border: '#a78bfa30' },
  { key: 'active',    label: 'Active',    icon: '⚡', accent: '#f59e0b', bg: '#2d1f02', border: '#f59e0b30' },
  { key: 'completed', label: 'Completed', icon: '✅', accent: '#22c55e', bg: '#052e16', border: '#22c55e30' },
  { key: 'failed',    label: 'Failed',    icon: '❌', accent: '#ef4444', bg: '#2d0505', border: '#ef444430' },
]

const TaskList = ({ data }) => {
  const counts = {
    newTask:   data.tasks.filter(t => t.newTask).length,
    active:    data.tasks.filter(t => t.active).length,
    completed: data.tasks.filter(t => t.completed).length,
    failed:    data.tasks.filter(t => t.failed).length,
  }
  const total = data.tasks.length

  return (
    <div className='flex flex-col gap-6'>

      {/* Total task bar */}
      <div className='flex items-center justify-between'>
        <p className='text-gray-500 text-base font-medium'>My Tasks Overview</p>
        <span
          className='text-sm font-semibold px-3 py-1 rounded-full'
          style={{ background: '#2a2a2a', color: '#94a3b8', border: '1px solid #3a3a3a' }}
        >
          {total} total
        </span>
      </div>

      {/* Stat cards 2x2 grid */}
      <div className='grid grid-cols-2 gap-3'>
        {statCards.map((s) => (
          <div
            key={s.key}
            className='rounded-2xl p-4 flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg'
            style={{ background: s.bg, border: `1px solid ${s.border}` }}
          >
            <div
              className='w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0'
              style={{ background: `${s.accent}20` }}
            >
              {s.icon}
            </div>
            <div>
              <p className='text-white text-3xl font-bold leading-none'>{counts[s.key]}</p>
              <p className='text-sm font-semibold mt-1.5' style={{ color: s.accent }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between mb-1'>
            <span className='text-gray-500 text-sm font-medium'>Completion Rate</span>
            <span className='text-white text-sm font-bold'>
              {Math.round((counts.completed / total) * 100)}%
            </span>
          </div>
          <div className='w-full h-2 rounded-full' style={{ background: '#2a2a2a' }}>
            <div
              className='h-2 rounded-full transition-all duration-700'
              style={{
                width: `${Math.round((counts.completed / total) * 100)}%`,
                background: 'linear-gradient(90deg, #7C6EF5, #22c55e)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskList