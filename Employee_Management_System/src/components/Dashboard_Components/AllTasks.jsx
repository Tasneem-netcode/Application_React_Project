import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

// ─── helpers ────────────────────────────────────────────────────────────────

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

const avatarColors = [
  '#7C6EF5', '#E56B9A', '#4DB8A0', '#F5A623', '#5BBCF8',
]

const getStatus = (task) => {
  if (task.completed) return { label: 'Completed', color: '#22c55e', bg: '#052e16' }
  if (task.failed)    return { label: 'Failed',    color: '#ef4444', bg: '#2d0505' }
  if (task.active)    return { label: 'In Progress', color: '#f59e0b', bg: '#2d1f02' }
  if (task.newTask)   return { label: 'New',        color: '#a78bfa', bg: '#1e1040' }
  return               { label: 'Pending',          color: '#6b7280', bg: '#1a1a1a' }
}

const priorityConfig = {
  High:   { color: '#ef4444', bg: '#2d0505', dot: '#ef4444' },
  Medium: { color: '#f59e0b', bg: '#2d1f02', dot: '#f59e0b' },
  Low:    { color: '#22c55e', bg: '#052e16', dot: '#22c55e' },
}

const getPriorityConf = (priority = 'Medium') =>
  priorityConfig[priority] || priorityConfig['Medium']

// ─── Task Row ────────────────────────────────────────────────────────────────

const TaskRow = ({ task, index }) => {
  const status   = getStatus(task)
  const priConf  = getPriorityConf(task.priority)

  return (
    <tr
      style={{
        borderBottom: '1px solid #2a2a2a',
        transition: 'background 0.2s',
      }}
      className='hover:bg-[#242424]'
    >
      {/* # */}
      <td className='py-3 px-4 text-gray-500 text-sm'>{index + 1}</td>

      {/* Task Title */}
      <td className='py-3 px-4'>
        <p className='text-white text-sm font-semibold'>{task.title}</p>
        <p className='text-gray-500 text-xs mt-0.5 truncate max-w-[180px]'>{task.description}</p>
      </td>

      {/* Category */}
      <td className='py-3 px-4'>
        <span
          className='text-xs font-medium px-2.5 py-1 rounded-full'
          style={{ background: '#2a2a2a', color: '#94a3b8', border: '1px solid #3a3a3a' }}
        >
          {task.category || '—'}
        </span>
      </td>

      {/* Due Date */}
      <td className='py-3 px-4 text-gray-400 text-sm whitespace-nowrap'>
        📅 {task.date || '—'}
      </td>

      {/* Priority */}
      <td className='py-3 px-4'>
        <span
          className='text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit'
          style={{ background: priConf.bg, color: priConf.color }}
        >
          <span
            className='w-1.5 h-1.5 rounded-full inline-block'
            style={{ background: priConf.dot }}
          />
          {task.priority || 'Medium'}
        </span>
      </td>

      {/* Status */}
      <td className='py-3 px-4'>
        <span
          className='text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap'
          style={{ background: status.bg, color: status.color }}
        >
          {status.label}
        </span>
      </td>
    </tr>
  )
}

// ─── Employee Card ────────────────────────────────────────────────────────────

const EmployeeCard = ({ employee, colorIndex }) => {
  const [expanded, setExpanded] = useState(false)

  const tasks      = employee.tasks || []
  const total      = tasks.length
  const completed  = tasks.filter((t) => t.completed).length
  const inProgress = tasks.filter((t) => t.active).length
  const failed     = tasks.filter((t) => t.failed).length
  const newCount   = tasks.filter((t) => t.newTask).length
  const avatarBg   = avatarColors[colorIndex % avatarColors.length]

  return (
    <div
      style={{
        background: '#1e1e1e',
        border: '1px solid #2a2a2a',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s',
      }}
      className='hover:shadow-2xl'
    >
      {/* ── Card Header ── */}
      <div
        className='flex items-center justify-between p-5'
        style={{ borderBottom: expanded ? '1px solid #2a2a2a' : 'none' }}
      >
        {/* Left: avatar + info */}
        <div className='flex items-center gap-4'>
          {/* Avatar */}
          <div
            className='w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0'
            style={{ background: avatarBg, letterSpacing: '0.05em' }}
          >
            {getInitials(employee.name)}
          </div>

          {/* Name / email */}
          <div>
            <h3 className='text-white font-semibold text-base leading-tight'>
              {employee.name}
            </h3>
            <p className='text-gray-500 text-xs mt-0.5'>{employee.email}</p>
          </div>
        </div>

        {/* Right: mini stat pills + toggle */}
        <div className='flex items-center gap-2 flex-wrap justify-end'>
          {/* Stat pills */}
          <StatPill label='Total' value={total}      color='#94a3b8' bg='#2a2a2a' />
          <StatPill label='Active' value={inProgress} color='#f59e0b' bg='#2d1f02' />
          <StatPill label='Done'   value={completed}  color='#22c55e' bg='#052e16' />
          {failed > 0 && (
            <StatPill label='Failed' value={failed}   color='#ef4444' bg='#2d0505' />
          )}
          {newCount > 0 && (
            <StatPill label='New'    value={newCount} color='#a78bfa' bg='#1e1040' />
          )}

          {/* Toggle button */}
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className='ml-2 flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200'
            style={{
              background: expanded ? '#7C6EF5' : '#2a2a2a',
              color: expanded ? '#fff' : '#94a3b8',
              border: '1px solid',
              borderColor: expanded ? '#7C6EF5' : '#3a3a3a',
            }}
          >
            {expanded ? '▲ Hide' : '▼ View Tasks'}
          </button>
        </div>
      </div>

      {/* ── Task Table (expandable) ── */}
      {expanded && (
        <div className='px-5 pb-5'>
          {tasks.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-10 text-gray-600'>
              <span className='text-4xl mb-2'>📭</span>
              <p className='text-sm'>No tasks assigned yet</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className='w-full' style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                    {['#', 'Task', 'Category', 'Due Date', 'Priority', 'Status'].map(
                      (col) => (
                        <th
                          key={col}
                          className='py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500'
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, i) => (
                    <TaskRow key={i} task={task} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────

const StatPill = ({ label, value, color, bg }) => (
  <span
    className='text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1'
    style={{ background: bg, color }}
  >
    <span className='font-bold'>{value}</span> {label}
  </span>
)

// ─── Main Component ───────────────────────────────────────────────────────────

const AllTasks = () => {
  const authData = useContext(AuthContext)
  const employees = authData?.employees || []

  return (
    <div className='mt-8'>
      {/* Section Header */}
      <div className='flex items-center justify-between mb-5'>
        <div>
          <h2 className='text-white text-2xl font-bold'>Employee Overview</h2>
          <p className='text-gray-500 text-sm mt-1'>
            Click <span className='text-[#7C6EF5] font-semibold'>View Tasks</span> on any
            employee card to expand their assigned tasks
          </p>
        </div>
        <div
          className='text-xs font-semibold px-4 py-2 rounded-xl'
          style={{ background: '#2a2a2a', color: '#7C6EF5', border: '1px solid #3a3a3a' }}
        >
          👥 {employees.length} Employees
        </div>
      </div>

      {/* Employee Cards */}
      <div className='flex flex-col gap-4'>
        {employees.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-gray-600'>
            <span className='text-5xl mb-3'>🏢</span>
            <p className='text-base font-medium'>No employees found</p>
          </div>
        ) : (
          employees.map((emp, idx) => (
            <EmployeeCard key={emp.id || idx} employee={emp} colorIndex={idx} />
          ))
        )}
      </div>
    </div>
  )
}

export default AllTasks