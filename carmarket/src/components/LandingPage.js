import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

function LandingPage() {
  return (
    <div className="hero">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">CarMarket</h1>
          <nav className="nav-bar">
            <Link to="/sell" className="nav-link">Sell Your Car</Link>
            <Link to="/buy" className="nav-link">Buy Cars</Link>
            <Link to="/messaging" className="nav-link">Messaging</Link>
            <Link to="/logout" className="nav-link">Logout</Link>
            <Link to="/signup" className="nav-link highlight">Login/Sign Up</Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <h2 className="main-title">Find Your Perfect Car</h2>
        <p className="main-subtitle">Browse and buy cars from sellers around the US.</p>
        <div className="button-group">
          <Link to="/sell">
            <button className="btn-primary">Start Selling</button>
          </Link>
          <Link to="/buy">
            <button className="btn-primary">Buy Cars</button>
          </Link>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 CarMarket. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
