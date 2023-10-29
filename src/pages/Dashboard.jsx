import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
        navigate('/login');
      return;
    }

    axios.get(`http://localhost:7000/api/cumulativeIncome/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const { cumulativeIncomeData } = response.data;
        setTotalEarnings(cumulativeIncomeData ? cumulativeIncomeData.totalIncome : 0);
      })
      .catch((error) => {
        console.error('Error fetching Total Earnings:', error);
      });

    axios.get(`http://localhost:7000/api/cumulativeExpense/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const { cumulativeExpenseData } = response.data;
        setTotalExpenses(cumulativeExpenseData ? cumulativeExpenseData.totalExpense : 0);
      })
      .catch((error) => {
        console.error('Error fetching Total Expenses:', error);
      });

    axios.get(`http://localhost:7000/api/cashBalance/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAvailableBalance(response.data.cashBalance || 0);
      })
      .catch((error) => {
        console.error('Error fetching Available Balance:', error);
      });
  }, [history]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-200 p-4 rounded">
          <h2 className="text-xl font-semibold">Total Earnings</h2>
          <p>${totalEarnings}</p>
        </div>

        <div className="bg-gray-200 p-4 rounded">
          <h2 className="text-xl font-semibold">Total Expenses</h2>
          <p>${totalExpenses}</p>
        </div>

        <div className="bg-gray-200 p-4 rounded">
          <h2 className="text-xl font-semibold">Available Balance</h2>
          <p>${availableBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
