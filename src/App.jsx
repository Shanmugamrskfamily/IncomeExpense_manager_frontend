// App.jsx
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import EmailOTPVerification from './pages/EmailOTPVerification';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordVerification from './pages/ForgotPasswordVerification';
import LandingPage from './pages/LandingPage';


function App() {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyEmail" element={<EmailOTPVerification/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/forgotPasswordVerification" element={<ForgotPasswordVerification />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
