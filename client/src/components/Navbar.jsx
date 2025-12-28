import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContent)

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <img src={assets.risky} alt="" className='h-18 w-22 sm:w-22 rounded-md'/>

        {userData ? <div>{userData}</div> : 
              <button
              onClick={() => navigate('/login')}
              className='flex items-center border border-gray-400 rounded-full px-6 py-2 text-gray-400 transition-all duration-300 ease-in-out hover:text-gray-50 hover:border-gray-50'>Login</button>
        }
       
    </div>
  )
}

export default Navbar