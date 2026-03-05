import React from 'react'

const getInitials = (name = '') =>
  name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)

const Header = ({ data, HandleLogout }) => {
  const username = data?.name || 'Admin'
  const initials = getInitials(username)
  const now      = new Date()
  const hour     = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className='flex items-start justify-between'>

      {/* Left: Avatar + Greeting */}
      <div className='flex items-center gap-4'>
        {/* Avatar */}
        <div
          className='w-14 h-14 rounded-2xl flex items-center justify-center text-white text-base font-bold shrink-0'
          style={{ background: 'linear-gradient(135deg, #7C6EF5, #5BBCF8)' }}
        >
          {initials}
        </div>

        {/* Text */}
        <div>
          <p className='text-gray-500 text-base font-medium'>{greeting} 👋</p>
          <h1 className='text-white text-2xl font-bold leading-tight mt-1'>{username}</h1>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={HandleLogout}
        className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95'
        style={{ background: '#2a2a2a', color: '#ef4444', border: '1px solid #3a3a3a' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#ef4444'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#3a3a3a'}
      >
        <span>⎋</span> Log Out
      </button>
    </div>
  )
}

export default Header
