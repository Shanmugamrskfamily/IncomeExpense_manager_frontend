// App.jsx
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import EmailOTPVerification from './pages/EmailOTPVerification';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordVerification from './pages/ForgotPasswordVerification';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AddIncome from './pages/AddIncome';
import AddExpense from './pages/AddExpense';
import AllTransactions from './pages/AllTransactions';
import AllIncomes from './pages/AllIncomes';
import EditIncome from './pages/EditIncome';
import AllExpenses from './pages/AllExpenses';
import User from './pages/User';
import EditUser from './pages/EditUser';
import EditUserOtp from './pages/EditUserOtp';
import EditExpense from './pages/EditExpense';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div className='App'>
    <Router>
      <Header/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyEmail" element={<EmailOTPVerification/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/forgotPasswordVerification" element={<ForgotPasswordVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addIncome" element={<AddIncome />} />
        <Route path="/addExpense" element={<AddExpense />} />
        <Route path="/allTransactions" element={<AllTransactions />} />
        <Route path="/allIncomes" element={<AllIncomes />} />
        <Route path="/editIncome" element={<EditIncome />} />
        <Route path="/allExpenses" element={<AllExpenses />} />
        <Route path="/user" element={<User />} />
        <Route path="/editProfile" element={<EditUser />} />
        <Route path="/editUserOtp" element={<EditUserOtp />} />
        <Route path="/editExpense" element={<EditExpense />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
    </div>
  );
}

export default App;
