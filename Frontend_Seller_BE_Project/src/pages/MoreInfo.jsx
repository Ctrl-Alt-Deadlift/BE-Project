import React, { useEffect, useState, useContext } from "react";
import { sellerContext } from "../Context/sellerContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar.jsx";

const MoreInfo = () => {
  const { backendUrl, token } = useContext(sellerContext);
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplierInfo = async () => {
      try {
        if (!token) {
          toast.error("Authentication token missing. Please login again.");
          return;
        }

        const response = await axios.get(`${backendUrl}/api/supplier/myinfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSupplier(response.data.supplier);
        console.log("Supplier Info:", response.data.supplier);

      } catch (error) {
        console.error("Fetch Supplier Info Error:", error);
        toast.error("Failed to load supplier info");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierInfo();
  }, [backendUrl, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-400">No supplier information available.</p>
        </div>
      </div>
    );
  }

  // Helper to get status color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Verified":
        return "bg-green-600";
      case "Under Review":
        return "bg-blue-600";
      case "Rejected":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center py-10 px-4 mt-[50px] sm:mt-[100px]">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-3xl text-center space-y-8">

          {/* Profile Image */}
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={supplier.profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-blue-600"
            />
            {/* Verified/Not Verified Badge */}
            {supplier.isVerifiedSupplier ? (
              <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                Verified
              </span>
            ) : (
              <span className="absolute bottom-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                Not Verified
              </span>
            )}
          </div>

          {/* Supplier Name */}
          <h2 className="text-2xl font-bold">{supplier.name}</h2>

          {/* Status Pill */}
          <div className={`inline-block ${getStatusClasses(supplier.status)} text-white text-xs font-semibold px-4 py-1 rounded-full`}>
            {supplier.status || "Active"}
          </div>

          {/* Email and Phone */}
          <div className="mt-4 space-y-2">
            <p className="text-xl text-gray-400">📧 {supplier.email}</p>
            <p className="text-xl text-gray-400">📱 {supplier.phone}</p>
          </div>

          {/* Address */}
          <div className="mt-4">
            <p className="text-xl text-gray-400">🏠 {supplier.address}</p>
          </div>
          <div className="mt-4">
            <p className="text-xl text-gray-400">🆔 {supplier._id}</p>
          </div>

          {/* ID Photo */}
          <div className="mt-6">
            <p className="text-xl text-gray-400 mb-2">Government ID Photo</p>
            <img
              src={supplier.photoId}
              alt="ID Document"
              className="w-full rounded-lg border border-gray-700"
            />
          </div>

          {/* Admin Message */}
          <div className="mt-8 text-left w-full">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Admin Message</h3>
            {supplier.adminMessage ? (
              <div className="bg-yellow-500 text-black p-4 rounded-lg text-xl">
                {supplier.adminMessage}
              </div>
            ) : (
              <p className="text-gray-400 text-xl">No message from admin.</p>
            )}
          </div>

          {/* Joined Date */}
          <p className="text-gray-400 text-xs mt-6">
            Joined on: {new Date(supplier.createdAt).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>

        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
