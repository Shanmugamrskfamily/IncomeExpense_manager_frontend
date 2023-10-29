import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsBoxArrowLeft, BsChevronDown, BsFillMenuButtonFill } from 'react-icons/bs'; // Ensure to import these icons

const Header = () => {
  
  const userName = localStorage.getItem('userName');
  const avatar = localStorage.getItem('avatar');

  const [addTransactionOpen, setAddTransactionOpen] = useState(false);
  const [transactionHistoryOpen, setTransactionHistoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAddTransactionToggle = () => {
    setAddTransactionOpen(!addTransactionOpen);
    setTransactionHistoryOpen(false);
  };

  const handleTransactionHistoryToggle = () => {
    setTransactionHistoryOpen(!transactionHistoryOpen);
    setAddTransactionOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('avatar');
    localStorage.removeItem('transactionId');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <Link to='/dashboard' className="flex items-center">
          <img src="./images/logo.png" className="h-20 mr-3" alt="RSK Logo" />
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
          onClick={handleMobileMenuToggle}
        >
          <BsFillMenuButtonFill />
        </button>
        <div className={`hidden md:block md:w-auto ${mobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="relative">
              <button
                onClick={handleAddTransactionToggle}
                className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Add Transaction
                <BsChevronDown />
              </button>
              <div
                className={`z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                  addTransactionOpen ? 'block' : 'hidden'
                }`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <Link to="/addIncome" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Add Income
                    </Link>
                  </li>
                  <li>
                    <Link to="/addExpense" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Add Expense
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="relative">
              <button
                onClick={handleTransactionHistoryToggle}
                className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Transaction History
                <BsChevronDown />
              </button>
              <div
                className={`z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                  transactionHistoryOpen ? 'block' : 'hidden'
                }`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <Link to="/allIncomes" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      All Incomes/ Update
                    </Link>
                  </li>
                  <li>
                    <Link to="/allExpenses" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      All Expenses/ Update
                    </Link>
                  </li>
                  <li>
                    <Link to="/allTransactions" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      All Transactions
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link to="/user" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                <span className="ml-2">{userName}</span>
              </Link>
            </li>
            <li>
              <Link to="/login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <BsBoxArrowLeft className="mr-2" />
                <span onClick={handleLogout}>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;