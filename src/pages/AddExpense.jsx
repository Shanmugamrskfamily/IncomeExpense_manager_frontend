//AddExpense.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AddExpense = () => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const type = 'expense'; // Changed from 'income' to 'expense'

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

  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (!title || !amount || !category || !description || !date) {
      toast.error('Please fill in all fields');
      return;
    }

    const apiUrl = 'http://localhost:7000/api/addExpense';

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

        toast.success('Expense added successfully');
      } else {
        toast.error('Failed to add expense. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to add expense. Please try again.', error);
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
    <div className="container p-4">
      <div className="transaction-card d-flex glass-danger justify-content-center">
        <form onSubmit={handleAddExpense} className="max-w-md w-100 p-12  space-y-6 rounded-md">
        <div className='bg-danger'>
              <h2 className="fw-bold text-white text-center mb-5">Add Expense</h2>
            </div>
          <div className="flex items-center m-2 space-x-4">
            
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border border-gray-300 rounded p-3 w-100"
              required
            />
          </div>
          <div className="flex items-center m-2 space-x-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="border border-gray-300 rounded p-3 w-100"
              required
            />
          </div>
          <div className="flex items-center m-2 space-x-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
              className="border border-gray-300 rounded p-3 w-100"
              required
            />
          </div>
          <div className="flex items-center m-2 space-x-4">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="border border-gray-300 rounded p-3 w-100"
              required
            />
          </div>
          <div className="flex items-center m-2 space-x-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border border-gray-300 rounded p-3 h-32 w-100"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary py-3 m-2 px-6 w-100">
            Add Expense
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddExpense;