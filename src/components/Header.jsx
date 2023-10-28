// Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  // Function to determine the opposite page link based on the current page
  const getOppositeLink = () => {
    if (location.pathname === '/login') {
      return (
        <Link to="/signup" className="hover:underline">
          Signup
        </Link>
      );
    } else if (location.pathname === '/signup') {
      return (
        <Link to="/login" className="hover:underline">
          Login
        </Link>
      );
    }
    return null; // If neither login nor signup page, return null (no additional link)
  };

  return (
    <header className="bg-blue-400 text-white p-2 flex justify-between items-center">
      <div className="flex items-center">
        {/* Brand Logo */}
        <img src="./images/logo.png" alt="RSK Petty Cash Manager" className="w-32 h-auto" />
      </div>
      <div>
        {/* Conditional link based on the current page */}
        {getOppositeLink()}
      </div>
    </header>
  );
};

export default Header;
