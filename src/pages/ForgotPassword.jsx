//ForgotPassword.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (token && userId && userName) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:7000/api/sendPasswordResetLink', { email });

      if (response.status === 200) {
        // Request for OTP successful, navigate to verification page
        toast.success('Password reset OTP sent to your email.');
        navigate('/forgotPasswordVerification');
      } else {
        setErrorMessage('Failed to send OTP. Please try again.');
        toast.error('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending password reset link: ', error);
      toast.error('Failed to send OTP. Please try again.');

    }
  };

  return (
    <div className="glassmorphism-background">
      <div className="container glass-primary w-50 p-4 text-white fw-bold rounded">
        <h1 className="display-4 mb-4">Forgot Password</h1>
        <form onSubmit={handleForgotPassword} className="d-flex flex-column align-items-center">
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-2"
          />
          {errorMessage && <p className="text-danger small">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary mb-2">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;