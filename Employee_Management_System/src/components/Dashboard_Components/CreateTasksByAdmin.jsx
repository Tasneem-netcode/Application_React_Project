import React from 'react'

const CreateTasksByAdmin = ({form, setForm, handleChange, handleSubmit, submitted, submitError, priorities, priorityColors, taskCounts = {}}) => {
  const { total = 0, inProgress = 0, completed = 0, failed = 0, newTasks = 0 } = taskCounts

  
  return (
    <div>
        {/* Page Title */}
      <div className='mt-8 mb-6'>
        <h2 className='text-white text-3xl font-bold'>Create New Task</h2>
        <p className='text-gray-500 text-sm mt-1'>Fill in the details below to assign a task to an employee</p>
      </div>

      {/* Success Toast */}
      {submitted && (
        <div className='mb-6 flex items-center gap-3 bg-[#D1F2EB] text-green-900 px-5 py-3 rounded-xl font-medium shadow-lg'>
          <span className='text-xl'>✅</span>
          <span>Task created and assigned successfully!</span>
        </div>
      )}

      {/* Error Toast */}
      {submitError && (
        <div className='mb-6 flex items-center gap-3 bg-[#FADADD] text-red-900 px-5 py-3 rounded-xl font-medium shadow-lg'>
          <span className='text-xl'>⚠️</span>
          <span>{submitError}</span>
        </div>
      )}

      {/* Form Card */}
      <div className='bg-[#2a2a2a] rounded-2xl p-8 shadow-2xl'>
        <form onSubmit={handleSubmit}>
          {/* Row 1: Title + Assign To */}
          <div className='grid grid-cols-2 gap-6 mb-6'>
            <div className='flex flex-col gap-2'>
              <label className='text-gray-400 text-sm font-medium uppercase tracking-wider'>
                Task Title <span className='text-red-400'>*</span>
              </label>
              <input
                type='text'
                name='title'
                value={form.title}
                onChange={handleChange}
                placeholder='e.g. Complete Q1 Report'
                required
                className='bg-[#1C1C1C] text-white px-4 py-3 rounded-xl border border-[#3a3a3a] focus:outline-none focus:border-[#D5D8FF] placeholder-gray-600 transition-all duration-200'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-gray-400 text-sm font-medium uppercase tracking-wider'>
                Assign To <span className='text-red-400'>*</span>
              </label>
              <input
                type='text'
                name='assignTo'
                value={form.assignTo}
                onChange={handleChange}
                placeholder='e.g. John Doe'
                required
                className='bg-[#1C1C1C] text-white px-4 py-3 rounded-xl border border-[#3a3a3a] focus:outline-none focus:border-[#D5D8FF] placeholder-gray-600 transition-all duration-200'
              />
            </div>
          </div>

          {/* Row 2: Category + Date + Priority */}
          <div className='grid grid-cols-3 gap-6 mb-6'>
            <div className='flex flex-col gap-2'>
              <label className='text-gray-400 text-sm font-medium uppercase tracking-wider'>
                Category
              </label>
              <input
                type='text'
                name='category'
                value={form.category}
                onChange={handleChange}
                placeholder='e.g. Development'
                className='bg-[#1C1C1C] text-white px-4 py-3 rounded-xl border border-[#3a3a3a] focus:outline-none focus:border-[#D5D8FF] placeholder-gray-600 transition-all duration-200'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-gray-400 text-sm font-medium uppercase tracking-wider'>
                Due Date <span className='text-red-400'>*</span>
              </label>
              <input
                type='date'
                name='date'
                value={form.date}
                onChange={handleChange}
                required
                className='bg-[#1C1C1C] text-white px-4 py-3 rounded-xl border border-[#3a3a3a] focus:outline-none focus:border-[#D5D8FF] placeholder-gray-600 transition-all duration-200 cursor-pointer'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-gray-400 text-sm font-medium uppercase tracking-wider'>
                Priority
              </label>
              <div className='flex gap-2'>
                {priorities.map((p) => (
                  <button
                    key={p}
                    type='button'
                    onClick={() => setForm({ ...form, priority: p })}
                    className='flex-1 py-3 rounded-xl text-sm font-semibold text-black transition-all duration-200 border-2'
                    style={{
                      backgroundColor: form.priority === p ? priorityColors[p] : '#1C1C1C',
                      borderColor: form.priority === p ? priorityColors[p] : '#3a3a3a',
                      color: form.priority === p ? '#000' : '#6b7280',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Description */}
          <div className='flex flex-col gap-2 mb-8'>
            <label className='text-gray-400 text-sm font-medium uppercase tracking-wider'>
              Task Description
            </label>
            <textarea
              name='description'
              value={form.description}
              onChange={handleChange}
              placeholder='Describe what needs to be done...'
              rows={4}
              className='bg-[#1C1C1C] text-white px-4 py-3 rounded-xl border border-[#3a3a3a] focus:outline-none focus:border-[#D5D8FF] placeholder-gray-600 transition-all duration-200 resize-none'
            />
          </div>

          {/* Submit Row */}
          <div className='flex items-center justify-between'>
            {/* Preview Badge */}
            {form.priority && (
              <div className='flex items-center gap-2 text-gray-400 text-sm'>
                <span>Priority:</span>
                <span
                  className='px-3 py-1 rounded-full text-black text-xs font-bold'
                  style={{ backgroundColor: priorityColors[form.priority] }}
                >
                  {form.priority}
                </span>
              </div>
            )}

            <div className='flex gap-3 ml-auto'>
              <button
                type='button'
                onClick={() => setForm({ title: '', description: '', category: '', date: '', assignTo: '', priority: 'Medium' })}
                className='px-6 py-3 rounded-xl text-gray-400 border border-[#3a3a3a] hover:border-gray-500 hover:text-white transition-all duration-200 font-medium'
              >
                Clear
              </button>
              <button
                type='submit'
                className='px-8 py-3 rounded-xl bg-[#D5D8FF] text-black font-semibold hover:bg-[#bbbfff] active:scale-95 transition-all duration-200 shadow-lg'
              >
                ✦ Create Task
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Info Cards */}
      {(() => {
        const statCards = [
          { label: 'Total',       value: total,      icon: '📋', bg: '#2a2a2a',  accent: '#94a3b8' },
          { label: 'New',         value: newTasks,   icon: '🆕', bg: '#1e1040',  accent: '#a78bfa' },
          { label: 'In Progress', value: inProgress, icon: '⚡', bg: '#2d1f02',  accent: '#f59e0b' },
          { label: 'Completed',   value: completed,  icon: '✅', bg: '#052e16',  accent: '#22c55e' },
          { label: 'Failed',      value: failed,     icon: '❌', bg: '#2d0505',  accent: '#ef4444' },
        ]
        return (
          <div className='grid grid-cols-5 gap-4 mt-8'>
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
        )
      })()}
    </div>
  )
}

export default CreateTasksByAdmin
