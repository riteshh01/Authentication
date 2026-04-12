import React from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { formatDate } from '../utils/date'
import { LogOut, CalendarDays, Clock, BadgeCheck } from 'lucide-react'

const DashboardPage = () => {
  const { user, logout } = useAuthStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-xl'
    >
      <div className='bg-slate-900/80 backdrop-blur-2xl border border-slate-700/40 rounded-2xl shadow-2xl shadow-indigo-950/50 overflow-hidden'>
        <div className='h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500' />

        {/* Profile header */}
        <div className='flex flex-col items-center p-8 border-b border-slate-800'>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className='w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-900/50 text-white text-3xl font-bold select-none'
          >
            {user.name?.[0]?.toUpperCase() ?? 'U'}
          </motion.div>
          <h3 className='text-xl font-bold text-white'>{user.name}</h3>
          <p className='text-slate-400 text-sm mt-0.5'>{user.email}</p>
          {user.isVerified && (
            <div className='flex items-center gap-1.5 mt-3 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1'>
              <BadgeCheck className='text-indigo-400' size={14} />
              <span className='text-indigo-300 text-xs font-medium'>Verified Account</span>
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div className='grid grid-cols-2 divide-x divide-slate-800'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='p-6'
          >
            <div className='flex items-center gap-2 mb-3'>
              <div className='w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center'>
                <CalendarDays className='text-indigo-400' size={16} />
              </div>
              <span className='text-slate-400 text-sm'>Joined</span>
            </div>
            <p className='text-white font-semibold text-sm'>
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='p-6'
          >
            <div className='flex items-center gap-2 mb-3'>
              <div className='w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center'>
                <Clock className='text-violet-400' size={16} />
              </div>
              <span className='text-slate-400 text-sm'>Last Login</span>
            </div>
            <p className='text-white font-semibold text-sm'>{formatDate(user.lastLogin)}</p>
          </motion.div>
        </div>

        {/* Logout */}
        <div className='p-6 border-t border-slate-800'>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={logout}
            className='w-full py-3 px-4 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold rounded-xl border border-slate-700/60 hover:border-red-500/40 transition-all duration-200 flex items-center justify-center gap-2 group'
          >
            <LogOut className='group-hover:text-red-400 transition-colors' size={18} />
            <span className='group-hover:text-red-400 transition-colors'>Sign Out</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default DashboardPage
