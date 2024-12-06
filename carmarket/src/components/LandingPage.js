// import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// // import "./styles/landing.css";
// import '../styles/landing.css';


// function LandingPage() {
//   const handleBrowse = () => {
//     alert("Browse functionality coming soon!");
//   };

//   return (
//     <>
//       <Header />
//       <section className="hero">
//         <h2>Find Your Dream Car or Sell Yours</h2>
//         <button onClick={() => (window.location.href = "/sell")}>
//           Sell Your Car
//         </button>
//         <button onClick={handleBrowse}>Browse Cars</button>
//       </section>
//       <Footer />
//     </>
//   );
// }

// export default LandingPage;
// --------

// import React from "react";
// import { Link } from "react-router-dom";

// function LandingPage() {
//   return (
//     <div className="hero">
//       <h2>Welcome to CarMarket</h2>
//       <Link to="/sell">
//         <button>Sell Your Car</button>
//       </Link>
//     </div>
//   );
// }

// export default LandingPage;

//----------

// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/landing.css";

// function LandingPage() {
//   return (
//     <div className="hero">
//       <header className="header">
//         <h1>CarMarket</h1>
//         <nav>
//           <Link to="/sell" className="nav-link">Sell Your Car</Link>
//         </nav>
//       </header>
//       <main>
//         <h2>Find Your Perfect Car</h2>
//         <p>Browse and buy cars from sellers around the world.</p>
//         <Link to="/sell">
//           <button className="btn-primary">Start Selling</button>
//         </Link>
//       </main>
//       <footer className="footer">
//         <p>&copy; 2024 CarMarket. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;

// ------

import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

function LandingPage() {
  const handleBuyClick = () => {
    alert("Coming Soon!");
  };

  return (
    <div className="hero">
      <header className="header">
        <h1>CarMarket</h1>
        <nav>
          <Link to="/sell" className="nav-link">Sell Your Car</Link>
        </nav>
      </header>
      <main>
        <h2>Find Your Perfect Car</h2>
        <p>Browse and buy cars from sellers around the world.</p>
        <div className="button-group">
          <Link to="/sell">
            <button className="btn-primary">Start Selling</button>
          </Link>
          <Link to="/buy">
            <button className="btn-primary">Buy Cars</button>
          </Link>
          {/* <button className="btn-secondary" onClick={handleBuyClick}>
            Buy Cars
          </button> */}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 CarMarket. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
