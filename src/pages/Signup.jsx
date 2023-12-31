//Signup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
    <div className="glassmorphism-background">
    <div className="container w-50 p-4  glass-primary text-white rounded">
      <h1 className="display-4 mb-4">Signup</h1>
      <form onSubmit={handleSignup} className="d-flex flex-column align-items-center">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Mobile"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-2"
        />
        <select
          value={selectedAvatar}
          onChange={(e) => setSelectedAvatar(e.target.value)}
          className="form-control mb-2"
        >
          <option value="">Select Avatar</option>
          {avatarList.map((avatar) => (
            <option key={avatar._id} value={avatar.link}>
              {avatar.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn w-50 btn-primary mb-2">
          Signup
        </button>
        <h4>Waiting For Email Verification👇🏻?</h4>
        <Link to="/verifyEmail" className="text-primary">
          Verify Email with OTP
        </Link>
      </form>
    </div>
    </div>
  );
};

export default Signup;