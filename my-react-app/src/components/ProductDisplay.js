//EditProductForm
import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import "./styles.css";
import EditProductForm from "./EditProductForm"; // Import the new component

function ProductDisplay({ product, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (editedProduct) => {
    // Send the edited product data back to the parent component
    setIsEditing(false);
  };

  return (
    <div className="product-container">
      <h3>{product.name}</h3>
      <div className="product-details">
        <p>Price: ${product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Type: {product.type}</p>
        <div>
            <p>Image:</p>
            <img
              src={product.image_base64}
              alt="Product Image"
              className="product-image"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </div>
      </div>
      {isEditing ? (
        <EditProductForm product={product} onSave={handleSaveEdit} />
      ) : (
        <div>
          <button className="edit-button" onClick={handleEdit}>Edit</button>
          <button className="delete-button" onClick={() => onDelete(product.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default ProductDisplay;