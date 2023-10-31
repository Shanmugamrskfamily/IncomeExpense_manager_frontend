import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsBoxArrowLeft, BsChevronDown, BsFillMenuButtonFill } from 'react-icons/bs'; 

const Header = () => {
  const [addTransactionOpen, setAddTransactionOpen] = useState(false);
  const [transactionHistoryOpen, setTransactionHistoryOpen] = useState(false);
  const userName = localStorage.getItem('userName');
  const avatar = localStorage.getItem('avatar');

  const handleAddTransactionToggle = () => {
    setAddTransactionOpen(!addTransactionOpen);
    setTransactionHistoryOpen(false);
  };

  const handleTransactionHistoryToggle = () => {
    setTransactionHistoryOpen(!transactionHistoryOpen);
    setAddTransactionOpen(false);
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
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="h-24 w-32" />
        </Link>

        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="md:hidden block text-white focus:outline-none"
        >
          <BsFillMenuButtonFill size={25} />
        </button>

        <div className={`md:block ${addTransactionOpen || transactionHistoryOpen ? 'block' : 'hidden'}`} id="navbar-dropdown">
          <ul className="md:flex md:space-x-4">
            <li className="relative">
              <Link to="/dashboard" className="text-white">Dashboard</Link>
            </li>

            <li className="relative" onClick={handleAddTransactionToggle}>
              <button className="text-white">Add Transaction <BsChevronDown /></button>
              <div className={`absolute left-0 mt-2 p-2 bg-gray-700 text-white rounded z-10 ${addTransactionOpen ? 'block' : 'hidden'}`}>
                <ul>
                  <li><Link to="/addIncome">Add Income</Link></li>
                  <li><Link to="/addExpense">Add Expense</Link></li>
                </ul>
              </div>
            </li>

            <li className="relative" onClick={handleTransactionHistoryToggle}>
              <button className="text-white">Transaction History <BsChevronDown /></button>
              <div className={`absolute left-0 mt-2 p-2 bg-gray-700 text-white rounded z-10 ${transactionHistoryOpen ? 'block' : 'hidden'}`}>
                <ul>
                  <li><Link to="/allIncomes">Income Transactions/ Update</Link></li>
                  <li><Link to="/allExpenses">Expense Transactions/ Update</Link></li>
                  <li><Link to="/allTransactions">All Transactions</Link></li>
                </ul>
              </div>
            </li>
            <li className="relative">
              <div className="flex items-center">
                <Link to="/user">
                <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                <span className="text-white ml-2">{userName}</span>
                </Link>
              </div>
            </li>
            <li>
            <Link to="/login">
              <button onClick={handleLogout} className="text-white flex items-center">
                <BsBoxArrowLeft className="mr-1" />Logout
              </button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          {addTransactionOpen || transactionHistoryOpen ? (
            <div className="bg-gray-800 p-2">
              <ul className="flex flex-col space-y-2 text-white">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li onClick={handleAddTransactionToggle}>
                  <span className="cursor-pointer">Add Transaction</span>
                  <ul className={`${addTransactionOpen ? 'block' : 'hidden'} pl-4`}>
                    <li><Link to="/addIncome">Add Income/ Update</Link></li>
                    <li><Link to="/addExpense">Add Expense/ Update</Link></li>
                  </ul>
                </li>
                <li onClick={handleTransactionHistoryToggle}>
                  <span className="cursor-pointer">Transaction History</span>
                  <ul className={`${transactionHistoryOpen ? 'block' : 'hidden'} pl-4`}>
                    <li><Link to="/allIncomes">Income Transactions/ Update</Link></li>
                    <li><Link to="/allExpenses">Expense Transactions</Link></li>
                    <li><Link to="/allTransactions">All Transactions</Link></li>
                  </ul>
                </li>
                <li>
                  <Link to="/user">
                    <div className="flex items-center">
                      <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                      <span className="ml-2">{userName}</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <button onClick={handleLogout} className="flex items-center">
                      <BsBoxArrowLeft className="mr-1" /> Logout
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Header;