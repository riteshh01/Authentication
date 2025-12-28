import React, { useContext, useState } from 'react'
import axios from 'axios'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';


const Login = () => {

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent)
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
      e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      if (state === 'Sign Up') {
        if (!name.trim()) {
          return toast.error('Name is required');
        }

        const { data } = await axios.post(
          backendUrl + '/api/auth/register',
          { name, email, password }
        );

        if (data.success) {
          toast.success('Account created successfully');
          setIsLoggedIn(true);
          // getUserData();
          navigate('/');
        } else {
          toast.error(error.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })

        if (data.success) {
          toast.success('Account Login Successfully');
          setIsLoggedIn(true)
          // getUserData();
          navigate('/')
        }
        else {
          toast.error(error.message);
        }
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-black border border-gray-700 rounded-xl p-8 space-y-6">

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-gray-400 text-sm">
            {state === 'Sign Up'
              ? 'Create your account to get started'
              : 'Login to your account'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">

          {state === 'Sign Up' && (
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-white placeholder-gray-400
                border border-gray-600 focus:border-white focus:outline-none
                px-4 py-3 rounded-md"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-400
              border border-gray-600 focus:border-white focus:outline-none
              px-4 py-3 rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-400
              border border-gray-600 focus:border-white focus:outline-none
              px-4 py-3 rounded-md"
          />

          {state === 'Login' && (
            <div className="text-right">
              <button
                onClick={() => navigate('/reset-password')}
                type="button"
                className="text-sm text-blue-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 
              text-white py-3 rounded-lg font-semibold
              hover:from-blue-600 hover:to-indigo-600"
            >
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>

        </form>

        <div className="text-center text-sm text-gray-400">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <button
                className="text-blue-400 hover:underline"
                onClick={() => setState('Login')}
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <button
                className="text-blue-400 hover:underline"
                onClick={() => setState('Sign Up')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default Login