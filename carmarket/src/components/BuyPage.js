import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../styles/buy.css";

const BuyCars = () => {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const defaultCarImage = "https://jamaicaautoauctions.com/wp-content/uploads/2019/11/default-car.jpg";

  // const cars = [
  //   {
  //     id: 1,
  //     name: "Toyota Corolla",
  //     price: "$20,000",
  //     image: "https://imageio.forbes.com/blogs-images/danroth/files/2017/12/2018-toyota-corolla-se_01-1200x798.jpg?format=jpg&height=900&width=1600&fit=bounds",
  //     description: "2018, low mileage",
  //     email: "adeeb.s120@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     name: "Honda Civic",
  //     price: "$18,000",
  //     image: "https://www.cnet.com/a/img/resize/5ad5ba0e3b30db7b737df5b99ef6096791fd133f/hub/2019/05/20/206ebe75-ceca-4a48-85f9-0ee77584d676/2019-honda-civic-touring-sedan-ogi-1.jpg?auto=webp&fit=crop&height=675&width=1200",
  //     description: "2019, excellent condition",
  //     email: "adeeb.s120@gmail.com",
  //   },
  //   {
  //     id: 3,
  //     name: "Ford Mustang",
  //     price: "$30,000",
  //     image: null,
  //     description: "2020, sporty",
  //     email: "adeeb.s120@gmail.com",
  //   },
  // ];

  useEffect(() => {
    // Fetch cars from the backend
    const fetchCars = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      try {
        const response = await fetch("http://localhost:3000/api/cars/getcars", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token here
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

  return (
    <div className="buy-cars-page">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">CarMarket</h1>
          <nav className="nav-bar">
            <Link to="/landing" className="nav-link">Home</Link>
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

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="car-grid">
      {cars.length > 0 ? (
          cars
            .filter((car) =>
              car.make.toLowerCase().includes(search.toLowerCase()) ||
              car.model.toLowerCase().includes(search.toLowerCase())
            )
            .map((car) => (
              <div key={car._id} className="car-card">
                <img src={car.image || defaultCarImage} alt={car.make} />
                <h3>{car.make} {car.model}</h3>
                <p>{car.description || "No description available"}</p>
                <h4>${car.price}</h4>
                <button className="btn-primary" onClick={() => handleBuyNow(car)}>
                  Buy Now
                </button>
              </div>
            ))
        ) : (
          <p>Loading cars...</p>
        )}
        {/* {cars
          .filter((car) => car.name.toLowerCase().includes(search.toLowerCase()))
          .map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.image || defaultCarImage} alt={car.name} />
              <h3>{car.name}</h3>
              <p>{car.description}</p>
              <h4>{car.price}</h4>
              <button className="btn-primary" onClick={() => handleBuyNow(car)}>
                Buy Now
              </button>
            </div>
          ))} */}
      </div>

      <footer className="footer">
        <p>© 2024 CarMarket. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BuyCars;
