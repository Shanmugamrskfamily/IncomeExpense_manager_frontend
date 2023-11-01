//User.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const User = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!storedUserId || !storedToken) {
      navigate('/login');
    } else {
      fetchUserData(storedUserId, storedToken);
    }
  }, [navigate]);

  const fetchUserData = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:7000/api/user/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        // toast.success('User Details Loaded Successfully!');
      } else {
        console.error('Error fetching user data:', response.status);
        toast.error('Error fetching user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Error fetching user data:', error);
    }
  };

  const handleEditProfile = () => {
    navigate('/editProfile');
  };

  return (
    <div className="d-flex justify-content-center align-items-center mb-4 mt-4">
      <div className="p-4 border rounded glass-primary text-white text-center">
        <h1 className="text-2xl font-weight-bold mb-4">User Information/ Update</h1>
        <p className='font-weight-bold'>Name: {userData.user?.name}</p>
        <p>Mobile Number: {userData.user?.mobileNumber}</p>
        <p>Email: {userData.user?.email}</p>
        <p>Password: ************</p>
        <img src={userData.user?.avatar} alt="User Avatar" className="w-10 h-10 rounded-circle mx-auto " />
        <p>OTP Will send for Edit User Information</p>
        <button
          className="btn btn-primary py-1 px-4 rounded hover:bg-primary mt-2 d-block mx-auto"
          onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default User;
