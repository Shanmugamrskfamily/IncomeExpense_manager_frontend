import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        e.preventDefault(); // Prevent the default form submission behavior
      
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
        <div className="p-4 max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Edit User Details</h1>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <input type="text" name="title" value={user.name} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" placeholder="name" />
            </div>
            <div>
              <input type="number" name="amount" value={user.mobileNumber} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" placeholder="Amount" />
            </div>
            <div>
              <input type="email" name="date" value={user.newEmail} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" />
            </div>
            <div>
          <select name="avatar" value={user.avatar} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full">
            <option value="">Select Avatar</option>
            {avatarList.map((avatar, index) => (
              <option key={index} value={avatar.link}>
                {avatar.name}
              </option>
            ))}
          </select>
        </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Update User/ Send OTP
            </button>
          </form>
        </div>
      );
};
export default EditUser;