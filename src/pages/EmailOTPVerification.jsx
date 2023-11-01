//EmailOTPVerification.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const EmailOTPVerification = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  
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

    try {
      const response = await axios.post('http://localhost:7000/api/verifyEmail', { token });

      if (response.status === 200) {
        toast.success('OTP verified. Redirecting to login.'); // Successful verification notification
        navigate('/login');
      } else {
        toast.error('OTP verification failed'); // Unsuccessful verification notification
        navigate('/failure');
      }
    } catch (error) {
      console.error('Error verifying OTP: ', error);
      toast.error('Failed to verify OTP. Please try again.'); // Error notification
    }
  };

  return (
    <div className="glassmorphism-background">
    <div className="container glass-primary w-50 p-4 text-white fw-bold rounded">
      <h1 className="display-4 mb-4">Email OTP Verification</h1>
      <h6 className="font-weight-bold mb-4">Check your Email Inbox/Spam Folder</h6>
      <form onSubmit={handleVerifyOTP} className="d-flex flex-column align-items-center">
        <input
          type="text"
          placeholder="Enter OTP"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary mb-2">
          Verify OTP
        </button>
      </form>
    </div>
    </div>
  );
};

export default EmailOTPVerification;
