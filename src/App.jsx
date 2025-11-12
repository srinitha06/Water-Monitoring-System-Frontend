import React, { useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Reports from "./Reports";
import OverallReport from "./OverallReport";
import Logout from "./Logout";
import LandingPage from "./LandingPage";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate("/"); 
  };

  const hideNavbarPaths = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div>
     
      {!shouldHideNavbar && (
        <nav className="navbar">
          <div className="nav-left">
            <h2 className="logo">Water Monitoring System</h2>
          </div>
          <div className="nav-right">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn-nav">Login</Link>
                <Link to="/signup" className="btn-nav primary-btn">Signup</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="btn-nav">Dashboard</Link>
                <Link to="/reports" className="btn-nav">Alerts</Link>
                <Link to="/overall" className="btn-nav">Overall Report</Link>
                <button className="btn-nav logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      )}

    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/reports"
          element={isAuthenticated ? <Reports /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/overall"
          element={isAuthenticated ? <OverallReport /> : <Navigate to="/login" replace />}
        />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
      </Routes>
    </div>
  );
}

export default App;
