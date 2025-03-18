import React, { useState } from "react";
import { Link } from "react-router-dom";

const inputStyles = "border border-gray-600 bg-gray-700 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
const inputStyles2 = " bg-gray-700 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
const buttonStyles = "w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition";

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegister ? "Register" : "Login"}
        </h2>

        {isRegister ? (
          <form className="space-y-4">
            <input type="text" placeholder="Name" className={`${inputStyles}`} required />
            <input type="email" placeholder="Email" className={`${inputStyles}`} required />
            <input type="password" placeholder="Password" className={`${inputStyles}`} required />
            <input type="text" placeholder="Address" className={`${inputStyles}`} required />
            <input type="tel" placeholder="Phone" className={`${inputStyles}`} required />
            <div>
              <p className={`${inputStyles2} mb-[10px]`}>Upload PhotoId (Aadhar/Driving License/VoterId) </p>
              <input type="file" className={`${inputStyles} bg-gray-700 p-2`} required />
            </div>

            <button className={`${buttonStyles}`}>Register</button>
          </form>
        ) : (
          <form className="space-y-4">
            <input type="text" placeholder="Email or Phone" className={`${inputStyles}`} required />
            <input type="password" placeholder="Password" className={`${inputStyles}`} required />
            <button className={`${buttonStyles}`}>Login</button>
          </form>
        )}

        <p className="text-center mt-4">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            className="text-blue-400 ml-2 hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>

        <Link to="/" className="block text-center mt-6 text-gray-400 hover:text-white">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default LoginRegister;
