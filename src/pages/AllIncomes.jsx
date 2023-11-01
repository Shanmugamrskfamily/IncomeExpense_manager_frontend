//AllIncomes.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { faRupee, faRupeeSign } from '@fortawesome/free-solid-svg-icons';

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

  const handleDelete = async (transactionId, transactionTitle) => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    const confirmed = window.confirm(`Are you sure you want to delete the transaction "${transactionTitle}"?`);

    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:7000/api/deleteIncome/${storedUserId}/${transactionId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.ok) {
          toast.success('Income deleted successfully');
          setIncomeTransactions(prevTransactions => prevTransactions.filter(transaction => transaction._id !== transactionId));
        } else {
          toast.error('Failed to delete income');
        }
      } catch (error) {
        console.error('Error deleting income:', error);
        toast.error('Failed to delete income');
      }
    }
  };

  return (
    <div className="m-5">
    <div className="container p-4">
      <h1 className=" fw-bold text-success text-center mb-4">All Income Transactions</h1>
      <div className="space-y-4 ">
        {incomeTransactions.map((transaction) => (
          <div key={transaction._id} className="transaction-card glass-success text-center fw-bold text-white">
            <h4 className="font-weight-bold text-warning">Title: {transaction.title}</h4>
            <p>Amount: <i class="fa-solid fa-indian-rupee-sign"></i>{transaction.amount}</p>
            <p>Date: {transaction.date}</p>
            <p>Category: {transaction.category}</p>
            <p>Description: {transaction.description}</p>
            <button
              className="btn btn-primary me-2"
              onClick={() => handleEdit(transaction._id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger me-2"
              onClick={() => handleDelete(transaction._id, transaction.title)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AllIncomes;