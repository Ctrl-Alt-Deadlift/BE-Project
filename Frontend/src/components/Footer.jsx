import { assets } from "../assets/assets.js"
const Footer = () => {
  return (
    <div>

      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        <div>
          {/* <img src={assets.logo} className="mb-5 w-32" alt="" /> */}



          <img src={assets.logo_fashionify} className="h-[100px] w-[100px] sm:mr-[0px] mr-[100px] md:h-[150px] md:w-[150px] rounded-lg " alt="" />


          <p className="mt-[20px] w-full md:w-2/3 text-gray-600">
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
            <li>phone:+91-7823456789</li>
            <li>tele:27923456</li>
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