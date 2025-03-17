import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import demoImage from '../assets/react.svg'


const Requests = () => {
  const [requests, setRequests] = useState([
    {
      request_id: 'abc',
      product_id: 1,
      name: "Gaming Laptop",
      images: [demoImage],
      quantity: 2,
      status: "Under Review",
      adminMessage: "Please upload a clearer image.",
    },
    {
      request_id: 'xyz',
      product_id: 2,
      name: "Wireless Headphones",
      images: [demoImage, demoImage],
      quantity: 1,
      status: "Reviewed",
      adminMessage: "Looks good! Will be added soon.",
    },
    {
      request_id: 'uvw',
      product_id: 3,
      name: "Smartphone",
      images: [],
      quantity: 1,
      status: "Not Reviewed Yet",
      adminMessage: "Please upload at least one image.",
    },
  ]);

  // Function to get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "Not Reviewed Yet":
        return "bg-gray-400";
      case "Under Review":
        return "bg-yellow-500";
      case "Reviewed":
        return "bg-green-500";
      case "Product Added to Platform":
        return "bg-blue-500";
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
              <th className="py-2 px-4 text-left">Request Id</th>
              <th className="py-2 px-4 text-left">Product Id</th>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4">Images</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Admin Message</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b">
                {/* Product Name */}

                <td className="py-3 px-4">{req.request_id}</td>
                <td className="py-3 px-4">{req.product_id}</td>
                <td className="py-3 px-4">{req.name}</td>

                {/* Product Images */}
                <td className="py-3 px-4">
                  {req.images.length > 0 ? (
                    req.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="product"
                        className="inline-block w-12 h-12 rounded-md mr-2"
                      />
                    ))
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </td>

                {/* Quantity */}
                <td className="py-3 px-4 text-center">{req.quantity}</td>

                {/* Status */}
                <td className="py-3 px-4 text-center">
                  <span
                    className={`text-white px-3 py-1 rounded-full ${getStatusBadge(req.status)}`}
                  >
                    {req.status}
                  </span>
                </td>

                {/* Admin Message */}
                <td className="py-3 px-4">{req.adminMessage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Requests