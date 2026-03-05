import React, { useState, useEffect } from 'react'
import Header from '../Dashboard_Components/Header'
import TaskList, { AcceptTask, NewTask, CompleteTask, FailedTask } from '../TaskList/TaskList'

const tabs = [
  { id: 'all',       label: 'All Tasks',  icon: '📋', activeStyle: { bg: '#2a2a2a', color: '#fff',     border: '#3a3a3a' } },
  { id: 'completed', label: 'Completed',  icon: '✅', activeStyle: { bg: '#052e16', color: '#22c55e', border: '#22c55e40' } },
  { id: 'failed',    label: 'Failed',     icon: '❌', activeStyle: { bg: '#2d0505', color: '#ef4444', border: '#ef444440' } },
]

const EmpDashboard = ({ data, HandleLogout }) => {
  const [employeeData, setEmployeeData] = useState(data)
  const [activeTab, setActiveTab]       = useState('all')

  useEffect(() => {
    const syncFromStorage = () => {
      const employees = JSON.parse(localStorage.getItem('employees')) || []
      const fresh = employees.find((emp) => emp.id === data.id)
      if (fresh) setEmployeeData(fresh)
    }
    syncFromStorage()
    window.addEventListener('focus', syncFromStorage)
    const interval = setInterval(syncFromStorage, 3000)
    return () => {
      window.removeEventListener('focus', syncFromStorage)
      clearInterval(interval)
    }
  }, [data.id])

  const handleTaskUpdate = (updatedData) => setEmployeeData(updatedData)
  const newTaskCount = employeeData.tasks?.filter(t => t.newTask).length || 0

  return (
    <div className='flex h-screen bg-[#141414] overflow-hidden'>

      {/* ── LEFT SIDEBAR ── */}
      <div
        className='w-[40%] shrink-0 flex flex-col p-10 gap-10'
        style={{ borderRight: '1px solid #242424' }}
      >
        {/* Header */}
        <Header data={employeeData} HandleLogout={HandleLogout} />

        {/* Stat Cards */}
        <TaskList data={employeeData} />
      </div>

      {/* ── RIGHT CONTENT ── */}
      <div className='flex-1 overflow-y-auto'>

        {/* Sticky top bar */}
        <div
          className='sticky top-0 z-10 px-8 pt-8 pb-4 flex items-center justify-between'
          style={{ background: '#141414', borderBottom: '1px solid #1e1e1e' }}
        >
          <div>
            <h2 className='text-white text-2xl font-bold'>Task Board</h2>
            <p className='text-gray-600 text-base mt-0.5'>Manage and update your assigned tasks</p>
          </div>
          {newTaskCount > 0 && (
            <div
              className='flex items-center gap-2 px-4 py-2 rounded-xl text-base font-semibold'
              style={{ background: '#1e1040', color: '#a78bfa', border: '1px solid #a78bfa30' }}
            >
              🆕 {newTaskCount} new task{newTaskCount > 1 ? 's' : ''} waiting
            </div>
          )}
        </div>

        <div className='px-8 py-6 flex flex-col gap-8'>

          {/* Incoming Tasks */}
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-1 h-5 rounded-full' style={{ background: 'linear-gradient(180deg, #a78bfa, #7C6EF5)' }} />
              <h3 className='text-white text-lg font-bold'>Incoming Tasks</h3>
              {newTaskCount > 0 && (
                <span className='text-xs font-bold px-2 py-0.5 rounded-full ml-1' style={{ background: '#1e1040', color: '#a78bfa' }}>
                  {newTaskCount}
                </span>
              )}
            </div>
            <div className='rounded-2xl p-5' style={{ background: '#1a1a1a', border: '1px solid #242424' }}>
              <NewTask data={employeeData} onTaskUpdate={handleTaskUpdate} />
            </div>
          </div>

          {/* Tabbed Section */}
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-1 h-5 rounded-full' style={{ background: 'linear-gradient(180deg, #5BBCF8, #7C6EF5)' }} />
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                const s = tab.activeStyle
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className='px-4 py-2 rounded-xl text-base font-semibold transition-all duration-200 active:scale-95'
                    style={
                      isActive
                        ? { background: s.bg, color: s.color, border: `1px solid ${s.border}` }
                        : { background: 'transparent', color: '#6b7280', border: '1px solid transparent' }
                    }
                  >
                    {tab.icon} {tab.label}
                  </button>
                )
              })}
            </div>

            <div className='rounded-2xl p-5' style={{ background: '#1a1a1a', border: '1px solid #242424' }}>
              {activeTab === 'all'       && <AcceptTask   data={employeeData} onTaskUpdate={handleTaskUpdate} />}
              {activeTab === 'completed' && <CompleteTask data={employeeData} />}
              {activeTab === 'failed'    && <FailedTask   data={employeeData} />}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EmpDashboard