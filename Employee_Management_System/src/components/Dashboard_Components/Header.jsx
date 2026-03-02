import React from 'react'

const Header = ({data, HandleLogout}) => {

  // Derive name directly from props — no useState needed
  const username = data?.name || 'Admin'

  return (
    <div className='flex item-center justify-between'>
        <h1 className='text-2xl font-medium'>Hello <br /> <span className='text-gray-600 font-semibold text-3xl'>{username}</span> 👋🏻</h1>
        <button onClick={HandleLogout} className='bg-gray-400 text-black px-4 py-2 text-lg font-medium rounded-full'>Log Out</button>
    </div>
  )
} 

export default Header 
