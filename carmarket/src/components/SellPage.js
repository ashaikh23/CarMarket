// import React, { useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// // import "./styles/sell.css";
// import '../styles/sell.css';


// function SellPage() {
//   const [formData, setFormData] = useState({
//     make: "",
//     model: "",
//     year: "",
//     price: "",
//     description: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Your listing has been submitted!");
//     console.log(formData);
//   };

//   return (
//     <>
//       <Header />
//       <form className="sell-form" onSubmit={handleSubmit}>
//         <h2>Car Details</h2>
//         <label htmlFor="make">Car Make</label>
//         <input
//           type="text"
//           id="make"
//           name="make"
//           placeholder="e.g., Toyota"
//           value={formData.make}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="model">Car Model</label>
//         <input
//           type="text"
//           id="model"
//           name="model"
//           placeholder="e.g., Corolla"
//           value={formData.model}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="year">Year</label>
//         <input
//           type="number"
//           id="year"
//           name="year"
//           placeholder="e.g., 2020"
//           value={formData.year}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="price">Price</label>
//         <input
//           type="number"
//           id="price"
//           name="price"
//           placeholder="e.g., 15000"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           name="description"
//           rows="4"
//           placeholder="Brief description of the car"
//           value={formData.description}
//           onChange={handleChange}
//         ></textarea>

//         <label htmlFor="image">Car Image</label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={handleFileChange}
//         />

//         <button type="submit">Submit Listing</button>
//       </form>
//       <Footer />
//     </>
//   );
// }

// export default SellPage;
// --------

// import React from "react";
// import { Link } from "react-router-dom";

// function SellPage() {
//   return (
//     <div className="sell-form">
//       <h2>Sell Your Car</h2>
//       <Link to="/">
//         <button>Back to Home</button>
//       </Link>
//     </div>
//   );
// }

// export default SellPage;

// ---

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

  const handleSubmit = (e) => {
    e.preventDefault();
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

