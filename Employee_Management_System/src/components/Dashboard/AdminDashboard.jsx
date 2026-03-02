import React, { useState } from 'react'
import Header from '../Dashboard_Components/Header'
import CreateTasksByAdmin from '../Dashboard_Components/CreateTasksByAdmin'
import AllTasks from '../Dashboard_Components/AllTasks'

const AdminDashboard = ({ HandleLogout }) => {
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
    setTimeout(() => setSubmitted(false), 3000) // to remove the submitted message after 3 seconds
    setForm({ title: '', description: '', category: '', date: '', assignTo: '', priority: 'Medium' })
  }

  const priorities = ['Low', 'Medium', 'High']
  const priorityColors = { Low: '#D1F2EB', Medium: '#FDEBD0', High: '#F8C8C4' }

  return (
    <div className='min-h-screen bg-[#1C1C1C] p-10'>
      {/* Header */}
      <Header HandleLogout={HandleLogout} />

      <CreateTasksByAdmin form={form} setForm={setForm} handleChange={handleChange} handleSubmit={handleSubmit} submitted={submitted} priorities={priorities} priorityColors={priorityColors} />
      <AllTasks/>
    </div>
  )
}

export default AdminDashboard