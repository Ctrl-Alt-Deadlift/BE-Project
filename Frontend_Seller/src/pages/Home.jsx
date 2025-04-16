import React from 'react'
import Navbar from '../components/Navbar.jsx'
const Home = () => {
  return (
    <div className='flex'>
      <Navbar />
      <div className='text-center text-3xl mt-[100px]'>
        <p className='text-white'>This is home</p>
      </div>
    </div>
  )
}

export default Home