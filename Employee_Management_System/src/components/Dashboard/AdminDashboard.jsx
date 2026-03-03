import React, { useState, useContext } from 'react'
import Header from '../Dashboard_Components/Header'
import CreateTasksByAdmin from '../Dashboard_Components/CreateTasksByAdmin'
import AllTasks from '../Dashboard_Components/AllTasks'
import { AuthContext } from '../../context/AuthContext'

const AdminDashboard = ({ HandleLogout }) => {
  const authData = useContext(AuthContext)

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    assignTo: '',
    priority: 'Medium',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm({ title: '', description: '', category: '', date: '', assignTo: '', priority: 'Medium' })
  }

  const priorities = ['Low', 'Medium', 'High']
  const priorityColors = { Low: '#D1F2EB', Medium: '#FDEBD0', High: '#F8C8C4' }

  // Compute task counts across all employees
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
      {/* Header */}
      <Header HandleLogout={HandleLogout} />

      <CreateTasksByAdmin
        form={form}
        setForm={setForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitted={submitted}
        priorities={priorities}
        priorityColors={priorityColors}
        taskCounts={taskCounts}
      />
      <AllTasks />
    </div>
  )
}

export default AdminDashboard