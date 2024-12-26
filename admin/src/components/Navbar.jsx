import { assets } from "../assets/assets.js"

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <div>
        <div>
          <p className="font-serif rounded-full font-bold text-4xl text-pink-600 italic flex items-center justify-center gap-2">
            <span className="text-pink-700 text-3xl">✿</span>
            <span className="text-pink-400">
              _Fashionify_
            </span>
            <span className="text-2xl text-pink-900 font-light">.com</span>
          </p>
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