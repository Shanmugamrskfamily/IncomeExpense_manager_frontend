import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-md">
      <h1 className="text-3xl font-bold mb-4">Email OTP Verification</h1>
      <form onSubmit={handleVerifyOTP} className="space-y-4 flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter OTP"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default EmailOTPVerification;
