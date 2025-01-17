import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        {/* There is a active property in every navlink if we click on that navlink the className will have active property. */}
        <NavLink to="/" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
          <img className='w-5 h-5' src={assets.home_icon} />
          <p className='hidden md:block'>Home</p>
        </NavLink>
        <NavLink to="/add" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
          <img className='w-5 h-5' src={assets.add_icon} />
          <p className='hidden md:block'>Add items</p>
        </NavLink>
        <NavLink to="/list" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
          <img className='w-5 h-5' src={assets.order_icon} />
          <p className='hidden md:block'>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
          <img className='w-5 h-5' src={assets.order_icon} />
          <p className='hidden md:block'>Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar