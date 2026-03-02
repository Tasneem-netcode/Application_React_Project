import React, { useState } from 'react'
import Header from '../Dashboard_Components/Header'
import TaskList, { AcceptTask, NewTask, CompleteTask, FailedTask } from '../TaskList/TaskList'

const EmpDashboard = ({ data, HandleLogout }) => {
  const [employeeData, setEmployeeData] = useState(data)
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'completed' | 'failed'

  const handleTaskUpdate = (updatedData) => {
    setEmployeeData(updatedData)
  }



  return (
    <div className='flex h-screen bg-[#1C1C1C] overflow-hidden'>

      {/* ── LEFT: Header + Stat Cards ── */}
      <div className='w-[40%] flex flex-col p-10 border-r border-white/10'>
        <Header data={employeeData} HandleLogout={HandleLogout} />
        <div className='mt-10'>
          <TaskList data={employeeData} />
        </div>
      </div>

      {/* ── RIGHT: Scrollable Task Lists ── */}
      <div className='flex-1 overflow-y-auto p-10 flex flex-col gap-8'>

        {/* New Tasks */}
        <div>
          <h2 className='text-white text-lg font-semibold mb-4'>🆕 New Tasks</h2>
          <div className='bg-[#2a2a2a] rounded-xl p-5'>
            <NewTask data={employeeData} onTaskUpdate={handleTaskUpdate} />
          </div>
        </div>

        {/* All My Tasks + Completed Tasks — tabbed */}
        <div>

          {/* Tab Header Row */}
          <div className='flex items-center gap-3 mb-4 flex-wrap'>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
                ${activeTab === 'all'
                  ? 'bg-white text-black shadow'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                }`}
            >
              📋 All My Tasks
            </button>

            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
                ${activeTab === 'completed'
                  ? 'bg-[#D5D8FF] text-black shadow'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                }`}
            >
              ✅ Completed Tasks
            </button>

            <button
              onClick={() => setActiveTab('failed')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
                ${activeTab === 'failed'
                  ? 'bg-[#D1F2EB] text-black shadow'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                }`}
            >
              ❌ Failed Tasks
            </button>
          </div>

          {/* Tab Content */}
          <div className='bg-[#2a2a2a] rounded-xl p-5'>
            {activeTab === 'all' && <AcceptTask data={employeeData} />}
            {activeTab === 'completed' && <CompleteTask data={employeeData} />}
            {activeTab === 'failed' && <FailedTask data={employeeData} />}
          </div>

        </div>

      </div>

    </div>
  )
}

export default EmpDashboard