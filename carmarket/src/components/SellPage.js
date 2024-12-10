import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/sell.css";

function SellPage() {
  const [formData, setFormData] = useState({
    carName: "",
    price: "",
    description: "",
    contactInfo: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Car listed: ${formData.carName}`);
      } else {
        alert("Failed to list car");
      }
    } catch (error) {
      console.error("Error listing car:", error);
      alert("Failed to list car");
    }
  };

  return (
    <div className="sell-page">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">CarMarket</h1>
          <nav className="nav-bar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/buy" className="nav-link">Buy Cars</Link>
            <Link to="/sell" className="nav-link highlight">Sell Your Car</Link>
          </nav>
        </div>
      </header>
      <main>
        <h2 className="page-title">Sell Your Car</h2>
        <form className="sell-form" onSubmit={handleSubmit}>
          <label htmlFor="carName">Car Name:</label>
          <input
            type="text"
            id="carName"
            name="carName"
            value={formData.carName}
            onChange={handleChange}
            required
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="contactInfo">Contact Info (Phone/Other):</label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-primary">List Your Car</button>
        </form>
      </main>
      <footer className="footer">
        <p>© 2024 CarMarket. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default SellPage;
