import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllIncomes = () => {
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!storedUserId || !storedToken) {
      navigate('/login');
    } else {
      fetchIncomeTransactions(storedUserId, storedToken);
    }
  }, [navigate]);

  const fetchIncomeTransactions = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:7000/api/incomeTransactions/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIncomeTransactions(data.incomeTransactions);
        toast.success('Income transactions loaded successfully');
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (transactionId) => {
    localStorage.setItem('transactionId', transactionId);
    navigate(`/editIncome`);
  };

  const handleDelete = async (transactionId) => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:7000/api/deleteIncome/${storedUserId}/${transactionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.ok) {
        toast.success('Income deleted successfully');
        // Remove the deleted transaction from state
        setIncomeTransactions(prevTransactions => prevTransactions.filter(transaction => transaction._id !== transactionId));
      } else {
        toast.error('Failed to delete income');
      }
    } catch (error) {
      console.error('Error deleting income:', error);
      toast.error('Failed to delete income');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Income Transactions</h1>
      <div className="space-y-4">
        {incomeTransactions.map((transaction) => (
          <div key={transaction._id} className="border p-4 rounded-md bg-green-100">
            <p className="font-bold">Title: {transaction.title}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {transaction.date}</p>
            <p>Category: {transaction.category}</p>
            <p>Description: {transaction.description}</p>
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 mr-2"
              onClick={() => handleEdit(transaction._id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
              onClick={() => handleDelete(transaction._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllIncomes;
