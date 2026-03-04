import React, { useState, useContext } from 'react'
import Header from '../Dashboard_Components/Header'
import CreateTasksByAdmin from '../Dashboard_Components/CreateTasksByAdmin'
import AllTasks from '../Dashboard_Components/AllTasks'
import ViewTasksPage from '../Dashboard_Components/ViewTasksPage'
import { AuthContext } from '../../context/AuthContext'

const AdminDashboard = ({ HandleLogout }) => {
  const authData = useContext(AuthContext)

  // ── View State ─────────────────────────────────────────────────────────────
  // 'create' = Create Task + Employee Overview
  // 'viewTasks' = All Assigned Tasks page
  const [activeView, setActiveView] = useState('create')

  // ── Form State ─────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    assignTo: '',
    priority: 'Medium',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // ── Submit Handler ──────────────────────────────────────────────────────────
  // Saves the new task to the matching employee's task list in localStorage
  // and then calls refreshData() so AuthContext (and all consumers) update.
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitError('')

    const employees = JSON.parse(localStorage.getItem('employees')) || []

    // Find the employee by name (case-insensitive match)
    const empIndex = employees.findIndex(
      (emp) => emp.name.toLowerCase() === form.assignTo.trim().toLowerCase()
    )

    if (empIndex === -1) {
      setSubmitError(
        `No employee named "${form.assignTo}" found. Please check the name and try again.`
      )
      return
    }

    // Build the new task object
    const newTask = {
      title:       form.title.trim(),
      description: form.description.trim(),
      category:    form.category.trim(),
      date:        form.date,
      priority:    form.priority,
      newTask:     true,   // Appears as a "New" task in employee dashboard
      active:      false,
      completed:   false,
      failed:      false,
    }

    // Push the task into that employee's tasks array
    employees[empIndex].tasks = [...(employees[empIndex].tasks || []), newTask]

    // Persist to localStorage
    localStorage.setItem('employees', JSON.stringify(employees))

    // Refresh the AuthContext so every component that reads it gets fresh data
    if (authData?.refreshData) {
      authData.refreshData()
    }

    // Show success toast and reset form
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm({ title: '', description: '', category: '', date: '', assignTo: '', priority: 'Medium' })
  }

  const priorities = ['Low', 'Medium', 'High']
  const priorityColors = { Low: '#D1F2EB', Medium: '#FDEBD0', High: '#F8C8C4' }

  // Compute task counts across all employees (from fresh authData)
  const taskCounts = authData?.employees
    ? authData.employees.reduce(
        (acc, emp) => {
          const tasks = emp.tasks || []
          acc.total      += tasks.length
          acc.inProgress += tasks.filter((t) => t.active).length
          acc.completed  += tasks.filter((t) => t.completed).length
          acc.failed     += tasks.filter((t) => t.failed).length
          acc.newTasks   += tasks.filter((t) => t.newTask).length
          return acc
        },
        { total: 0, inProgress: 0, completed: 0, failed: 0, newTasks: 0 }
      )
    : { total: 0, inProgress: 0, completed: 0, failed: 0, newTasks: 0 }

  return (
    <div className='min-h-screen bg-[#1C1C1C] p-10'>

      {/* ── Header with View Toggle ── */}
      <div className='flex items-center justify-between mb-2'>
        <Header HandleLogout={HandleLogout} />

        {/* View Toggle Buttons */}
        <div className='flex items-center gap-3 ml-6 shrink-0'>
          <button
            onClick={() => setActiveView('create')}
            className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200'
            style={{
              background: activeView === 'create' ? '#D5D8FF' : '#2a2a2a',
              color:      activeView === 'create' ? '#000'    : '#94a3b8',
              border:     activeView === 'create' ? 'none'    : '1px solid #3a3a3a',
            }}
          >
            ✦ Create Task
          </button>

          <button
            onClick={() => setActiveView('viewTasks')}
            className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200'
            style={{
              background: activeView === 'viewTasks' ? '#7C6EF5' : '#2a2a2a',
              color:      activeView === 'viewTasks' ? '#fff'    : '#94a3b8',
              border:     activeView === 'viewTasks' ? 'none'    : '1px solid #3a3a3a',
            }}
          >
            📋 View Tasks
          </button>
        </div>
      </div>

      {/* ── Page Content ── */}
      {activeView === 'create' ? (
        <>
          <CreateTasksByAdmin
            form={form}
            setForm={setForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            submitted={submitted}
            submitError={submitError}
            priorities={priorities}
            priorityColors={priorityColors}
            taskCounts={taskCounts}
          />
          <AllTasks />
        </>
      ) : (
        <ViewTasksPage />
      )}
    </div>
  )
}

export default AdminDashboard
