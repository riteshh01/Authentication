import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <motion.div
          className='w-14 h-14 rounded-full border-4 border-indigo-900 border-t-indigo-400'
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className='text-slate-500 text-xs tracking-widest uppercase'>Loading</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
