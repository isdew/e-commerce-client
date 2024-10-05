// EditProductForm.js
import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

function EditProductForm({ product, onSave }) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${editedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });

      if (response.ok) {
        const data = await response.json();
        onSave(data);
      } else {
        console.error("Error updating product:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Product</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={editedProduct.price} onChange={handleChange} />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={editedProduct.quantity} onChange={handleChange} />
        </label>
        <label>
          Type:
          <input type="text" name="type" value={editedProduct.type} onChange={handleChange} />
        </label>
        <button type="button" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
}

export default EditProductForm;