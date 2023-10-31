import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';

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

    // Fetch Total Earnings
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

    // Fetch Total Expenses
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

    // Fetch Available Balance
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
  }, [navigate]);

  const renderPieChart = (earnings, expenses) => {
    const ctx = document.getElementById('pie-chart').getContext('2d');

    if (window.myChart) {
      window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels:[`Total Earnings: ₹ ${totalEarnings}`, `Total Expenses:  ₹ ${totalExpenses}`],
        datasets: [
          {
            label: 'Amount',
            data: [earnings, expenses],
            backgroundColor: [
              'rgb(17, 102, 16)', // Green for Earnings
              'rgb(238, 34, 34)', // Red for Expenses
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'white', // Set the font color to white
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    renderPieChart(totalEarnings, totalExpenses);
  }, [totalEarnings, totalExpenses]);

  return (
    <div className="container items-center justify-center mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded">
          <h2 className="text-xl font-semibold">Total Earnings</h2>
          <p>₹{totalEarnings}</p>
        </div>

        <div className="p-4 rounded">
          <h2 className="text-xl font-semibold">Total Expenses</h2>
          <p>₹{totalExpenses}</p>
        </div>

        <div className="p-4 rounded">
          <h2 className="text-xl font-semibold">Available Balance</h2>
          <p>₹{availableBalance}</p>
        </div>
      </div>

      <div className="container p-4 mt-8">
      <div className="flex gap-4">
        <canvas id="pie-chart" className="w-full md:w-1/3 mx-auto"></canvas>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
