import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { Link } from 'react-router-dom'
import { ArrowLeft, Loader, Mail, KeyRound, Send } from 'lucide-react'
import Input from '../components/Input'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { isLoading, forgotPassword } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await forgotPassword(email)
    setIsSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-4xl bg-slate-900/80 backdrop-blur-2xl border border-slate-700/40 rounded-2xl shadow-2xl shadow-indigo-950/50 overflow-hidden flex'
    >
      {/* Left branding panel */}
      <div className='hidden lg:flex w-[42%] bg-gradient-to-br from-cyan-600 via-indigo-600 to-violet-700 p-10 flex-col justify-between relative overflow-hidden'>
        <div className='absolute -top-14 -right-14 w-48 h-48 bg-white/10 rounded-full' />
        <div className='absolute -bottom-12 -left-12 w-60 h-60 bg-white/10 rounded-full' />

        <div className='relative'>
          <div className='flex items-center gap-3 mb-10'>
            <div className='w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
              <KeyRound className='text-white' size={20} />
            </div>
            <span className='text-white font-bold text-xl tracking-tight'>AuthApp</span>
          </div>
          <h1 className='text-4xl font-bold text-white leading-snug mb-3'>
            Account<br />Recovery
          </h1>
          <p className='text-indigo-200 text-sm leading-relaxed'>
            No worries! Enter your email and we&apos;ll send you a secure link to reset your password.
          </p>
        </div>

        <div className='relative bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20'>
          <p className='text-indigo-100 text-sm leading-relaxed'>
            Reset links expire after <span className='text-cyan-300 font-semibold'>1 hour</span> for your security. Check your spam folder if you don&apos;t see the email.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className='flex-1 flex flex-col justify-center p-8 lg:p-12'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 text-transparent bg-clip-text mb-1'>
            Forgot Password
          </h2>
          <p className='text-slate-500 text-sm'>We&apos;ll send you a reset link right away</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <Input
              icon={Mail}
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className='mt-2 w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-900/30 hover:from-cyan-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition duration-200 flex items-center justify-center gap-2'
              type='submit'
            >
              {isLoading ? <Loader className='size-5 animate-spin' /> : <><Send size={17} /> Send Reset Link</>}
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='text-center'
          >
            <div className='w-16 h-16 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-900/40'>
              <Mail className='h-8 w-8 text-white' />
            </div>
            <h3 className='text-white font-semibold text-lg mb-2'>Check your inbox!</h3>
            <p className='text-slate-400 text-sm leading-relaxed'>
              If an account exists for{' '}
              <span className='text-indigo-400 font-medium'>{email}</span>,
              you will receive a password reset link shortly.
            </p>
          </motion.div>
        )}

        <div className='mt-8 pt-6 border-t border-slate-800'>
          <Link to='/login' className='text-sm text-slate-500 hover:text-indigo-400 flex items-center gap-2 transition-colors'>
            <ArrowLeft className='h-4 w-4' /> Back to Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default ForgotPasswordPage
