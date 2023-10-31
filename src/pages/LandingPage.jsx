//LandingPage.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const LandingPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
    
        if (token && userId && userName) {
          navigate('/dashboard');
        }
      }, [navigate]);
      return (
        <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '100vh' }}>
          <div className="max-w-lg p-4 bg-white shadow rounded">
            <h1 className="h1 mb-4">Welcome to RSK Pettycash Manager</h1>
            <div className="row row-cols-1 row-cols-sm-2 g-3">
              <Link to="/login" className="btn btn-primary d-block rounded-lg text-center">
                Login
              </Link>
              <Link to="/signup" className="btn btn-success d-block rounded-lg text-center">
                Signup
              </Link>
            </div>
          </div>
        </div>
      );
    };

export default LandingPage;
