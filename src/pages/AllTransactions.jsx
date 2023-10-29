import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!storedUserId || !storedToken) {
      navigate('/login');
    } else {
      fetchTransactions(storedUserId, storedToken);
    }
  }, [navigate]);

  const fetchTransactions = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:7000/api/allTransactions/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.allTransactions);
        toast.success('Transactions loaded successfully');
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Transactions</h1>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className={`border p-4 rounded-md ${
              transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <p className="font-bold">Type of Transaction: {transaction.type}</p>
            <p className="font-bold">Title: {transaction.title}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {transaction.date}</p>
            <p>Category: {transaction.category}</p>
            <p>Description: {transaction.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTransactions;
