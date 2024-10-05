//cart.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart items from the api
    fetch("http://127.0.0.1:8000/cart")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch cart items.`);
        }
        return response.json();
      })
      .then((data) => {
        setCart(data.cart_items);
        setTotalPrice(data.total_price);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCheckout = () => {
    fetch("http://127.0.0.1:8000/cart/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Checkout failed.`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveProduct = (productId, quantity) => {
  const formData = new URLSearchParams();
  formData.append('product_id', productId);
  formData.append('quantity', quantity);

  fetch("http://127.0.0.1:8000/cart/remove/quantity", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Product removal failed.`);
      }
      fetch("http://127.0.0.1:8000/cart")
        .then((response) => response.json())
        .then((data) => {
          setCart(data.cart_items);
          setTotalPrice(data.total_price);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};


  return (
    <div>
      <h2 className="cart-heading">Shopping Cart</h2>
      {cart.length > 0 ? (
        <div>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.product_id}>
                Name: {item.name} | Quantity in Cart: {item.quantity_in_cart} |
                Total Price: ${item.item_total_price}
                <button
                  className="remove-button"
                  onClick={() =>
                    handleRemoveProduct(item.product_id, item.quantity_in_cart)
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="total-price">Total price: ${totalPrice}</p>

          <div className="button-container">
            <button onClick={handleCheckout} className="checkout-button">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <Link to="/" className="back-to-shop-button">
        Shop
      </Link>
    </div>
  );
};

export default Cart;