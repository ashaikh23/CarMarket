// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// ----------------------------------

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./components/LandingPage";
// import SellPage from "./components/SellPage";
// import "./styles/global.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/sell" element={<SellPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// ----------------------------------

// import React from "react";
// import LandingPage from "./components/LandingPage";

// function App() {
//   return (
//     <div>
//       <LandingPage />
//     </div>
//   );
// }

// export default App;

// ----------------------------------

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LandingPage from "./components/LandingPage";
// import SellPage from "./components/SellPage";
// import BuyPage from "./components/BuyPage";
// import LoginPage from "./components/LoginPage";

// function App() {
//   return (
//     <Router basename={process.env.PUBLIC_URL}>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/sell" element={<SellPage />} />
//         <Route path="/buy" element={<BuyPage />} />
//         <Route path="/login" element={<LoginPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// ------

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SellPage from "./components/SellPage";
import BuyPage from "./components/BuyPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage"; // Import SignUpPage

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} /> {/* Add SignUpPage */}
      </Routes>
    </Router>
  );
}

export default App;
