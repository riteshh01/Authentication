import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import { useAuthStore } from '../store/authStore'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-4xl bg-slate-900/80 backdrop-blur-2xl border border-slate-700/40 rounded-2xl shadow-2xl shadow-indigo-950/50 overflow-hidden flex'
    >
      {/* Left branding panel */}
      <div className='hidden lg:flex w-[42%] bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 p-10 flex-col justify-between relative overflow-hidden'>
        <div className='absolute -top-14 -right-14 w-48 h-48 bg-white/10 rounded-full' />
        <div className='absolute -bottom-12 -left-12 w-60 h-60 bg-white/10 rounded-full' />
        <div className='absolute top-1/2 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2' />

        <div className='relative'>
          <div className='flex items-center gap-3 mb-10'>
            <div className='w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
              <Sparkles className='text-white' size={20} />
            </div>
            <span className='text-white font-bold text-xl tracking-tight'>AuthApp</span>
          </div>
          <h1 className='text-4xl font-bold text-white leading-snug mb-3'>
            Welcome<br />back!
          </h1>
          <p className='text-indigo-200 text-sm leading-relaxed'>
            Sign in to continue your secure journey. Your data is safe and encrypted.
          </p>
        </div>

        <div className='relative bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20'>
          <p className='text-indigo-100 text-sm italic leading-relaxed mb-3'>
            &ldquo;Security is not just a feature, it&rsquo;s the foundation we build everything on.&rdquo;
          </p>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full bg-cyan-400/30 flex items-center justify-center'>
              <span className='text-cyan-300 text-xs font-bold'>A</span>
            </div>
            <span className='text-indigo-200 text-xs'>AuthApp Team</span>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className='flex-1 flex flex-col justify-center p-8 lg:p-12'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text mb-1'>
            Sign In
          </h2>
          <p className='text-slate-500 text-sm'>Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <Input icon={Mail} type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input icon={Lock} type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className='flex justify-end mb-5'>
            <Link to='/forgot-password' className='text-xs text-indigo-400 hover:text-indigo-300 transition-colors'>
              Forgot password?
            </Link>
          </div>

          {error && <p className='text-red-400 font-medium text-sm mb-4'>{error}</p>}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className='w-full py-3 px-4 bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-900/40 hover:from-violet-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition duration-200 flex items-center justify-center gap-2'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loader className='w-5 h-5 animate-spin' /> : (<>Sign In <ArrowRight size={18} /></>)}
          </motion.button>
        </form>

        <p className='text-center text-sm text-slate-500 mt-6'>
          Don&apos;t have an account?{' '}
          <Link to='/signup' className='text-indigo-400 hover:text-indigo-300 font-medium transition-colors'>
            Create one
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage
