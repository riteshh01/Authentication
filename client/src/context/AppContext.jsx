import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';


export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const getAuthState = async () => {
        try {
           const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
           if (data.success) {
            setIsLoggedIn(true);
           } 
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getUserData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data')
            if (data.success) {
              setUserData(data.userData);
            } else {
              console.log('getUserData failed:', data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
      if (isLoggedIn) {
        getUserData();
      } else {
        setUserData(null);
      }
    }, [isLoggedIn]);

    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        getAuthState
    }

    useEffect(() => {
        if (backendUrl) {
          getAuthState();
        }
    },[]);
    
    return (
        <AppContent.Provider value={value}>
            {children}
        </AppContent.Provider>
    )
}