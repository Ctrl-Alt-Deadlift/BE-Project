import React, { use, useState } from "react";
import Navbar from "../components/Navbar.jsx";

const AddProduct = () => {
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
  const [terms, setTerms] = useState('');
  const [returnPolicy, setReturnPolicy] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);


  const handleImageChange = (e, index) => {
    const files = [...images];
    files[index] = e.target.files[0];
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!availableForRent && !availableForSale) {
      alert("Please select at least one option: Rent or Sale.");
      return;
    }

    if (availableForRent && (!rentPerDay || !deposit || !rentalEndDate)) {
      alert("Please fill all rental-related fields.");
      return;
    }

    if (availableForSale && !salePrice) {
      alert("Please enter the sale price.");
      return;
    }

    if (!termsAccepted) {
      alert("You must accept the terms and return policy.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("availableForRent", availableForRent);
    formData.append("availableForSale", availableForSale);
    formData.append("Terms and Conditions", terms);
    formData.append("Return Policy", returnPolicy);

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

    console.log("Form submitted with:", Object.fromEntries(formData));
    alert("Product submitted successfully!");

    // ✅ Clear form fields after submission
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

  };



  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-[50px] p-6  bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add a Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Image Upload */}
          <div>
            <p className="mb-2">Upload Images (Max 4)</p>
            <div className="flex gap-3">
              {images.map((img, index) => (
                <label key={index} className="cursor-pointer">
                  <input type="file" onChange={(e) => handleImageChange(e, index)} hidden />
                  <div className="w-24 h-24 border border-gray-300 flex items-center justify-center">
                    {img ? <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover" /> : "+"}
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
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Available for Rent/Sale */}
          <div className="flex gap-4">
            <label>
              <input type="checkbox" checked={availableForRent} onChange={() => setAvailableForRent(!availableForRent)} />
              <span className="ml-2">Available for Rent</span>
            </label>
            <label>
              <input type="checkbox" checked={availableForSale} onChange={() => setAvailableForSale(!availableForSale)} />
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
                  onChange={(e) => setRentPerDay(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Deposit (₹)</label>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
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
                onChange={(e) => setSalePrice(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          <div>
            <label className="block mb-1">Terms and Conditions on your side</label>
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
              <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} required />
              <span className="ml-2">I agree to the Terms & Conditions</span>
            </label>
          </div>



          {/* Submit Button */}
          <button type="submit" className="w-full p-3 bg-black text-white hover:bg-gray-800">
            Submit Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;
