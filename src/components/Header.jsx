import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState('');
  const userName = localStorage.getItem('userName');
  const avatar = localStorage.getItem('avatar');

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);


  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('avatar');
    localStorage.removeItem('transactionId');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  const shouldShowLogin = !['/login', '/dashboard','/addIncome','/addExpense','/allTransactions','/allIncomes','/editIncome','/allExpenses','/user','/editProfile','/editUserOtp','/editExpense'].includes(location.pathname);
  const shouldShowSignup = !['/signup', '/dashboard','/addIncome','/addExpense','/allTransactions','/allIncomes','/editIncome','/allExpenses','/user','/editProfile','/editUserOtp','/editExpense'].includes(location.pathname);
  const shouldShowdashboard=!['/','/signup','/login','/forgotPassword','/verifyEmail','/forgotPasswordVerification'].includes(location.pathname);
  return (
    <nav className="navbar sticky-top navbar-expand-lg header-container">
      <Link to="/">
        <img src="/images/logo.png" width="120" height="100" className="navbar-brand" alt="Brand Logo" />
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
        {shouldShowSignup && (
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/signup">Signup</Link>
            </li>
          )}
          {shouldShowLogin && (
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/login">Login</Link>
            </li>
          )}
          {shouldShowdashboard && (
            <>
          <li className="nav-item active">
            <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item text-white dropdown me-3">
            <Link className="nav-link dropdown-toggle text-white" to="#" id="addTransactionDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Add Transaction
            </Link>
            <ul className="dropdown-menu" aria-labelledby="addTransactionDropdown">
              <li><Link className="dropdown-item" to="/addIncome">Add Income</Link></li>
              <li><Link className="dropdown-item" to="/addExpense">Add Expense</Link></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle text-white" id="transactionHistoryDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
              <img src={avatar} width="80" height="40" alt="Avatar" />
              <span className='text-white'>{userName}</span></Link>
          </li>
          <li className="nav-item text-white">
            <Link className="nav-link text-white" type='button' onClick={handleLogout}>Logout <i class="fa-solid fa-right-from-bracket"></i></Link>
          </li>
          </>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Header;
