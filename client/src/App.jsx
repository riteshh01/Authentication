import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/login.jsx';
import Home from './pages/home.jsx';
import DummyPage from './pages/DummyPage.jsx';
import EmailVerify from './pages/EmailVerify.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import ForgotPassword from './pages/ForgetPassword.jsx';

import Navbar from './components/Navbar.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/dummy' element={<DummyPage />} />
      </Routes>
    </div>
  );
};

export default App;