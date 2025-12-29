import React, { useContext } from 'react'
import Loader from './Loader.jsx'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext.jsx'

const Header = () => {
const context = useContext(AppContent);

  if (!context) {
    console.log("Header is outside AppContextProvider");
    return null;
  }

const { isLoggedIn, userData } = context;
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
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <button
              onClick={() => navigate('/dummy')}
              className='flex items-center border border-[#34A853] rounded-full px-6 py-2 text-[#34A853] 
                         transition-all duration-300 ease-in-out hover:bg-[#34A853] hover:text-white'
            >
              Click here
            </button>
          )}

          {!isLoggedIn && (
            <button
              onClick={() => navigate('/login')}
              className='flex items-center border border-gray-400 rounded-full px-6 py-2 text-gray-400 
                         transition-all duration-300 ease-in-out hover:text-[#EA4335] hover:border-[#EA4335]'
            >
              Get Started
            </button>
          )}
        </div>
    </div>

  )
}

export default Header