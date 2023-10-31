//ForgotPasswordVerification.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ForgotPasswordVerification = () => {
    
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (token && userId && userName) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      toast.error('Password must be at least 8 characters long and contain 1 uppercase letter, 1 number, and 1 symbol.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7000/api/resetPassword', { otp, newPassword });

      if (response.status === 200) {
        // Password reset and update successful, navigate to login page
        toast.success('Password reset and update successful.');
        navigate('/login');
      } else {
        toast.error('Failed to reset the password. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password: ', error);
      toast.error('Failed to reset the password. Please try again.');
    }
  };

  return (
    <div className="container w-50 p-4 bg-white shadow rounded">
      <h1 className="display-4 mb-4">Forgot Password Verification</h1>
      <form onSubmit={handleVerifyOTP} className="d-flex flex-column align-items-center">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary mb-2">
          Verify OTP & Set New Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordVerification;