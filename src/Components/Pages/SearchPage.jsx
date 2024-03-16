import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products?title=${searchTerm}`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    };

    if (searchTerm.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Search Results</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "100%",
          marginBottom: "20px",
        }}
      />
      <div>
        {searchResults.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h3 style={{ marginBottom: "5px" }}>{product.title}</h3>
            </Link>
            <p style={{ fontSize: "14px", color: "#666" }}>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
