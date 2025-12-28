import React from 'react'
import Loader from './Loader.jsx'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center'>
        <Loader/>
        <h1 className="text-3xl py-12">
          <span className="text-[#4285F4]">Welcome </span>
          <span className="text-[#EA4335]">to </span>
          <span className="text-[#FBBC05]">Our </span>
          <span className="text-[#34A853]">Page</span>
        </h1>
        <button onClick={() => navigate('/login')} className='flex items-center border border-gray-400 rounded-full px-6 py-2 text-gray-400 transition-all duration-300 ease-in-out hover:text-[#EA4335] hover:border-[#EA4335]'>Get Started</button>
    </div>

  )
}

export default Header