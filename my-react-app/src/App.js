import React, { useState, useEffect } from "react";
import { fetchUserData } from "./api";
import ProductPage from "./components/ProductPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as cartUtils from "./pages/cartUtils";
import Shop from "./pages/Shop";
import Cart from "./pages/cart";

function App() {
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        // Handle the error
      });
  }, []);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Shop
              users={users}
              addToCart={cartUtils.addToCart}
              cart={cart}
              calculateTotalPrice={calculateTotalPrice}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={cartUtils.removeFromCart}
              calculateTotalPrice={calculateTotalPrice}
              checkoutCart={cartUtils.checkoutCart}
            />
          }
        />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;