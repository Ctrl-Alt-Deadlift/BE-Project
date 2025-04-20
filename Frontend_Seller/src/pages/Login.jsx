

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { sellerContext } from "../Context/sellerContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const inputStyles = "border border-gray-600 bg-gray-700 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
const inputStyles2 = " bg-gray-700 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
const buttonStyles = "w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition";

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [photoId, setPhotoId] = useState(null);
  const [profilePhoto, setprofilePhoto] = useState(null);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const { navigate, backendUrl, token, setToken } = useContext(sellerContext);
  const [isSubmitting, setIsSubmitting] = useState(false); // New loading state

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("photoId", photoId);
    formData.append("profilePhoto", profilePhoto);

    try {
      const response = await axios.post(backendUrl + '/api/supplier/register', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success("Registration successful!");
        setToken(response.data.token);
        setEmailOrPhone(email);
        setIsRegister(false); // Switch to login
      }
    } catch (error) {
      console.error("Registration Error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendUrl + "/api/supplier/login", {
        emailOrPhone,
        password,
      });

      if (response.status === 200) {
        const { token, supplier } = response.data;
        setToken(response.data.token);
        localStorage.setItem("supplierToken", token);
        localStorage.setItem("supplier", JSON.stringify(supplier));
        toast.success('Logged In Successfully !', {
          position: "top-right",
          autoClose: 2000,
          theme: "colored"
        });
        navigate('/home');
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegister ? "Register" : "Login"}
        </h2>

        {isRegister ? (
          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              className={`${inputStyles}`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className={`${inputStyles}`}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={`${inputStyles}`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className={`${inputStyles}`}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone"
              className={`${inputStyles}`}
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div>
              <p className={`${inputStyles2} mb-[10px]`}>
                Upload a Clear Profile Photo
              </p>
              <input
                type="file"
                className={`${inputStyles} bg-gray-700 p-2`}
                required
                onChange={(e) => setprofilePhoto(e.target.files[0])}
              />

            </div>
            <div>
              <p className={`${inputStyles2} mb-[10px]`}>
                Upload PhotoId (Aadhar/Driving License/VoterId)
              </p>
              <input
                type="file"
                className={`${inputStyles} bg-gray-700 p-2`}
                required
                onChange={(e) => setPhotoId(e.target.files[0])}
              />
            </div>

            <button type="submit" className={`${buttonStyles}`} disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email or Phone"
              className={`${inputStyles}`}
              required
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={`${inputStyles}`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={`${buttonStyles}`}>
              Login
            </button>
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

      </div>
    </div>
  );
};

export default LoginRegister;