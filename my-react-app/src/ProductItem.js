import React, { useState } from "react";

function ProductItem({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Send a POST request to the backend to add the product to the cart
    fetch("http://localhost:8000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product.id, // Replace with the actual product ID
        quantity: quantity,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Product added to cart successfully
          // You can update your UI or show a success message
          console.log("Product added to cart successfully");
        } else {
          // Handle other status codes or errors as needed
          console.error("Failed to add the product to the cart");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;
