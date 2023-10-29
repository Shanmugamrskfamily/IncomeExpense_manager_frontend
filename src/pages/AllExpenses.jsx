import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllExpenses = () => {
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (!storedUserId || !storedToken) {
      navigate('/login');
    } else {
      fetchExpenseTransactions(storedUserId, storedToken);
    }
  }, [navigate]);

  const fetchExpenseTransactions = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:7000/api/expenseTransactions/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExpenseTransactions(data.expenseTransactions);
        toast.success('Expense transactions loaded successfully');
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (transactionId) => {
    localStorage.setItem('transactionId', transactionId);
    navigate(`/editExpense`);
  };

  const handleDelete = async (transactionId) => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:7000/api/deleteExpense/${storedUserId}/${transactionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.ok) {
        toast.success('Expense deleted successfully');
        // Filter out the deleted expense from the list
        setExpenseTransactions(prevExpenses => prevExpenses.filter(expense => expense._id !== transactionId));
      } else {
        toast.error('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Expense Transactions</h1>
      <div className="space-y-4">
        {expenseTransactions.map((transaction) => (
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

export default AllExpenses;
