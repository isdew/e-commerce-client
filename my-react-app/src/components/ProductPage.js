import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import ProductForm from "./ProductForm";
import ProductDisplay from "./ProductDisplay";
import "./styles.css";

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error fetching products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    // Handle editing the product with the given ID
    console.log("Editing product with ID:", productId);
  };

  const handleDelete = (productId) => {
    // Handle deleting the product with the given ID
    console.log("Deleting product with ID:", productId);
  };

  return (
    <div>
      <h1>Product Management</h1>
      <ProductForm />
      <div className="products-container">
        {products.map((product) => (
          <ProductDisplay
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductPage;