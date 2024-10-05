//cartUtils.js//
export async function fetchCartData() {
    try {
      const response = await fetch("http://127.0.0.1:8000/cart");
      if (!response.ok) {
        throw new Error("Failed to fetch cart items.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  export async function checkoutCart() {
    try {
      const response = await fetch("http://127.0.0.1:8000/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Checkout failed.");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  export async function removeFromCart(productId, quantity) {
    const formData = new URLSearchParams();
    formData.append("product_id", productId);
    formData.append("quantity", quantity);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/cart/remove/quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Product removal failed.");
      }
  
      const updatedCart = await fetchCartData(); // Fetch updated cart data
      return updatedCart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  export async function addToCart(product) {
    try {
      const response = await fetch("http://127.0.0.1:8000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product to the cart.");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }