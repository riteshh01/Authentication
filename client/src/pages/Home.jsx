import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Header from '../components/Header.jsx'
import Loader from '../components/Loader.jsx'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className='py-58'>
        <Header/>
      </div>
    </div>
  )
}

export default Home  