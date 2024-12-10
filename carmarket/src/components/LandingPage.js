import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

function LandingPage() {
  return (
    <div className="hero">
      <header className="header">
        <h1>CarMarket</h1>
        <nav>
          <Link to="/sell" className="nav-link">Sell Your Car</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/logout" className="nav-link">Logout</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
          <Link to="/messaging" className="nav-link">Messaging</Link>
        </nav>
      </header>
      <main>
        <h2>Find Your Perfectsss Car</h2>
        <p>Browse and buy cars from sellers around the world.</p>
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
