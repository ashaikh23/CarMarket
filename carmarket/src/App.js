import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SellPage from "./components/SellPage";
import BuyPage from "./components/BuyPage";
import LoginPage from "./components/LoginPage";
import LogOutPage from "./components/LogOutPage";
import SignUpPage from "./components/SignUpPage"; // Import SignUpPage
import MessagingPage from "./components/MessagingPage";
import CarForm from "./components/BuyForm_.js";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sell" element={<CarForm />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOutPage />} />
        <Route path="/signup" element={<SignUpPage />} /> {/* Add SignUpPage */}
        <Route path="/messaging" element={<MessagingPage />} /> {/* Add SignUpPage */}
      </Routes>
    </Router>
  );
}

export default App;