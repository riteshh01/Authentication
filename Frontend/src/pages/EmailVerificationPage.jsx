import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import { MailCheck } from 'lucide-react'

const EmailVerificationPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRef = useRef([])
  const navigate = useNavigate()
  const { error, isLoading, verifyEmail } = useAuthStore()

  const handleChange = (index, value) => {
    const newCode = [...code]
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('')
      for (let i = 0; i < 6; i++) newCode[i] = pastedCode[i] || ''
      setCode(newCode)
      const lastFilledIndex = newCode.findLastIndex((d) => d !== '')
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
      inputRef.current[focusIndex].focus()
    } else {
      newCode[index] = value
      setCode(newCode)
      if (value && index < 5) inputRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRef.current[index - 1].focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const verificationCode = code.join('')
    try {
      await verifyEmail(verificationCode)
      navigate('/')
      toast.success('Email verified successfully')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (code.every((d) => d !== '')) {
      handleSubmit(new Event('submit'))
    }
  }, [code])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className='w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-slate-700/40 rounded-2xl shadow-2xl shadow-indigo-950/50 overflow-hidden'
    >
      <div className='h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500' />

      <div className='p-8 lg:p-10'>
        <div className='flex flex-col items-center mb-8'>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className='w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-900/50'
          >
            <MailCheck className='text-white' size={30} />
          </motion.div>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text'>
            Verify Your Email
          </h2>
          <p className='text-slate-500 text-sm text-center mt-2 leading-relaxed'>
            Enter the 6-digit code sent to your email address.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex justify-between gap-2'>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
                type='text'
                maxLength='6'
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className='w-12 h-14 text-center text-xl font-bold bg-slate-800/60 text-white border-2 border-slate-700/60 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-200 caret-indigo-400'
              />
            ))}
          </div>

          {error && <p className='text-red-400 font-medium text-sm text-center'>{error}</p>}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading || code.some((d) => !d)}
            className='w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-900/40 hover:from-indigo-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition duration-200'
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default EmailVerificationPage
