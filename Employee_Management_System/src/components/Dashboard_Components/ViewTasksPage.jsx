import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

// ─── helpers ─────────────────────────────────────────────────────────────────

const getInitials = (name = '') =>
  name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)

const avatarColors = ['#7C6EF5', '#E56B9A', '#4DB8A0', '#F5A623', '#5BBCF8']

const getStatus = (task) => {
  if (task.completed) return { label: 'Completed', color: '#22c55e', bg: '#052e16' }
  if (task.failed)    return { label: 'Failed',    color: '#ef4444', bg: '#2d0505' }
  if (task.active)    return { label: 'In Progress', color: '#f59e0b', bg: '#2d1f02' }
  if (task.newTask)   return { label: 'New',        color: '#a78bfa', bg: '#1e1040' }
  return                     { label: 'Pending',    color: '#6b7280', bg: '#1a1a1a' }
}

const priorityConfig = {
  High:   { color: '#ef4444', bg: '#2d0505' },
  Medium: { color: '#f59e0b', bg: '#2d1f02' },
  Low:    { color: '#22c55e', bg: '#052e16' },
}

// ─── Component ────────────────────────────────────────────────────────────────

const ViewTasksPage = () => {
  const authData  = useContext(AuthContext)
  const employees = authData?.employees || []

  const [search, setSearch]         = useState('')
  const [filterStatus, setFilter]   = useState('all')
  const [filterPriority, setFPri]   = useState('all')

  // Flatten all tasks into rows with employee info
  const allRows = employees.flatMap((emp, empIdx) =>
    (emp.tasks || []).map((task, taskIdx) => ({
      ...task,
      empName:   emp.name,
      empEmail:  emp.email,
      empId:     emp.id,
      empIdx,
      taskIdx,
    }))
  )

  // Apply filters
  const filtered = allRows.filter((row) => {
    const matchSearch =
      row.title?.toLowerCase().includes(search.toLowerCase()) ||
      row.empName?.toLowerCase().includes(search.toLowerCase()) ||
      row.category?.toLowerCase().includes(search.toLowerCase())

    const status = getStatus(row).label.toLowerCase()
    const matchStatus = filterStatus === 'all' || status === filterStatus

    const matchPriority =
      filterPriority === 'all' ||
      (row.priority || 'medium').toLowerCase() === filterPriority

    return matchSearch && matchStatus && matchPriority
  })

  // Summary counts
  const totalTasks    = allRows.length
  const newCount      = allRows.filter((r) => r.newTask).length
  const activeCount   = allRows.filter((r) => r.active).length
  const completedCount = allRows.filter((r) => r.completed).length
  const failedCount   = allRows.filter((r) => r.failed).length

  const statCards = [
    { label: 'Total',       value: totalTasks,     icon: '📋', bg: '#2a2a2a',  accent: '#94a3b8' },
    { label: 'New',         value: newCount,        icon: '🆕', bg: '#1e1040',  accent: '#a78bfa' },
    { label: 'In Progress', value: activeCount,     icon: '⚡', bg: '#2d1f02',  accent: '#f59e0b' },
    { label: 'Completed',   value: completedCount,  icon: '✅', bg: '#052e16',  accent: '#22c55e' },
    { label: 'Failed',      value: failedCount,     icon: '❌', bg: '#2d0505',  accent: '#ef4444' },
  ]

  const statusOptions = ['all', 'new', 'in progress', 'completed', 'failed', 'pending']
  const priorityOptions = ['all', 'high', 'medium', 'low']

  return (
    <div className='mt-8 pb-10'>

      {/* ── Page Header ── */}
      <div className='mb-6'>
        <h2 className='text-white text-3xl font-bold'>All Assigned Tasks</h2>
        <p className='text-gray-500 text-sm mt-1'>
          Overview of every task assigned across all employees
        </p>
      </div>

      {/* ── Summary Stat Cards ── */}
      <div className='grid grid-cols-5 gap-4 mb-8'>
        {statCards.map((s) => (
          <div
            key={s.label}
            className='rounded-2xl p-5 flex items-center gap-4'
            style={{ background: s.bg, border: `1px solid ${s.accent}22` }}
          >
            <div
              className='w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0'
              style={{ background: `${s.accent}22` }}
            >
              {s.icon}
            </div>
            <div>
              <p className='text-xs uppercase tracking-wider font-semibold' style={{ color: s.accent }}>
                {s.label}
              </p>
              <p className='text-white text-2xl font-bold mt-0.5'>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters Row ── */}
      <div className='flex flex-wrap gap-3 mb-6 items-center'>
        {/* Search */}
        <div className='relative flex-1 min-w-[200px]'>
          <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm'>🔍</span>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by task, employee or category...'
            className='w-full bg-[#2a2a2a] text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#3a3a3a] focus:outline-none focus:border-[#D5D8FF] placeholder-gray-600 text-sm transition-all duration-200'
          />
        </div>

        {/* Status filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilter(e.target.value)}
          className='bg-[#2a2a2a] text-gray-300 px-4 py-2.5 rounded-xl border border-[#3a3a3a] focus:outline-none focus:border-[#D5D8FF] text-sm cursor-pointer'
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s === 'all' ? '📊 All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        {/* Priority filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFPri(e.target.value)}
          className='bg-[#2a2a2a] text-gray-300 px-4 py-2.5 rounded-xl border border-[#3a3a3a] focus:outline-none focus:border-[#D5D8FF] text-sm cursor-pointer'
        >
          {priorityOptions.map((p) => (
            <option key={p} value={p}>
              {p === 'all' ? '🎯 All Priorities' : p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>

        {/* Result count */}
        <span className='text-gray-500 text-sm ml-1'>
          {filtered.length} task{filtered.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* ── Task Table ── */}
      <div
        className='rounded-2xl overflow-hidden'
        style={{ background: '#1e1e1e', border: '1px solid #2a2a2a' }}
      >
        {filtered.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-gray-600'>
            <span className='text-5xl mb-3'>📭</span>
            <p className='text-base font-medium'>No tasks match your filters</p>
            <p className='text-sm mt-1'>Try adjusting your search or filter options</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className='w-full' style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2a2a2a', background: '#252525' }}>
                  {['#', 'Assigned To', 'Task', 'Category', 'Due Date', 'Priority', 'Status'].map((col) => (
                    <th
                      key={col}
                      className='py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500'
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => {
                  const status   = getStatus(row)
                  const priConf  = priorityConfig[row.priority] || priorityConfig['Medium']
                  const avatarBg = avatarColors[row.empIdx % avatarColors.length]

                  return (
                    <tr
                      key={i}
                      style={{ borderBottom: '1px solid #242424' }}
                      className='hover:bg-[#242424] transition-colors duration-150'
                    >
                      {/* Index */}
                      <td className='py-3.5 px-4 text-gray-600 text-sm'>{i + 1}</td>

                      {/* Assigned To */}
                      <td className='py-3.5 px-4'>
                        <div className='flex items-center gap-3'>
                          <div
                            className='w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0'
                            style={{ background: avatarBg }}
                          >
                            {getInitials(row.empName)}
                          </div>
                          <div>
                            <p className='text-white text-sm font-semibold leading-tight'>{row.empName}</p>
                            <p className='text-gray-500 text-xs'>{row.empEmail}</p>
                          </div>
                        </div>
                      </td>

                      {/* Task */}
                      <td className='py-3.5 px-4'>
                        <p className='text-white text-sm font-semibold'>{row.title}</p>
                        <p className='text-gray-500 text-xs mt-0.5 truncate max-w-[180px]'>{row.description}</p>
                      </td>

                      {/* Category */}
                      <td className='py-3.5 px-4'>
                        <span
                          className='text-xs font-medium px-2.5 py-1 rounded-full'
                          style={{ background: '#2a2a2a', color: '#94a3b8', border: '1px solid #3a3a3a' }}
                        >
                          {row.category || '—'}
                        </span>
                      </td>

                      {/* Due Date */}
                      <td className='py-3.5 px-4 text-gray-400 text-sm whitespace-nowrap'>
                        📅 {row.date || '—'}
                      </td>

                      {/* Priority */}
                      <td className='py-3.5 px-4'>
                        <span
                          className='text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit'
                          style={{ background: priConf.bg, color: priConf.color }}
                        >
                          <span className='w-1.5 h-1.5 rounded-full inline-block' style={{ background: priConf.color }} />
                          {row.priority || 'Medium'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className='py-3.5 px-4'>
                        <span
                          className='text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap'
                          style={{ background: status.bg, color: status.color }}
                        >
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewTasksPage
