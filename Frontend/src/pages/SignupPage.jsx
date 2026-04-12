import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Input from '../components/Input'
import { Loader, Lock, Mail, User, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { useAuthStore } from '../store/authStore'

const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      await signup(email, password, name)
      navigate('/verify-email')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-4xl bg-slate-900/80 backdrop-blur-2xl border border-slate-700/40 rounded-2xl shadow-2xl shadow-indigo-950/50 overflow-hidden flex'
    >
      {/* Left branding panel */}
      <div className='hidden lg:flex w-[42%] bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 flex-col justify-between relative overflow-hidden'>
        <div className='absolute -top-14 -right-14 w-48 h-48 bg-white/10 rounded-full' />
        <div className='absolute -bottom-12 -left-12 w-60 h-60 bg-white/10 rounded-full' />
        <div className='absolute top-1/2 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2' />

        <div className='relative'>
          <div className='flex items-center gap-3 mb-10'>
            <div className='w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
              <ShieldCheck className='text-white' size={22} />
            </div>
            <span className='text-white font-bold text-xl tracking-tight'>AuthApp</span>
          </div>
          <h1 className='text-4xl font-bold text-white leading-snug mb-3'>
            Start your<br />journey today
          </h1>
          <p className='text-indigo-200 text-sm leading-relaxed'>
            Join thousands of users who trust our platform for secure, seamless authentication.
          </p>
        </div>

        <div className='relative space-y-3.5'>
          {['Secure email verification', 'JWT-based authentication', 'Password reset via email'].map((f, i) => (
            <div key={i} className='flex items-center gap-3'>
              <CheckCircle2 className='text-cyan-300 shrink-0' size={17} />
              <span className='text-indigo-100 text-sm'>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className='flex-1 flex flex-col justify-center p-8 lg:p-12'>
        <div className='mb-7'>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text mb-1'>
            Create Account
          </h2>
          <p className='text-slate-500 text-sm'>Fill in your details to get started</p>
        </div>

        <form onSubmit={handleSignUp}>
          <Input icon={User} type='text' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
          <Input icon={Mail} type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input icon={Lock} type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <p className='text-red-400 text-sm font-medium mb-2'>{error}</p>}
          <PasswordStrengthMeter password={password} />

          <motion.button
            className='mt-6 w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-900/40 hover:from-indigo-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition duration-200'
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loader className='animate-spin mx-auto' size={22} /> : 'Create Account'}
          </motion.button>
        </form>

        <p className='text-center text-sm text-slate-500 mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-indigo-400 hover:text-indigo-300 font-medium transition-colors'>
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default SignupPage
