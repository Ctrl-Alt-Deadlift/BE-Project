import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";;
import { sellerContext } from "../Context/sellerContext.jsx";


const EditProduct = ({ existingProduct }) => {
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
  const { token, backendUrl, navigate } = useContext(sellerContext);

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name || "");
      setDescription(existingProduct.description || "");
      setQuantity(existingProduct.quantity || 1);
      setAvailableForRent(existingProduct.availableForRent || false);
      setAvailableForSale(existingProduct.availableForSale || false);
      setRentPerDay(existingProduct.rentDetails?.rentPerDay || "");
      setDeposit(existingProduct.rentDetails?.deposit || "");
      setSalePrice(existingProduct.salePrice || "");
      setRentalEndDate(existingProduct.rentalEndDate || "");
      setTerms(existingProduct.terms || "");
      setReturnPolicy(existingProduct.returnPolicy || "");
      setCategory(existingProduct.category || "");
      setSubCategory(existingProduct.subCategory || "");
    }
  }, [existingProduct]);

  const handleImageChange = (e, index) => {
    const files = [...images];
    files[index] = e.target.files[0];
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
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
      toast.error("Please select both category and subcategory.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("availableForRent", availableForRent);
    formData.append("availableForSale", availableForSale);
    formData.append("terms", terms);
    formData.append("returnPolicy", returnPolicy);
    formData.append("category", category);
    formData.append("subCategory", subCategory);

    if (availableForRent) {
      formData.append("rentPerDay", rentPerDay);
      formData.append("deposit", deposit);
      formData.append("rentalEndDate", rentalEndDate);
    }

    if (availableForSale) {
      formData.append("salePrice", salePrice);
    }

    images.forEach((img, index) => {
      if (img) formData.append(`image${index + 1}`, img);
    });

    try {
      const Token = token;
      if (!Token) {
        toast.error("Unauthorized. Please login again.");
        return;
      }

      const response = await fetch(`${backendUrl}/api/supplier/edit/${existingProduct.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product.");
      }

      const data = await response.json();
      console.log("Update success:", data);

      toast.success("Product updated successfully!");

      // Optional: redirect to another page or reset form
      // navigate('/dashboard') or window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred while updating the product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-[50px] p-6 bg-white rounded-lg shadow-lg">
       <button
        onClick={() => navigate('/home')}
        className="bg-blue-500 text-white mx-2 px-4 py-2 rounded-md hover:bg-blue-600 mb-6"
      >
        &lt; Back to Home
      </button>
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Image Upload */}
          <div>
            <p className="mb-2">Upload Images (Max 4)</p>
            <div className="flex gap-3">
              {images.map((img, index) => (
                <label key={index} className="cursor-pointer">
                  <input type="file" onChange={(e) => handleImageChange(e, index)} hidden />
                  <div className="w-24 h-24 border border-gray-300 flex items-center justify-center">
                    {img ? (
                      <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover" />
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

          {/* Quantity */}
          <div>
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Rent and Sale Options */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={availableForRent}
                onChange={(e) => setAvailableForRent(e.target.checked)}
              />
              Available for Rent
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={availableForSale}
                onChange={(e) => setAvailableForSale(e.target.checked)}
              />
              Available for Sale
            </label>
          </div>

          {/* Rent Fields */}
          {availableForRent && (
            <div className="space-y-2">
              <div>
                <label className="block mb-1">Rent per Day</label>
                <input
                  type="number"
                  value={rentPerDay}
                  onChange={(e) => setRentPerDay(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Deposit</label>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Rental End Date</label>
                <input
                  type="date"
                  value={rentalEndDate}
                  onChange={(e) => setRentalEndDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          )}

          {/* Sale Price */}
          {availableForSale && (
            <div>
              <label className="block mb-1">Sale Price</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          {/* Terms and Return Policy */}
          <div>
            <label className="block mb-1">Terms and Conditions</label>
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Return Policy</label>
            <textarea
              value={returnPolicy}
              onChange={(e) => setReturnPolicy(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Terms Acceptance */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span>I accept the Terms and Return Policy</span>
          </div>

          {/* Category and Subcategory */}
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
