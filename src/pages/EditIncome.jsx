import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
console.log("The Response: ", response);
      if (response.ok) {
        const data = await response.json();
        setTransaction({
          title: data.title || '',
          amount: data.amount || 0,
          date: data.date || '', // Assuming received date is in 'yyyy-mm-dd' format
          category: data.category || '',
          description: data.description || '',
        });
      } else {
        console.error('Error fetching transaction data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    }
    console.log(data);
  };

  const handleUpdate = async () => {
    try {
      const storedUserId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token');
      const storedTransactionId = localStorage.getItem('transactionId');

      const response = await fetch(`http://localhost:7000/api/editIncome/${storedUserId}/${storedTransactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(transaction),
      });

      if (response.status(200)) {
        toast.success('Income updated successfully');
        localStorage.removeItem('transactionId'); // Remove the stored transaction ID
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
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Income</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <input type="text" name="title" value={transaction.title} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" placeholder="Title" />
        </div>
        <div>
          <input type="number" name="amount" value={transaction.amount} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" placeholder="Amount" />
        </div>
        <div>
          <input type="date" name="date" value={transaction.date} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" />
        </div>
        <div>
          <input type="text" name="category" value={transaction.category} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" placeholder="Category" />
        </div>
        <div>
          <textarea name="description" value={transaction.description} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full h-24" placeholder="Description" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Update Income
        </button>
      </form>
    </div>
  );
};

export default EditIncome;