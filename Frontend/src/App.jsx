import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import FloatingShape from './components/FloatingShape'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import EmailVerificationPage from './pages/EmailVerificationPage'

import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import DashboardPage from './pages/DashboardPage'
import LoadingSpinner from './components/LoadingSpinner'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

const ProtectedRoute = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children;
}

const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }

  return children;
}

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) {
    return <LoadingSpinner />
  }
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center relative overflow-hidden p-4'>
      <FloatingShape color='bg-indigo-600' size='w-80 h-80' top='-8%' left='5%' delay={0} />
      <FloatingShape color='bg-violet-600' size='w-64 h-64' top='65%' left='75%' delay={5} />
      <FloatingShape color='bg-cyan-500' size='w-48 h-48' top='40%' left='-8%' delay={2} />

      <Routes>
        <Route path='/' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path='/signup' element={<RedirectAuthenticatedUser><SignupPage /></RedirectAuthenticatedUser>} />
        <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
        <Route path='/verify-email' element={<EmailVerificationPage />} />
        <Route path='/forgot-password' element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
        <Route
          path='/reset-password/:token'
          element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>}
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>

      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            background: '#1e1b4b',
            color: '#e0e7ff',
            border: '1px solid rgba(99,102,241,0.3)',
          },
        }}
      />
    </div>
  )
}

export default App
