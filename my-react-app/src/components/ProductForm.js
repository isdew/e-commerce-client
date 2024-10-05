import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import "./styles.css";

function ProductForm() {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    quantity: 0,
    type: "",
    image_base64: "", // Initialize to an empty string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Store the base64 data in your component's state
      setProductData({ ...productData, image_base64: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(productData).toString(),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product created:", data);
      } else {
        console.error("Error creating product:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }

  return (
    <div className="form-container">
      <h2>Create a New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={productData.name} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={productData.price} onChange={handleChange} />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={productData.quantity} onChange={handleChange} />
        </label>
        <label>
          Type:
          <input type="text" name="type" value={productData.type} onChange={handleChange} />
        </label>
        <label>
          Image:
          <input type="file" name="imageFile" accept="image/*" onChange={handleImageUpload} />
        </label>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default ProductForm;