import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false); // Store login status
  const [userRole, setUserRole] = useState(null); // Store user role
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in and get the user role from localStorage
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (token && role) {
      setIsLogged(true);
      setUserRole(role);
    } else {
      setIsLogged(false);
      setUserRole(null);
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  const handleLogout = () => {
    // Clear user authentication details from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLogged(false);
    setUserRole(null);
    navigate("/login"); // Redirect to the login page
  };

  const handleLogin = () => {
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🗳️ Everyone Votes</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>

        {/* Show Dashboard links only if the user is logged in */}
        {userRole === "voter" && <li><Link to="/voter-dashboard">Voter Dashboard</Link></li>}
        {userRole === "officer" && <li><Link to="/officer-dashboard">Officer Dashboard</Link></li>}
      </ul>

      {/* Show Login if not logged in, otherwise show Logout */}
      {isLogged ? (
        <button onClick={handleLogout} className="login-btn">Logout</button>
      ) : (
        <button onClick={handleLogin} className="login-btn">Login</button>
      )}
    </nav>
  );
};

export default Navbar;
