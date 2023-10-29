import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const AddIncome = () => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const type = 'income';

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');

    if (!storedUserId || !storedToken || !storedUserName) {
      navigate('/login');
    } else {
      setUserId(storedUserId);
      setToken(storedToken);
      setUserName(storedUserName);
    }
  }, [navigate]);

  const handleAddIncome = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!title || !amount || !category || !description || !date) {
      toast.error('Please fill in all fields');
      return;
    }

    const apiUrl = 'http://localhost:7000/api/addIncome';

    const data = {
      userId,
      userName,
      title,
      amount,
      category,
      description,
      date,
      type,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setTitle('');
        setAmount('');
        setCategory('');
        setDescription('');
        setDate('');

        toast.success('Income added successfully');
      } else {
        toast.error('Failed to add income. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to add income. Please try again.', error);
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <div className="min-h-screen flex justify-center bg-gray-50">
        <form onSubmit={handleAddIncome}>
          <div className="max-w-md w-full p-12 space-y-6 bg-white shadow rounded-md">
            <h2 className="text-3xl font-bold text-center mb-5">Add Income</h2>

            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faDollarSign} />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="border border-gray-300 rounded p-3 w-full"
                required
              />
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faDollarSign} />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="border border-gray-300 rounded p-3 w-full"
                required
              />
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faDollarSign} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date"
                className="border border-gray-300 rounded p-3 w-full"
                required
              />
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faDollarSign} />
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="border border-gray-300 rounded p-3 w-full"
                required
              />
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faDollarSign} />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="border border-gray-300 rounded p-3 h-32 w-full"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 w-full"
            >
              Add Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncome;
