//Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
        labels: [`Total Earnings: ₹ ${totalEarnings}`, `Total Expenses:  ₹ ${totalExpenses}`],
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
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'black',
              font: {
                size: 16,
                weight: 'bold',
              },
            },
          },
        },
      },
    });
  
    
    const hideLabelsOnSmallScreen = () => {
      if (window.innerWidth < 768) {
        window.myChart.options.plugins.legend.labels.size = 10; 
      } else {
        window.myChart.options.plugins.legend.labels.size = 16;
      }
      window.myChart.update(); // Update the chart
    };
  
    hideLabelsOnSmallScreen(); // Initial call
    window.addEventListener('resize', hideLabelsOnSmallScreen); // Listen for window resize and adjust labels
  };
  
  

  useEffect(() => {
    renderPieChart(totalEarnings, totalExpenses);
  }, [totalEarnings, totalExpenses]);

  return (
    <div className="glassmorphism-background">
    <div className="container p-4">
      <h1 className="display-4 mb-4 fw-bold">Dashboard</h1>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="p-4 rounded glass-success text-center text-white">
            <h2 className="h4 font-weight-bold ">Total Earnings</h2>
            <p className='fw-bold'>₹{totalEarnings}</p>
          </div>
        </div>

        <div className="col">
          <div className="p-4 rounded glass-danger text-white text-center">
            <h2 className="h4 font-weight-bold ">Total Expenses</h2>
            <p className='fw-bold'>₹{totalExpenses}</p>
          </div>
        </div>

        <div className="col">
          <div className="p-4 rounded text-center text-white glass-primary">
            <h2 className="h4 font-weight-bold">Available Balance</h2>
            <p className='fw-bold'>₹{availableBalance}</p>
          </div>
        </div>
      </div>
      <div className="container p-4 mt-4">
        <div className="row">
          <div className="col">
          <canvas id="pie-chart" width="300" height="300"></canvas>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
