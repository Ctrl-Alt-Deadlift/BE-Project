import { assets } from "../assets/assets.js"
const Footer = () => {
  return (
    <div>

      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        <div>
          {/* <img src={assets.logo} className="mb-5 w-32" alt="" /> */}

          <p className="mb-5 w-32 ml-[100px] font-serif rounded-full font-bold text-4xl text-pink-600 italic flex items-center justify-center gap-2">
            <span className="text-pink-700 text-3xl">✿</span>
            <span className="text-pink-400">
              _Fashionify_
            </span>
            <span className="text-2xl text-pink-900 font-light">.com</span>
          </p>
          <p className="w-full md:w-2/3 text-gray-600">
            Fashionify is a Gen-Z clothing brand blending bold trends, sustainable fashion, and individuality, empowering self-expression through vibrant, inclusive designs.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-444-2345</li>
            <li>contact@fashionify.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center py-4 text-sm">Copyright 2024@ Fashionify.com - All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer