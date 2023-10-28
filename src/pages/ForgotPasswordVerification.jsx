import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-md">
      <h1 className="text-3xl font-bold mb-4">Forgot Password Verification</h1>
      <form onSubmit={handleVerifyOTP} className="space-y-4 flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Verify OTP & Set New Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordVerification;
