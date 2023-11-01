// Footer.jsx
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Footer = () => {
  return (
    <footer className=" d-flex justify-content-center gap-4 text-center footer-container sticky-bottom mt-5 text-light">
      <p>&copy; 2023 SHANMUGAM R. All rights reserved.</p>
        <a href="https://www.linkedin.com/in/shanmugamrskfamily/" className="text-light">
          <h3><i className="fab fa-linkedin"></i></h3>
        </a>
        <a href="https://github.com/Shanmugamrskfamily" className="text-light">
        <h3><i className="fab fa-github"></i></h3>
        </a>
    </footer>
  );
};

export default Footer;
