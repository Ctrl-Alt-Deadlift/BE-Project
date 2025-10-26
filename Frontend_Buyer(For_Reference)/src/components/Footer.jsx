import { assets_new } from "../assets/assets_new.js"
import { useNavigate } from "react-router-dom"
const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);

    // Custom smooth scroll to top with animation
    const scrollToTop = () => {
      const currentPosition = window.pageYOffset;
      if (currentPosition > 0) {
        // Adjust this value to control speed (higher = faster)
        // 40 is fast, 20 is slower, 60 is very fast, 80 is super fast
        const scrollStep = Math.max(20, currentPosition / 30);
        window.scrollBy(0, -scrollStep);
        requestAnimationFrame(scrollToTop);
      }
    };
    scrollToTop();
  }

  return (
    <div>

      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        <div>
          <img src={assets_new.rensell_logo} className="h-[100px] w-[100px] sm:mr-[0px] mr-[100px] md:h-[150px] md:w-[150px] rounded-lg " alt="" />


          <p className="mt-[20px] w-full md:w-2/3 text-gray-600">
            Rensell is a modern e-commerce platform connecting buyers and sellers for renting and purchasing quality products. Empowering sustainable consumption, Rensell offers verified goods with flexible options—buy what you need, rent what you love.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li onClick={() => handleNavigation('/')} className="cursor-pointer hover:underline">Home</li>
            <li onClick={() => handleNavigation('/about')} className="cursor-pointer hover:underline">About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>phone:+91-7823456XXX</li>
            <li>Tel: (022)-98134XXX</li>
            <li>contact@Rensell.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center py-4 text-sm">Copyright 2025  @ Rensell.com - All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer