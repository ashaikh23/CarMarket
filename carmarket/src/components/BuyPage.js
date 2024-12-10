import React, { useState } from "react";
import "./../styles/buy.css";

const BuyCars = () => {
  const [search, setSearch] = useState("");
//   const cars = [
//     // Array of car objects
//     { id: 1, name: "Toyota Corolla", price: "$20,000", description: "2018 model, low mileage", image: "car1.jpg" },
//     { id: 2, name: "Honda Civic", price: "$18,000", description: "2019 model, excellent condition", image: "car2.jpg" },
//     // Add more car objects here...
//   ];
  const cars = [
    { id: 1, name: "Toyota Corolla", price: "$20,000", image: "https://imageio.forbes.com/blogs-images/danroth/files/2017/12/2018-toyota-corolla-se_01-1200x798.jpg?format=jpg&height=900&width=1600&fit=bounds", description: "2018, low mileage" },
    { id: 2, name: "Honda Civic", price: "$18,000", image: "https://www.cnet.com/a/img/resize/5ad5ba0e3b30db7b737df5b99ef6096791fd133f/hub/2019/05/20/206ebe75-ceca-4a48-85f9-0ee77584d676/2019-honda-civic-touring-sedan-ogi-1.jpg?auto=webp&fit=crop&height=675&width=1200", description: "2019, excellent condition" },
    { id: 3, name: "Ford Mustang", price: "$30,000", image: "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2019/08/1200/675/shel1.jpg?ve=1&tl=1", description: "2020, sporty" },
  ];
  

  return (
    <div className="buy-cars-page">
      <header className="header">
        <h1>Buy Your Perfect Car</h1>
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
            car.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.image} alt={car.name} />
              <h3>{car.name}</h3>
              <p>{car.description}</p>
              <h4>{car.price}</h4>
              <button className="btn-primary">Buy Now</button>
            </div>
          ))}
      </div>

      <footer className="footer">
        <p>© 2024 CarMarket. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BuyCars;