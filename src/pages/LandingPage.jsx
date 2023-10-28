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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Welcome to RSK Pettycash Manager</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <Link to="/login" className="block bg-blue-500 text-white font-bold py-3 rounded-lg text-center hover:bg-blue-600">
            Login
          </Link>
          <Link to="/signup" className="block bg-green-500 text-white font-bold py-3 rounded-lg text-center hover:bg-green-600">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
