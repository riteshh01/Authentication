import React from 'react'

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className='relative mb-4 group'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none'>
        <Icon className='size-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors duration-200' />
      </div>
      <input
        {...props}
        className='w-full pl-10 pr-4 py-3 bg-slate-800/60 rounded-xl border border-slate-700/60
          focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20
          text-white placeholder-slate-500 transition duration-200 outline-none text-sm'
      />
    </div>
  )
}

export default Input
