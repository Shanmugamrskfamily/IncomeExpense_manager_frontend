// Footer.jsx
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Footer = () => {
  return (
    <footer className="p-2 text-center bg-dark sticky-bottom text-light">
      <p>&copy; 2023 SHANMUGAM R. All rights reserved.</p>
      <div className="d-flex justify-content-center gap-4">
        <a href="#" className="text-light">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="#" className="text-light">
          <i className="fab fa-github"></i>
        </a>
        {/* Add other social media icons */}
      </div>
    </footer>
  );
};

export default Footer;
