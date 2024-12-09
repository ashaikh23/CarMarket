import React, { useState, useEffect } from "react";
import "../styles/buy.css";
import { Link } from "react-router-dom";

const BuyPage = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/cars/getcars", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setCars(data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="buy-page">
      <header className="header">
        <h1>Buy Your Perfect Car</h1>
        <nav>
          <Link to="/" className="nav-link">Back to Home</Link>
        </nav>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for cars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="car-grid">
        {cars
          .filter((car) =>
            `${car.make} ${car.model}`.toLowerCase().includes(search.toLowerCase())
          )
          .map((car) => (
            <div key={car._id} className="car-card">
              <h3>{`${car.make} ${car.model}`}</h3>
              <p>Year: {car.year}</p>
              <p>Price: ${car.price}</p>
              <p>Miles: {car.miles}</p>
              <p>Condition: {car.condition}</p>
              <p>{car.description}</p>
              <p>Contact: {car.contactInfo}</p>
            </div>
          ))}
      </div>

      <footer className="footer">
        <p>&copy; 2024 CarMarket. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BuyPage;
