//AllTransactions.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
    <div className="m-5">
    <div className="container p-4">
      <h1 className=" fw-bold text-primary text-center mb-4">All Transactions History</h1>
      <div className="space-y-4 ">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className={`transaction-card text-center fw-bold text-white ${
              transaction.type === 'income' ? 'glass-success' : 'glass-danger'
            }`}
          >
            <h4 className="font-weight-bold text-primary">Type of Transaction: {transaction.type}</h4>
            <p className="font-weight-bold">Title: {transaction.title}</p>
            <p>Amount: <i class="fa-solid fa-indian-rupee-sign"></i>{transaction.amount}</p>
            <p>Date: {transaction.date}</p>
            <p>Category: {transaction.category}</p>
            <p>Description: {transaction.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AllTransactions;