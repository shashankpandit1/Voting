import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';  // Ensure correct import
import HomePage from './pages/Homepage';
import VoterDashboard from './pages/VoterDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import AboutUs from './pages/Aboutus';
import ContactUs from './pages/ContactUs';  // Ensure ContactUs page is imported
import RegisterPage from './pages/RegisterPage';
import CastVote from './pages/CastVote';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/home" element={<HomePage />} />
        <Route path="/voter-dashboard" element={<VoterDashboard />} />
        <Route path="/officer-dashboard" element={<OfficerDashboard />} />
        <Route path="/vote" element={<CastVote />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} /> {/* Add Contact Us page */}
      </Routes>
    </Router>
  );
};

export default App;
