import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <div>
      <Toaster />
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout