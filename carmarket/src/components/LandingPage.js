// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/landing.css";

// function LandingPage() {
//   return (
//     <div className="hero">
//       <header className="header">
//         <div className="header-content">
//           <h1 className="logo">CarMarket</h1>
//           <nav className="nav-bar">
//             <Link to="/sell" className="nav-link">Sell Your Car</Link>
//             <Link to="/buy" className="nav-link">Buy Cars</Link>
//             <Link to="/messaging" className="nav-link">Messaging</Link>
//             <Link to="/logout" className="nav-link">Logout</Link>
//             <Link to="/login" className="nav-link highlight">Login/Sign Up</Link>
//           </nav>
//         </div>
//       </header>
//       <main className="main-content">
//         <div className="content">
//           <h2 className="main-title">Find Your Perfect Car</h2>
//           <p className="main-subtitle">Browse and buy cars from sellers around the US.</p>
//           <div className="button-group">
//             <Link to="/sell">
//               <button className="btn-primary">Start Selling</button>
//             </Link>
//             <Link to="/buy">
//               <button className="btn-primary">Buy Cars</button>
//             </Link>
//           </div>
//         </div>
//       </main>
//       <footer className="bottom-footer">
//         <p>&copy; 2024 CarMarket. Made with ❤️ in Amherst, MA. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">CarMarket</h1>
          <nav className="nav-bar">
            <Link to="/sell" className="nav-link">Sell Your Car</Link>
            <Link to="/buy" className="nav-link">Buy Cars</Link>
            <Link to="/messaging" className="nav-link">Messaging</Link>
            <Link to="/logout" className="nav-link">Logout</Link>
            <Link to="/login" className="nav-link highlight">Login/Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="main-title">Find Your Perfect Car</h2>
          <p className="main-subtitle">
            Browse and buy cars from trusted sellers across the US.
          </p>
          <div className="button-group">
            <Link to="/sell">
              <button className="btn-primary">Start Selling</button>
            </Link>
            <Link to="/buy">
              <button className="btn-primary">Buy Cars</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sell Section */}
      <section className="info-section sell-section">
        <h3>Sell Your Car, Hassle-Free</h3>
        <p>
          Connect with thousands of potential buyers in just a few clicks. 
          CarMarket makes it easy and secure to sell your car online.
        </p>
        <Link to="/sell">
          <button className="btn-secondary">Sell Your Car</button>
        </Link>
      </section>

      {/* Buy Section */}
      <section className="info-section buy-section">
        <h3>Find Your Next Adventure</h3>
        <p>
          Explore a wide range of vehicles that suit your lifestyle. 
          From family cars to sports cars, we’ve got you covered.
        </p>
        <Link to="/buy">
          <button className="btn-secondary">Browse Cars</button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bottom-footer">
        <p>&copy; 2024 CarMarket. Made with ❤️ in Amherst, MA. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
