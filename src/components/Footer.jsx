// Footer.jsx
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  return (
    <footer className="bg-blue-400  text-white p-2 text-center">
      <p>&copy; 2023 Your Company. All rights reserved.</p>
      <div className="flex justify-center space-x-4">
        <a href="#" className="text-white hover:text-gray-300">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="#" className="text-white hover:text-gray-300">
          <i className="fab fa-github"></i>
        </a>
        {/* Add other social media icons */}
      </div>
    </footer>
  );
};

export default Footer;
