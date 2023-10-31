// Footer.jsx
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  return (
    <footer className=" p-2 text-center">
      <p>&copy; 2023 SHANMUGAM R. All rights reserved.</p>
      <div className="flex justify-center space-x-4">
        <a href="#" className=" hover:text-gray-300">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="#" className=" hover:text-gray-300">
          <i className="fab fa-github"></i>
        </a>
        {/* Add other social media icons */}
      </div>
    </footer>
  );
};

export default Footer;
