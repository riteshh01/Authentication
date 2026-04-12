import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../components/Input'
import { Lock, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { resetPassword, error, isLoading, message } = useAuthStore()
  const { token } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      await resetPassword(token, password)
      toast.success('Password reset successful, redirecting...')
      setTimeout(() => navigate('/login'), 2000)
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Error resetting password')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className='w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-slate-700/40 rounded-2xl shadow-2xl shadow-indigo-950/50 overflow-hidden'
    >
      <div className='h-1.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500' />

      <div className='p-8 lg:p-10'>
        <div className='flex flex-col items-center mb-8'>
          <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-violet-900/50'>
            <ShieldCheck className='text-white' size={28} />
          </div>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text'>
            Reset Password
          </h2>
          <p className='text-slate-500 text-sm text-center mt-2'>Enter your new password below</p>
        </div>

        {error && <p className='text-red-400 text-sm text-center mb-4 font-medium'>{error}</p>}
        {message && <p className='text-emerald-400 text-sm text-center mb-4 font-medium'>{message}</p>}

        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type='password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            icon={Lock}
            type='password'
            placeholder='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className='mt-2 w-full py-3 px-4 bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-900/40 hover:from-violet-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition duration-200'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Set New Password'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default ResetPasswordPage
