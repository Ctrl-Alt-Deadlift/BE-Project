// import { assets } from '../assets/assets.js';
// const Hero = () => {
//   return (
//     <div className="flex flex-col sm:flex-row border border-gray-400">
//       {/* Hero Left Side */}
//       <img className='w-full sm:w-1/2' src={assets.hero_img1} alt="" />
//       <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">

//         <div className="text-[#414141]">
//           <div className="flex items-center gap-2">

//             <p className="w-8 md:w-11 h-[2px]  bg-[#414141]"></p>
//             <p className="font-medium text-sm md:text-base ">Shop On</p>

//           </div>


//           <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">LATEST FASHION</h1>
//           <div className="flex items-center gap-2">
//             <p className="font-semibold text-sm md:text-base">Stay Ahead Of The Crowd !</p>
//             <p className="w-8 md:w-11 h-[1px]  bg-[#414141]"></p>
//           </div>

//         </div>
//       </div>
//       {/* Hero Right Side */}

//     </div>

//   )
// }

// export default Hero

import rent_logo from '../assets/rent.avif';
import sale_logo from '../assets/sale.webp';
import { ShopContext } from './../context/ShopContext';
import { NavLink, Link } from 'react-router-dom';

// To use icons, you would typically install a library like lucide-react
// npm install lucide-react
// For this example, we'll use inline SVG for the arrow icon.
const ArrowRight = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2" 
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);


const Hero = () => {
  // Using placeholder images. Replace these with your actual asset URLs.
  const image1Src = rent_logo;
  const image2Src = sale_logo;

  return (
    <section className="font-sans bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Main container for the hero section.
          On small screens (mobile), it displays as a single column flex container.
          On medium screens and larger (md:), it becomes a 2x2 grid.
          This ensures the layout is responsive.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-2 w-full aspect-[1/1] md:aspect-[4/3] lg:aspect-[16/9] max-h-[800px]">

          {/* Box 1: Top-Left (Image) */}
          <div className="relative w-full h-full overflow-hidden rounded-lg group">
            <img
              src={image1Src}
              alt="Stylish fashion apparel"
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x600/d1d5db/374151?text=Image+Not+Found'; }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
          </div>

          {/* Box 2: Top-Right (Text) */}
          <div className="w-full h-full bg-stone-100 rounded-lg flex items-center justify-center p-6 lg:p-12">
            <div className="text-center md:text-left">
              <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Dictionary of Products
              </h1>
              <p className="text-gray-600 mb-6 lg:text-lg">
                Discover What You Want
              </p>
              <NavLink to="/collection">

                <button className="inline-flex items-center gap-2 bg-gray-800 text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                  Explore Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </NavLink>

            </div>
          </div>

          {/* Box 3: Bottom-Left (Text) */}
          <div className="w-full h-full bg-stone-100 rounded-lg flex items-center justify-center p-6 lg:p-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Buying and Renting at your Fingertips.
              </h2>
              <p className="text-gray-600 lg:text-lg">
                Products verified for quality and authenticity.
              </p>
            </div>
          </div>

          {/* Box 4: Bottom-Right (Image) */}
          <div className="relative w-full h-full overflow-hidden rounded-lg group">
            <img
              src={image2Src}
              alt="Close-up of a fashion accessory"
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x600/9ca3af/1f2937?text=Image+Not+Found'; }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;