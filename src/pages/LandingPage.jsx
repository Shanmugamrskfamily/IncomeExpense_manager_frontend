import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh', background: 'linear-gradient(to right, #4b6cb7, #182848)' }}>
      <div className="max-w-lg p-4 bg-warning text-white shadow-lg rounded-lg" style={{ backdropFilter: 'blur(10px)', padding: '40px', borderRadius: '10px', textAlign: 'center' }}>
        <h1 className="h1 mb-4 ">Welcome to RSK Petty Cash Manager</h1>
        <p className="lead mb-4 ">
          Our application helps you manage your petty cash efficiently. Keep track of expenses, incomes, and transactions with ease.
        </p>
        <img src="/images/landingpage.jpg" alt="Cash Manager" className="img-fluid  mb-4" style={{ maxWidth: '250px', boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)' }} />
        <div className="row row-cols-1 row-cols-sm-2 g-3">
          <Link to="/login" className="btn btn-primary rounded-pill text-center">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success rounded-pill text-center">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
