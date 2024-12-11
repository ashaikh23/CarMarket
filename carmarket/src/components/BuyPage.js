import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import "./../styles/buy.css";

const BuyCars = () => {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const defaultCarImage = "https://jamaicaautoauctions.com/wp-content/uploads/2019/11/default-car.jpg";

    const handleBuyNow = async (car) => {
    try {
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: car.email, carName: car.name }),
      });
      const result = await response.text();
      console.log(result);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch("http://localhost:3000/api/cars/getcars", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setErrorMessage("Failed to load cars. Please try again later.");
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.make.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase());
    const matchesPrice =
      (!minPrice || car.price >= parseFloat(minPrice)) &&
      (!maxPrice || car.price <= parseFloat(maxPrice));
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="buy-cars-page">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">CarMarket</h1>
          <nav className="nav-bar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/sell" className="nav-link">Sell Your Car</Link>
            <Link to="/buy" className="nav-link highlight">Buy Cars</Link>
          </nav>
        </div>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for cars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="price-filter">
        <TextField
          label="Min Price"
          variant="outlined"
          size="small"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          sx={{ width: 120 }}
        />
        <TextField
          label="Max Price"
          variant="outlined"
          size="small"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          sx={{ width: 120 }}
        />
      </div>

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="car-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car._id} className="car-card">
              <img src={car.image || defaultCarImage} alt={car.make} className="car-image" />
              <div className="car-details">
                <h3>{car.make} {car.model}</h3>
                <p>{car.description || "No description available"}</p>
                <h4>${car.price}</h4>
                <button className="btn-primary" onClick={() => handleBuyNow(car)}>
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No cars match your filters.</p>
        )}
      </div>

      <footer className="footer">
        <p>© 2024 CarMarket. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BuyCars;
