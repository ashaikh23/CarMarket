import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/sell.css";

function SellPage() {
  const [formData, setFormData] = useState({
    carName: "",
    price: "",
    description: "",
    contactInfo: "",
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
        alert("car listed");
      }
    } catch (error) {
      console.error("Error listing car:", error);
      alert("Failed to list car");
    }
    alert(`Car listed: ${formData.carName}`);
    // Here, you'd typically send the data to the backend
  };

  return (
    <div className="sell-page">
      <header className="header">
        <h1>Sell Your Car</h1>
        <nav>
          <Link to="/" className="nav-link">Back to Home</Link>
        </nav>
      </header>
      <main>
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

          <label htmlFor="contactInfo">Contact Info:</label>
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
        <p>&copy; 2024 CarMarket. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default SellPage;

