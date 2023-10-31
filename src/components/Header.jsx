import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  const userName = localStorage.getItem('userName');
  const avatar = localStorage.getItem('avatar');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('avatar');
    localStorage.removeItem('transactionId');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <Link to="/">
        <img src="/images/logo.png" width="120" height="80" className="navbar-brand" alt="Brand Logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse ml-2 navbar-collapse justify-content-end"
        id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item dropdown me-3">
            <Link className="nav-link dropdown-toggle" to="#" id="addTransactionDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Add Transaction
            </Link>
            <ul className="dropdown-menu" aria-labelledby="addTransactionDropdown">
              <li><Link className="dropdown-item" to="/addIncome">Add Income</Link></li>
              <li><Link className="dropdown-item" to="/addExpense">Add Expense</Link></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" id="transactionHistoryDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Transaction History
            </Link>
            <ul className="dropdown-menu" aria-labelledby="transactionHistoryDropdown">
              <li><Link className="dropdown-item" to="/allIncomes">Income Transactions/ Update</Link></li>
              <li><Link className="dropdown-item" to="/allExpenses">Expense Transactions/ Update</Link></li>
              <li><Link className="dropdown-item" to="/allTransactions">All Transactions</Link></li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link"  to="/user">
              <img src={avatar} width="50" height="20" alt="Avatar" />
              <span>{userName}</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" type='button' onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Header;
