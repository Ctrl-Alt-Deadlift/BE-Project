// import React, { useState } from 'react';
// import Navbar from '../components/Navbar.jsx';
// import demoImage from '../assets/react.svg';

// const Requests = () => {
//   const [requests, setRequests] = useState([
//     {
//       _id: "6804bbd629d617878b4c6168",
//       name: "Pro Players Basketball",
//       images: [
//         "https://res.cloudinary.com/dogde9dvj/image/upload/v1745140964/xn59senurs9ijy52hxj4.webp",
//       ],
//       quantity: 1,
//       status: "Under Review",
//       adminMessage: "The product is not yet verified",
//     },
//     {
//       _id: "6804bd2029d617878b4c616e",
//       name: "Whey Protein Isolate ON",
//       images: [
//         "https://res.cloudinary.com/dogde9dvj/image/upload/v1745141294/mzwo3v8pky0iy9eedlmt.webp",
//       ],
//       quantity: 1,
//       status: "Under Review",
//       adminMessage: "The product is not yet verified",
//     },
//     {
//       _id: "demo-product-id",
//       name: "Demo Product",
//       images: [],
//       quantity: 2,
//       status: "Not Reviewed Yet",
//       adminMessage: "Please upload product images.",
//     },
//   ]);

//   // Function to get status badge color
//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Not Reviewed Yet":
//         return "bg-gray-400";
//       case "Under Review":
//         return "bg-yellow-500";
//       case "Reviewed":
//         return "bg-green-500";
//       case "Product Added to Platform":
//         return "bg-blue-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <Navbar />
//       <h2 className="text-2xl font-semibold mb-6 text-center">Your Product Requests</h2>

//       <div className="overflow-x-auto">
//         <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
//           <thead className="bg-gray-200 text-gray-700">
//             <tr>
//               <th className="py-3 px-5 text-left">Product ID</th>
//               <th className="py-3 px-5 text-left">Name</th>
//               <th className="py-3 px-5">Image</th>
//               <th className="py-3 px-5">Quantity</th>
//               <th className="py-3 px-5">Status</th>
//               <th className="py-3 px-5">Admin Message</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.length > 0 ? (
//               requests.map((req) => (
//                 <tr key={req._id} className="border-b hover:bg-gray-50">
//                   <td className="py-4 px-5">{req._id}</td>
//                   <td className="py-4 px-5">{req.name}</td>
//                   <td className="py-4 px-5 flex justify-center">
//                     {req.images.length > 0 ? (
//                       <img
//                         src={req.images[0]}
//                         alt={req.name}
//                         className="w-16 h-16 object-cover rounded-md"
//                       />
//                     ) : (
//                       <img
//                         src={demoImage}
//                         alt="No Image"
//                         className="w-16 h-16 object-contain rounded-md opacity-50"
//                       />
//                     )}
//                   </td>
//                   <td className="py-4 px-5 text-center">{req.quantity}</td>
//                   <td className="py-4 px-5 text-center">
//                     <span
//                       className={`px-3 py-1 rounded-full text-white text-xs ${getStatusBadge(
//                         req.status
//                       )}`}
//                     >
//                       {req.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-5">{req.adminMessage}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-8">
//                   No product requests found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Requests;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';

import { sellerContext } from '../Context/sellerContext';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const { backendUrl, token, navigate } = useContext(sellerContext);

  // Function to fetch supplier products
  const fetchSupplierRequests = async () => {
    try {

      const authToken = token;

      if (!authToken) {
        console.error('Token not found.');
        return;
      }
      console.log('token:', token);
      // Decode the token to get supplierId
      const payload = JSON.parse(atob(authToken.split('.')[1])); // careful: this is base64 decode
      const supplierId = payload.id; // Assuming token payload has 'id' field

      const response = await axios.get(`${backendUrl}/api/supplier/list/${supplierId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const products = response.data.products;

      // Format the products to match the structure you want
      const formattedProducts = products.map(product => ({
        product_id: product._id,
        name: product.name,
        image: product.images[0], // Taking only the first image
        quantity: product.quantity,
        status: product.status,
        adminMessage: product.adminMessage,
      }));

      setRequests(formattedProducts);
    } catch (error) {
      console.error('Error fetching supplier requests:', error);
    }
  };

  useEffect(() => {
    fetchSupplierRequests();
  }, []);

  // Function to get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "Under Review":
        return "bg-gray-400";
      case "Verified":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar />
      <h2 className="text-2xl font-semibold mb-4">Your Product Requests</h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Product Id</th>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Admin Message</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.product_id} className="border-b">
                <td className="py-3 px-4">{req.product_id}</td>
                <td className="py-3 px-4">{req.name}</td>
                <td className="py-3 px-4">
                  {req.image ? (
                    <img src={req.image} alt="Product" className="h-16 w-16 object-cover rounded-md" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">{req.quantity}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusBadge(req.status)}`}>
                    {req.status}
                  </span>
                </td>
                <td className="py-3 px-4">{req.adminMessage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;

