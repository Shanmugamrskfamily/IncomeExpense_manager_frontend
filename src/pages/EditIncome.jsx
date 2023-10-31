//EditIncome.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const EditIncome = () => {
  const [transaction, setTransaction] = useState({
    title: '',
    amount: 0,
    date: '', // Initializing as an empty string
    category: '',
    description: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    const storedTransactionId = localStorage.getItem('transactionId');

    if (!storedUserId || !storedToken || !storedTransactionId) {
      navigate('/login');
    } else {
      fetchTransactionData(storedUserId, storedTransactionId, storedToken);
    }
  }, [navigate]);

  const fetchTransactionData = async (userId, transactionId, token) => {
    try {
      const response = await fetch(`http://localhost:7000/api/incomeTransaction/${userId}/${transactionId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.incomeTransaction.date) {
          const formattedDate = new Date(data.incomeTransaction.date).toISOString().split('T')[0];
          setTransaction({
            title: data.incomeTransaction.title || '',
            amount: data.incomeTransaction.amount || 0,
            date: formattedDate || '', // Format the date received from the API
            category: data.incomeTransaction.category || '',
            description: data.incomeTransaction.description || '',
          });
        } else {
          setTransaction({
            title: data.incomeTransaction.title || '',
            amount: data.incomeTransaction.amount || 0,
            category: data.incomeTransaction.category || '',
            description: data.incomeTransaction.description || '',
          });
        }
      } else {
        console.error('Error fetching transaction data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const storedUserId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token');
      const storedTransactionId = localStorage.getItem('transactionId');

      let body = { ...transaction };
      if (transaction.date) {
        const formattedDate = new Date(transaction.date).toISOString().split('T')[0];
        body = { ...transaction, date: formattedDate };
        console.log(body);
      }

      const response = await fetch(`http://localhost:7000/api/editIncome/${storedUserId}/${storedTransactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(body),

      });

      if (response.ok) {
        toast.success('Income updated successfully');
        localStorage.removeItem('transactionId');
        navigate('/allIncomes');
      } else {
        toast.error('Failed to update income. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to update income. Please try again.', error);
      console.error('Error updating income:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-2xl font-bold mb-4">Edit Income</h1>
      <form onSubmit={handleUpdate} className="mb-4">
        <div className="mb-3">
          <input type="text" name="title" value={transaction.title} onChange={handleChange} className="form-control" placeholder="Title" />
        </div>
        <div className="mb-3">
          <input type="number" name="amount" value={transaction.amount} onChange={handleChange} className="form-control" placeholder="Amount" />
        </div>
        <div className="mb-3">
          <input type="date" name="date" value={transaction.date} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <input type="text" name="category" value={transaction.category} onChange={handleChange} className="form-control" placeholder="Category" />
        </div>
        <div className="mb-3">
          <textarea name="description" value={transaction.description} onChange={handleChange} className="form-control" placeholder="Description"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Income
        </button>
      </form>
    </div>
  );
};

export default EditIncome;
