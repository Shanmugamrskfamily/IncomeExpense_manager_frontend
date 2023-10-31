import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResponsiveSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('avatar');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64">
        {/* Logo */}
        <div className="p-4 text-center">
          <img src="/images/logo.png" alt="Logo" className="w-12 h-12 mx-auto mb-2" />
        </div>

        {/* Navigation Links */}
        <div className="p-4">
          <Link to="/dashboard" className="block py-2 text-gray-200 hover:text-white">
            Dashboard
          </Link>
          <Link to="/addIncome" className="block py-2 text-gray-200 hover:text-white">
            Add Income
          </Link>
          <Link to="/addExpense" className="block py-2 text-gray-200 hover:text-white">
            Add Expense
          </Link>
          <Link to="/incomeTransactions" className="block py-2 text-gray-200 hover:text-white">
            Income Transactions
          </Link>
          <Link to="/expenseTransactions" className="block py-2 text-gray-200 hover:text-white">
            Expense Transactions
          </Link>
          <Link to="/allTransactions" className="block py-2 text-gray-200 hover:text-white">
            All Transactions
          </Link>
        </div>

        {/* User Information */}
        <div className="p-4 absolute bottom-0 w-full">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src={localStorage.getItem('avatar')} alt="User Avatar" className="w-8 h-8 rounded-full" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{localStorage.getItem('userName')}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="block py-2 text-gray-200 hover:text-white mt-2">
            Logout
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-4">
        {/* Your main content here */}
      </div>
    </div>
  );
};

export default ResponsiveSidebar;
