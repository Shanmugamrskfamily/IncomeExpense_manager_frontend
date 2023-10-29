import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [avatarList, setAvatarList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (token && userId && userName) {
      navigate('/dashboard');
    }
  }, [navigate]);
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/avatars');
        if (response.status === 200) {
          setAvatarList(response.data.avatars);
        }
      } catch (error) {
        toast.error('Error Fetching Avatar:', error);
        console.log("Error Fetching Avatar: ", error);
      }
    };
    fetchAvatars();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      toast.error('Password must be at least 8 characters long and contain 1 uppercase letter, 1 number, and 1 symbol.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7000/api/signup', {
        name,
        email,
        mobileNumber,
        password,
        avatar: selectedAvatar,
      });

      if (response.status === 201) {
        toast.success('Signup successful! Please verify your email.'); // Success notification
        navigate('/verifyEmail');
      } else {
        toast.error('Signup failed'); // Error notification
        console.log('Error: Unexpected status code:', response.status);
        // Display a message to the user or handle the error in an appropriate manner
      }
    } catch (error) {
      toast.error('Signup error: ' + error); // Error notification
      console.error("SignUp Error: ", error);
      // Handle the error, display a meaningful message, or take alternative action
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="mx-auto max-w-lg p-6 bg-white shadow rounded-md">
      <h1 className="text-3xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSignup} className="space-y-4 flex flex-col items-center">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2"
        />
        <input
          type="number"
          placeholder="Mobile"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2"
        />
        <select
          value={selectedAvatar}
          onChange={(e) => setSelectedAvatar(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2"
        >
          <option value="">Select Avatar</option>
          {avatarList.map((avatar) => (
            <option key={avatar._id} value={avatar.link}>
              {avatar.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Signup
        </button>
        <h4>Waiting For Email Verification👇🏻?</h4>
        <Link to="/verifyEmail" className="text-blue-500 hover:underline">
          Verify Email with OTP
        </Link>
      </form>
    </div>
  );
};

export default Signup;