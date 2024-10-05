import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1); // New state for selected quantity

  const fetchAndSortProducts = (order) => {
    const url = `http://127.0.0.1:8000/sort/byPrice${
      order === "ascending" ? "ToHigh" : "ToLow"
    }`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch sorted products (${order}).`);
        }
        return response.json();
      })
      .then((data) => {
        setSortedProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = () => {
    const searchUrl = `http://127.0.0.1:8000/search/product?product_name_or_type=${searchQuery}`;
    fetch(searchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch search results.");
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddToCart = (product) => {
    fetch("http://127.0.0.1:8000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `product_id=${product.id}&quantity=${selectedQuantity}`, // Use the selected quantity
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add the product to the cart.");
        }
        alert("Product added to the cart");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAndSortProducts(sortOrder);
  }, [sortOrder]);

  
  return (
    <div>
      <h1>JOKE SHOP</h1>
      <button className="sort-button" onClick={() => setSortOrder("ascending")}>
        Sort by Price Ascending
      </button>
      <button
        className="sort-button"
        onClick={() => setSortOrder("descending")}
      >
        Sort by Price Descending
      </button>

      <input
        type="text"
        placeholder="Type the product name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        enter
      </button>

      <div className="product-list">
        {searchResults.length > 0
          ? searchResults.map((product) => (
              <div key={product.id} className="product-item">
                {/* Display product information */}
                <h3>{product.name}</h3>
                <img
                  src={product.image_base64}
                  alt="Product Image"
                  className="product-image"
                />
                <p>Type: {product.type}</p>
                <p>Number of products left: {product.quantity}</p>
                <p>Price: ${product.price}</p>
                <label htmlFor="quantity">Select Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.quantity}
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                />
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          : sortedProducts.map((product) => (
              <div key={product.id} className="product-item">
                {/* Display product information */}
                <h3>{product.name}</h3>
                <img
                  src={product.image_base64}
                  alt="Product Image"
                  className="product-image"
                />
                <p>Type: {product.type}</p>
                <p>Number of products left: {product.quantity}</p>
                <p>Price: ${product.price}</p>
                <label htmlFor="quantity">Select Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.quantity}
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                />
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
      </div>
      <div className="view-cart-button">
        <Link to="/cart">View Cart</Link>
      </div>
    </div>
  );
};

export default Shop;