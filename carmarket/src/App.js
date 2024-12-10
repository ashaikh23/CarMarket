import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SellPage from "./components/SellPage";
import BuyPage from "./components/BuyPage";
import LoginPage from "./components/LoginPage";
import LogOutPage from "./components/LogOutPage";
import SignUpPage from "./components/SignUpPage";
import MessagingPage from "./components/MessagingPage";


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* Redirect the root path to the login page */}
        {/* Explanation: The root URL ("/") will always redirect users to "/login". 
        This ensures that login is the first interaction for all users. */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOutPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/messaging" element={<MessagingPage />} />
      </Routes>
    </Router>
  );
}

export default App;