// import React, { useState, useContext, useEffect } from "react";
// import Navbar from "../components/Navbar.jsx";
// import { sellerContext } from "../Context/sellerContext.jsx"; // Assuming the path to your context file
// import { toast } from "react-toastify";
// import axios from "axios";


// const AddProduct = () => {
//   const { backendUrl, token, supplier } = useContext(sellerContext);
//   const [images, setImages] = useState([null, null, null, null]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [availableForRent, setAvailableForRent] = useState(false);
//   const [availableForSale, setAvailableForSale] = useState(false);
//   const [rentPerDay, setRentPerDay] = useState("");
//   const [deposit, setDeposit] = useState("");
//   const [salePrice, setSalePrice] = useState("");
//   const [rentalEndDate, setRentalEndDate] = useState("");
//   const [terms, setTerms] = useState("");
//   const [returnPolicy, setReturnPolicy] = useState("");
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [category, setCategory] = useState(""); // New state for category
//   const [subCategory, setSubCategory] = useState(""); // New state for subCategory
//   const [isSubmitting, setIsSubmitting] = useState(false); // New loading state
//   const isVerified = supplier?.isVerifiedSupplier || false; // Check if supplier is verified

//   const handleImageChange = (e, index) => {
//     const files = [...images];
//     files[index] = e.target.files[0];
//     setImages(files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSubmitting) return; // Prevent multiple submissions
//     setIsSubmitting(true);

//     if (!availableForRent && !availableForSale) {
//       toast.error("Please select at least one option: Rent or Sale.");
//       return;
//     }

//     if (availableForRent && (!rentPerDay || !deposit || !rentalEndDate)) {
//       toast.error("Please fill all rental-related fields.");
//       return;
//     }

//     if (availableForSale && !salePrice) {
//       toast.error("Please enter the sale price.");
//       return;
//     }

//     if (!termsAccepted) {
//       toast.error("You must accept the terms and return policy.");
//       return;
//     }

//     if (!category || !subCategory) {
//       toast.error("Please select category and subcategory."); // Validate category and subCategory
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("quantity", quantity.toString()); // quantity should be string
//     formData.append("availableForRent", availableForRent.toString());
//     formData.append("availableForSale", availableForSale.toString());
//     formData.append("terms", terms);
//     formData.append("returnPolicy", returnPolicy);
//     formData.append("category", category); // Append category
//     formData.append("subCategory", subCategory); // Append subCategory

//     if (availableForRent) {
//       formData.append("rentPerDay", rentPerDay.toString());
//       formData.append("deposit", deposit.toString());
//       formData.append("rentalEndDate", rentalEndDate);
//     }

//     if (availableForSale) {
//       formData.append("salePrice", salePrice.toString());
//     }

//     images.forEach((img, index) => {
//       if (img) formData.append(`image${index + 1}`, img); // Append with correct keys
//     });

//     try {
//       const response = await axios.post(`${backendUrl}/api/supplier/add`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include token in header
//           "Content-Type": "multipart/form-data", // Important for sending files
//         },
//       });

//       console.log("Product added successfully!", response.data);
//       toast.success("Product added successfully!");

//       // ✅ Clear form fields after successful submission
//       setImages([null, null, null, null]);
//       setName("");
//       setDescription("");
//       setQuantity(1);
//       setAvailableForRent(false);
//       setAvailableForSale(false);
//       setRentPerDay("");
//       setDeposit("");
//       setSalePrice("");
//       setRentalEndDate("");
//       setTerms("");
//       setReturnPolicy("");
//       setTermsAccepted(false);
//       setCategory("");
//       setSubCategory("");

//     } catch (error) {
//       console.error("Error adding product:", error);
//       toast.error(error.response?.data?.message || "Failed to add product.");
//     }
//     finally {
//       setIsSubmitting(false); // Re-enable the button
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />

//       <div className="max-w-2xl mx-auto sm:pt-[100px] p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Add a Product</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Image Upload */}
//           <div>
//             <p className="mb-2">Upload Images (Max 4)</p>
//             <div className="flex gap-3">
//               {images.map((img, index) => (
//                 <label key={index} className="cursor-pointer">
//                   <input
//                     type="file"
//                     onChange={(e) => handleImageChange(e, index)}
//                     hidden
//                   />
//                   <div className="w-24 h-24 border border-gray-300 flex items-center justify-center">
//                     {img ? (
//                       <img
//                         src={URL.createObjectURL(img)}
//                         alt="preview"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       "+"
//                     )}
//                   </div>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Product Name */}
//           <div>
//             <label className="block mb-1">Product Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Product Description */}
//           <div>
//             <label className="block mb-1">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block mb-1">Category</label>
//             <input
//               type="text"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Subcategory */}
//           <div>
//             <label className="block mb-1">Subcategory</label>
//             <input
//               type="text"
//               value={subCategory}
//               onChange={(e) => setSubCategory(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Quantity */}
//           <div>
//             <label className="block mb-1">Quantity</label>
//             <input
//               type="number"
//               min="1"
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Available for Rent/Sale */}
//           <div className="flex gap-4">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={availableForRent}
//                 onChange={() => setAvailableForRent(!availableForRent)}
//               />
//               <span className="ml-2">Available for Rent</span>
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={availableForSale}
//                 onChange={() => setAvailableForSale(!availableForSale)}
//               />
//               <span className="ml-2">Available for Sale</span>
//             </label>
//           </div>

//           {/* Rent Fields */}
//           {availableForRent && (
//             <>
//               <div>
//                 <label className="block mb-1">Rent per Day (₹)</label>
//                 <input
//                   type="number"
//                   value={rentPerDay}
//                   onChange={(e) => setRentPerDay(Number(e.target.value))}
//                   required
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Deposit (₹)</label>
//                 <input
//                   type="number"
//                   value={deposit}
//                   onChange={(e) => setDeposit(Number(e.target.value))}
//                   required
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Rental End Date</label>
//                 <input
//                   type="date"
//                   value={rentalEndDate}
//                   onChange={(e) => setRentalEndDate(e.target.value)}
//                   required
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             </>
//           )}

//           {/* Sale Fields */}
//           {availableForSale && (
//             <div>
//               <label className="block mb-1">Sale Price (₹)</label>
//               <input
//                 type="number"
//                 value={salePrice}
//                 onChange={(e) => setSalePrice(Number(e.target.value))}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block mb-1">
//               Terms and Conditions on your side
//             </label>
//             <input
//               type="text"
//               value={terms}
//               onChange={(e) => setTerms(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Mention Return Policy</label>
//             <input
//               type="text"
//               value={returnPolicy}
//               onChange={(e) => setReturnPolicy(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Terms & Conditions */}
//           <div>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={termsAccepted}
//                 onChange={() => setTermsAccepted(!termsAccepted)}
//                 required
//               />
//               <span className="ml-2">I agree to the Terms & Conditions</span>
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition" disabled={isSubmitting}>
//             {isSubmitting ? "Adding Product..." : "Add Product"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;


import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar.jsx";
import { sellerContext } from "../Context/sellerContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const AddProduct = () => {
  const { backendUrl, token, supplier } = useContext(sellerContext);
  const isVerified = supplier?.isVerifiedSupplier;
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [availableForRent, setAvailableForRent] = useState(false);
  const [availableForSale, setAvailableForSale] = useState(false);
  const [rentPerDay, setRentPerDay] = useState("");
  const [deposit, setDeposit] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");
  const [terms, setTerms] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e, index) => {
    const files = [...images];
    files[index] = e.target.files[0];
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || !isVerified) return;

    setIsSubmitting(true);

    if (!availableForRent && !availableForSale) {
      toast.error("Please select at least one option: Rent or Sale.");
      return;
    }
    if (availableForRent && (!rentPerDay || !deposit || !rentalEndDate)) {
      toast.error("Please fill all rental-related fields.");
      return;
    }
    if (availableForSale && !salePrice) {
      toast.error("Please enter the sale price.");
      return;
    }
    if (!termsAccepted) {
      toast.error("You must accept the terms and return policy.");
      return;
    }
    if (!category || !subCategory) {
      toast.error("Please select category and subcategory.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("quantity", quantity.toString());
    formData.append("availableForRent", availableForRent.toString());
    formData.append("availableForSale", availableForSale.toString());
    formData.append("terms", terms);
    formData.append("returnPolicy", returnPolicy);
    formData.append("category", category);
    formData.append("subCategory", subCategory);

    if (availableForRent) {
      formData.append("rentPerDay", rentPerDay.toString());
      formData.append("deposit", deposit.toString());
      formData.append("rentalEndDate", rentalEndDate);
    }

    if (availableForSale) {
      formData.append("salePrice", salePrice.toString());
    }

    images.forEach((img, index) => {
      if (img) formData.append(`image${index + 1}`, img);
    });

    try {
      const response = await axios.post(`${backendUrl}/api/supplier/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!");
      setImages([null, null, null, null]);
      setName("");
      setDescription("");
      setQuantity(1);
      setAvailableForRent(false);
      setAvailableForSale(false);
      setRentPerDay("");
      setDeposit("");
      setSalePrice("");
      setRentalEndDate("");
      setTerms("");
      setReturnPolicy("");
      setTermsAccepted(false);
      setCategory("");
      setSubCategory("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto sm:pt-[100px] p-6 bg-white rounded-lg shadow-lg relative">
        {!isVerified && (
          <div className="absolute inset-0 bg-white/40 z-10 flex flex-col items-center justify-center text-center p-4 rounded-lg">
            <p className="text-red-600 font-semibold text-lg">Your account is not yet verified.</p>
            <p className="text-gray-700">You cannot add products until your verification is complete.</p>
          </div>
        )}

        <h2 className={`${isVerified ? 'text-xl font-semibold mb-4' : 'text-xl text-gray-200 mb-4'}`}>Add a Product</h2>

        <form onSubmit={handleSubmit} className={`space-y-4 ${!isVerified ? 'pointer-events-none blur-sm select-none' : ''}`}>
          {/* Image Upload */}
          <div>
            <p className="mb-2">Upload Images (Max 4)</p>
            <div className="flex gap-3">
              {images.map((img, index) => (
                <label key={index} className="cursor-pointer">
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, index)}
                    hidden
                  />
                  <div className="w-24 h-24 border border-gray-300 flex items-center justify-center">
                    {img ? (
                      <img
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "+"
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Subcategory */}
          <div>
            <label className="block mb-1">Subcategory</label>
            <input
              type="text"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Available for Rent/Sale */}
          <div className="flex gap-4">
            <label>
              <input
                type="checkbox"
                checked={availableForRent}
                onChange={() => setAvailableForRent(!availableForRent)}
              />
              <span className="ml-2">Available for Rent</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={availableForSale}
                onChange={() => setAvailableForSale(!availableForSale)}
              />
              <span className="ml-2">Available for Sale</span>
            </label>
          </div>

          {/* Rent Fields */}
          {availableForRent && (
            <>
              <div>
                <label className="block mb-1">Rent per Day (₹)</label>
                <input
                  type="number"
                  value={rentPerDay}
                  onChange={(e) => setRentPerDay(Number(e.target.value))}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Deposit (₹)</label>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Rental End Date</label>
                <input
                  type="date"
                  value={rentalEndDate}
                  onChange={(e) => setRentalEndDate(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
            </>
          )}

          {/* Sale Fields */}
          {availableForSale && (
            <div>
              <label className="block mb-1">Sale Price (₹)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          <div>
            <label className="block mb-1">
              Terms and Conditions on your side
            </label>
            <input
              type="text"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Mention Return Policy</label>
            <input
              type="text"
              value={returnPolicy}
              onChange={(e) => setReturnPolicy(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Terms & Conditions */}
          <div>
            <label>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                required
              />
              <span className="ml-2">I agree to the Terms & Conditions</span>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition" disabled={isSubmitting}>
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div >
  );
};

export default AddProduct;
