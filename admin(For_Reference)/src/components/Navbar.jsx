import { assets } from "../assets/assets.js"

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <div>
        <div>

          <img src={assets.fashionify_logo} className="h-[100px] w-[100px] sm:mr-[0px] mr-[100px] md:h-[100px] md:w-[100px] rounded-lg " alt="" />

        </div>
        <div className="px-2  mt-2 border-2 w-[140px] bg-slate-200">
          <p className="text-gray-500 text-xl font-semibold">Admin Panel</p>
        </div>

      </div>

      <button onClick={() => setToken('')} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">Logout</button>
    </div>
  )
}

export default Navbar