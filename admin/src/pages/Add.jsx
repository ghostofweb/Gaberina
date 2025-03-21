import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets"; // Assuming you have asset imports
import { backendUrl } from "../App"; // Assuming you have the backend URL imported
import { toast } from "react-toastify"; // Assuming you're using react-toastify for toasts

const Add = ({ token }) => {
  const [sizes, setSizes] = useState([
    { size: "50ml", price: "" },
    { size: "100ml", price: "" },
  ]);
  const [fragranceNotes, setFragranceNotes] = useState(["", ""]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);
  const [isBestseller, setIsBestseller] = useState(false); // Add state for bestseller

  useEffect(() => {
    if (localStorage.getItem("token") === import.meta.env.GUEST_TOKEN) {
      toast.error("This functionality is not available in the demo.");
    }
  }, []);

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = value;
    setSizes(updatedSizes);
  };

  const handleFragranceChange = (index, value) => {
    const updatedNotes = [...fragranceNotes];
    updatedNotes[index] = value;
    setFragranceNotes(updatedNotes);
  };

  const handleImageChange = (index, file) => {
    if (file) {
      const updatedPreviews = [...imagePreviews];
      updatedPreviews[index] = URL.createObjectURL(file);
      setImagePreviews(updatedPreviews);
    }
  };

  const handleAddFragrance = () => {
    if (fragranceNotes.length < 5) {
      setFragranceNotes([...fragranceNotes, ""]);
    }
  };

  const handleRemoveFragrance = (index) => {
    const updatedNotes = fragranceNotes.filter((_, idx) => idx !== index);
    setFragranceNotes(updatedNotes);
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews[index] = null;
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("token") === import.meta.env.GUEST_TOKEN) {
      toast.error("This functionality is not available in the demo.");
      return; // Prevent form submission for guest users
    }

    const formData = new FormData(e.target);

    // Convert sizes array to a prices object with sizes as keys
    const price = sizes.reduce((acc, { size, price }) => {
      acc[size] = price;
      return acc;
    }, {});

    // Append the prices as a stringified object
    formData.append("sizes", JSON.stringify(sizes.map(({ size }) => size)));
    formData.append("price", JSON.stringify(price));
    formData.append("fragranceNotes", JSON.stringify(fragranceNotes));
    formData.append("bestseller", isBestseller.toString()); // Add bestseller status to formData

    // Debugging: Log FormData content
    console.log("FormData entries:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-dark rounded-lg shadow-lg"
    >
      {/* Upload Images */}
      <div className="mb-6">
        <p className="text-champagne font-bold mb-2">Upload Images</p>
        <div className="flex flex-wrap gap-4">
          {/* Image 1 */}
          <div className="relative">
            <label htmlFor="image1" className="cursor-pointer">
              <img
                src={imagePreviews[0] || assets.upload_area}
                alt="Upload Preview 1"
                className="w-20 h-20 object-cover border rounded-md"
              />
            </label>
            {imagePreviews[0] && (
              <button
                type="button"
                onClick={() => handleRemoveImage(0)}
                className="absolute top-0 right-0 bg-dark text-buttontxt rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                X
              </button>
            )}
            <input
              type="file"
              id="image1"
              name="image1"
              hidden
              accept="image/*"
              onChange={(e) => handleImageChange(0, e.target.files[0])}
            />
          </div>

          {/* Image 2 */}
          <div className="relative">
            <label htmlFor="image2" className="cursor-pointer">
              <img
                src={imagePreviews[1] || assets.upload_area}
                alt="Upload Preview 2"
                className="w-20 h-20 object-cover border rounded-md"
              />
            </label>
            {imagePreviews[1] && (
              <button
                type="button"
                onClick={() => handleRemoveImage(1)}
                className="absolute top-0 right-0 bg-dark text-buttontxt rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                X
              </button>
            )}
            <input
              type="file"
              id="image2"
              name="image2"
              hidden
              accept="image/*"
              onChange={(e) => handleImageChange(1, e.target.files[0])}
            />
          </div>

          {/* Image 3 */}
          <div className="relative">
            <label htmlFor="image3" className="cursor-pointer">
              <img
                src={imagePreviews[2] || assets.upload_area}
                alt="Upload Preview 3"
                className="w-20 h-20 object-cover border rounded-md"
              />
            </label>
            {imagePreviews[2] && (
              <button
                type="button"
                onClick={() => handleRemoveImage(2)}
                className="absolute top-0 right-0 bg-dark text-buttontxt rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                X
              </button>
            )}
            <input
              type="file"
              id="image3"
              name="image3"
              hidden
              accept="image/*"
              onChange={(e) => handleImageChange(2, e.target.files[0])}
            />
          </div>

          {/* Image 4 */}
          <div className="relative">
            <label htmlFor="image4" className="cursor-pointer">
              <img
                src={imagePreviews[3] || assets.upload_area}
                alt="Upload Preview 4"
                className="w-20 h-20 object-cover border rounded-md"
              />
            </label>
            {imagePreviews[3] && (
              <button
                type="button"
                onClick={() => handleRemoveImage(3)}
                className="absolute top-0 right-0 bg-dark text-buttontxt rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                X
              </button>
            )}
            <input
              type="file"
              id="image4"
              name="image4"
              hidden
              accept="image/*"
              onChange={(e) => handleImageChange(3, e.target.files[0])}
            />
          </div>
        </div>
      </div>

      {/* Product Name and Description */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-champagne font-bold mb-2">Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Type Here"
            required
            className="w-full bg-lighterDark px-4 py-2 rounded-lg text-buttontxt border hover:border-champagne"
          />
        </div>
        <div>
          <p className="text-champagne font-bold mb-2">Product Description</p>
          <textarea
            name="description"
            placeholder="Write content"
            required
            className="w-full bg-lighterDark px-4 py-2 rounded-lg text-buttontxt border hover:border-champagne"
          />
        </div>
      </div>

      {/* Category and Subcategory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-champagne font-bold mb-2">Product Category</p>
          <select
            name="category"
            required
            className="w-full bg-lighterDark text-buttontxt px-4 py-2 rounded-lg border hover:border-champagne"
          >
            <option value="Oil">Oil</option>
            <option value="Perfume">Perfume</option>
          </select>
        </div>
        <div>
          <p className="text-champagne font-bold mb-2">Sub Category</p>
          <select
            name="subCategory"
            required
            className="w-full bg-lighterDark text-buttontxt px-4 py-2 rounded-lg border hover:border-champagne"
          >
            <option value="Floral">Floral</option>
            <option value="Oud">Oud</option>
            <option value="Citrus">Citrus</option>
            <option value="Leather">Leather</option>
            <option value="Amber">Amber</option>
            <option value="Vanilla">Vanilla</option>
            <option value="Fruity">Fruity</option>
            <option value="Spicy">Spicy</option>
            <option value="Musk">Musk</option>
          </select>
        </div>
      </div>

      {/* Sizes and Prices */}
      <div className="mb-6">
        <p className="text-champagne font-bold mb-2">Sizes and Prices</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sizes.map((size, index) => (
            <div key={index}>
              <div className="mb-2">
                <label
                  htmlFor={`size-${index}`}
                  className="text-champagne font-bold"
                >
                  Size: {size.size}
                </label>
              </div>
              <input
                type="number"
                id={`size-${index}`}
                value={size.price}
                onChange={(e) =>
                  handleSizeChange(index, "price", e.target.value)
                }
                placeholder={`Price for ${size.size}`}
                required
                className="w-full bg-lighterDark px-4 py-2 rounded-lg text-buttontxt border hover:border-champagne"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fragrance Notes */}
      <div className="mb-6">
        <p className="text-champagne font-bold mb-2">Fragrance Notes</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fragranceNotes.map((note, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                value={note}
                onChange={(e) => handleFragranceChange(index, e.target.value)}
                placeholder="Type Fragrance Note"
                className="w-full bg-lighterDark px-4 py-2 rounded-lg text-buttontxt border hover:border-champagne"
              />
              <button
                type="button"
                onClick={() => handleRemoveFragrance(index)}
                className="absolute top-0 right-0 bg-dark text-buttontxt rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddFragrance}
          className="text-champagne mt-2"
        >
          Add another note
        </button>
      </div>

      {/* Bestseller Checkbox */}
      <div className="mb-6">
        <label className="flex items-center text-champagne">
          <input
            type="checkbox"
            checked={isBestseller}
            onChange={() => setIsBestseller(!isBestseller)}
            className="mr-2"
          />
          Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-champagne text-dark rounded-lg py-3 mt-6 hover:bg-gold transition-colors"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
