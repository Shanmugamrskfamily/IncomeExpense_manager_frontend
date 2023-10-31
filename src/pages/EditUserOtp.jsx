import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUserOtp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!storedUserId || !storedToken) {
      navigate('/login');
    }
  }, [navigate]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const newEmail = localStorage.getItem('newEmail');
    const newName = localStorage.getItem('newUserName');
    const newMobileNumber = localStorage.getItem('newMobileNumber');
    const newAvatar = localStorage.getItem('newAvatar');

    try {
      const storedUserId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token');

      if (!storedUserId || !storedToken) {
        navigate('/login');
        return;
      }

      const userData = {
        userId: storedUserId,
        otp,
        newEmail,
        newName,
        newMobileNumber,
        newAvatar,
      };

      const response = await fetch(`http://localhost:7000/api/editUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        localStorage.setItem('avatar', newAvatar);
        localStorage.setItem('userName', newName);

        localStorage.removeItem('newUserName');
        localStorage.removeItem('newEmail');
        localStorage.removeItem('newAvatar');
        localStorage.removeItem('newMobileNumber');
        toast.success('User Details Updated✅ and Confirmation Email 📧 Sent!')
        navigate('/user');
      } else {
        toast.error('Invalid OTP ❌, Please try again.');
      }
    } catch (error) {
      toast.error('Failed to update user details. Please try again.', error);
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
      <form onSubmit={handleOtpSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter OTP"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Submit OTP
        </button>
      </form>
    </div>
  );
};

export default EditUserOtp;