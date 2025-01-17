import { useState, useContext, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx'
import { toast } from 'react-toastify'

const Navbar = () => {

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const [visible, setvisible] = useState(false);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    toast.success("User Logged Out", {
      autoClose: 1000,
    })

  }

  const setText = () => {
    if (token !== '') {
      return 'LOGOUT';
    }

    else {
      return 'LOGIN/SIGN-UP'
    }
  }

  return (



    <div className="flex items-center justify-start sm:justify-between py-5 font-medium">

      {/* <Link to="/"><p className='font-serif font-semibold text-3xl text-pink-600 italic'>Fashionify<span className='text-2xl text-pink-800'>.com</span></p></Link> */}
      {/* <Link to="/">
        <p className="font-serif rounded-full font-bold text-4xl text-pink-600 italic transition-all duration-300 ease-in-out">
          <span className="text-white bg-gradient-to-r from-pink-500 via-pink-600 to-pink-800 bg-clip-text text-transparent">_Fashionify_</span>
          <span className="text-2xl text-pink-900 font-light">.com</span><span>✿</span>
        </p>
      </Link> */}

      <Link to="/">
        <div className='mr-[10px] flex justify-start'>
          <p className="font-serif rounded-full text-3xl font-bold md:text-4xl italic flex items-center justify-start gap-2">
            <span className="text-pink-700 text-2xl md:text-3xl">✿</span>
            <span className="text-pink-400">
              _Fashionify_
            </span>
            <span className=" text-xl md:text-2xl text-pink-900 font-light">.com</span>
          </p>
        </div>

      </Link>


      <ul className='hidden sm:flex gap-5  text-sm text-gray-700'>

        <NavLink to="/" className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to="/collection" className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to="/about" className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to="/contact" className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
        </NavLink>

      </ul>




      <div className='flex items-center gap-[10px] sm:gap-6 '>

        <img src={assets.search_icon} onClick={() => setShowSearch(true)} className='w-5 cursor-pointer' alt="" />

        <div className='group relative'>

          <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
          {/* Dropdown menu */}
          {token &&
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={() => logout()} className='cursor-pointer hover:text-black'>LogOut</p>
              </div>
            </div>
          }

        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>

        </Link >
        {/* For Mobile Screens the menu icon (hamburger icon) is shown */}
        <img onClick={() => setvisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        <div className=' justify-center items-center hidden sm:flex'>
          <a href='https://ecommerce-website-adminpanel.vercel.app/' target='_blank'>
            <button className='border-gray-500 border-2 text-gray-500 rounded-xl sm:text-xs  w-[100px] px-3 py-1 text-sm'>admin panel</button>
          </a>
        </div>

      </div>


      {/* SideBar menu for small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'} `}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setvisible(false)} className='flex items-center gap-2  p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180' />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setvisible(false)} className='py-2 pl-6 border' to="/">HOME</NavLink>
          <NavLink onClick={() => setvisible(false)} className='py-2 pl-6 border' to="/collection">COLLECTIONS</NavLink>
          <NavLink onClick={() => setvisible(false)} className='py-2 pl-6 border' to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setvisible(false)} className='py-2 pl-6 border' to="/contact">CONTACT</NavLink>
          {/* <NavLink onClick={() => setvisible(false)} className='py-2 pl-6 border' to="/login">SIGN UP / SIGN IN</NavLink> */}
          <NavLink onClick={() => {
            setvisible(false);
            token ? logout() : navigate('/login')

          }} className='py-2 pl-6 border' to='/login' >{setText()}</NavLink>
          <a onClick={() => setvisible(false)} className='py-2 pl-6 border' href='https://ecommerce-website-adminpanel.vercel.app/' target='_blank'>
            ADMIN PANEL
          </a>

        </div>


      </div >
    </div >

  )

}

export default Navbar