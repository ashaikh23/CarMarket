import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/sell.css";

function SellPage() {
  const [formData, setFormData] = useState({
    carName: "",
    year: "",
    price: "",
    miles: "",
    condition: "",
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
      const [make, model] = formData.carName.split(" ");
      const response = await fetch("http://localhost:5001/api/cars/postlisting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          make,
          model,
          year: formData.year,
          price: formData.price,
          miles: formData.miles,
          condition: formData.condition,
          description: formData.description,
          contactInfo: formData.contactInfo,
        }),
      });

      if (response.ok) {
        alert("Car listed successfully!");
        setFormData({
          carName: "",
          year: "",
          price: "",
          miles: "",
          condition: "",
          description: "",
          contactInfo: "",
        });
      } else {
        alert("Failed to list car. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
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
          <label htmlFor="carName">Car Name (Make and Model):</label>
          <input
            type="text"
            id="carName"
            name="carName"
            value={formData.carName}
            onChange={handleChange}
            required
          />

          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
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

          <label htmlFor="miles">Miles:</label>
          <input
            type="number"
            id="miles"
            name="miles"
            value={formData.miles}
            onChange={handleChange}
            required
          />

          <label htmlFor="condition">Condition:</label>
          <input
            type="text"
            id="condition"
            name="condition"
            value={formData.condition}
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
