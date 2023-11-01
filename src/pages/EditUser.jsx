//EditUser.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const EditUser = () => {
    const [user, setUser] = useState({
      name: '',
      mobileNumber: 0,
      newEmail: '',
      avatar: ''
    });
    const [avatarList, setAvatarList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedToken = localStorage.getItem('token');
    
        if (!storedUserId || !storedToken) {
          navigate('/login');
        } else {
          fetchUserData(storedUserId,storedToken);
          fetchAvatarList();
        }
      }, [navigate]);

      const fetchUserData = async (userId,token) => {
        try {
          const response = await fetch(`http://localhost:7000/api/user/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("The Response is: ",response)
          if (response.ok) {
            const data = await response.json();
            console.log("The Data is: ",data);
            setUser({
              name: data.user.name || '',
              mobileNumber: data.user.mobileNumber || '',
              newEmail: data.user.email|| '', 
              avatar: data.user.avatar || '',
            });
          } else {
            console.error('Error fetching transaction data:', response.status);
          }
        } catch (error) {
          console.error('Error fetching transaction data:', error);
        }
      };
      const fetchAvatarList = async () => {
        try {
          const response = await fetch(`http://localhost:7000/api/avatars`);
          if (response.ok) {
            const data = await response.json();
            console.log("Avatar data: ",data);
            setAvatarList(data.avatars);
          } else {
            console.error('Error fetching avatar list:', response.status);
            toast.error('Error fetching avatar list:', response.status);
          }
        } catch (error) {
          console.error('Error fetching avatar list:', error);
          toast.error('Error fetching avatar list:', error);
        }
      };
      const handleUpdate = async (e) => {
        e.preventDefault();
      
        try {
          const storedUserId = localStorage.getItem('userId');
          const storedToken = localStorage.getItem('token');
          localStorage.setItem('newUserName', user.name);
          localStorage.setItem('newEmail', user.newEmail);
          localStorage.setItem('newMobileNumber', user.mobileNumber);
          localStorage.setItem('newAvatar', user.avatar);
      console.log("User Details: ",user);
          const response = await fetch(`http://localhost:7000/api/sendOTP/${storedUserId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedToken}`,
            },
            body: JSON.stringify(user),
          });
      
          if (response.ok) {
            toast.success('Email OTP sent!');
            navigate('/editUserOtp');
          } else {
            console.log(statuscode(400));
            toast.error('Failed to update user. Please try again.');
          }
        } catch (error) {
          toast.error('Failed to update user. Please try again.', error);
          console.error('Error updating user:', error);
        }
      };
      

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };

      return (
        <div className="container p-4 max-w-md mx-auto">
          <h1 className="h2 mb-4">Edit User Details</h1>
          <form onSubmit={handleUpdate} className="d-flex flex-column space-y-4">
            <div>
              <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control mb-2" placeholder="Name" />
            </div>
            <div>
              <input type="number" name="mobileNumber" value={user.mobileNumber} onChange={handleChange} className="form-control mb-2" placeholder="Mobile Number" />
            </div>
            <div>
              <input type="email" name="newEmail" value={user.newEmail} onChange={handleChange} className="form-control mb-2" placeholder="Email" />
            </div>
            <div>
              <select name="avatar" value={user.avatar} onChange={handleChange} className="form-select mb-2">
                <option value="">Select Avatar</option>
                {avatarList.map((avatar, index) => (
                  <option key={index} value={avatar.link}>
                    {avatar.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Update User / Send OTP
            </button>
          </form>
        </div>
      );
    };
    
    export default EditUser;