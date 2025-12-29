import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate()
  const { userData, setIsLoggedIn, setUserData } = useContext(AppContent);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });

      setUserData(null);
      setIsLoggedIn(false);

      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <img src={assets.risky} alt="" className='h-18 w-22 sm:w-22 rounded-md'/>

        {userData?.name ? (
          <div className="flex items-center gap-4">
            <div
              title={userData.name}
              className="w-14 h-14 flex items-center justify-center rounded-full 
                         bg-gradient-to-br from-blue-500 via-red-500 to-yellow-400
                         text-white font-bold text-xl
                         shadow-md cursor-pointer
                         transition-transform duration-200 hover:scale-110 hover:shadow-lg"
            >
              {userData.name.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              className="border border-red-400 text-red-400 px-4 py-2 rounded-full 
                         transition-all duration-300 hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="flex items-center border border-gray-400 rounded-full px-6 py-2 text-gray-400 transition-all duration-300 ease-in-out hover:text-gray-50 hover:border-gray-50"
          >
            Login
          </button>
        )}
       
    </div>
  )
}

export default Navbar