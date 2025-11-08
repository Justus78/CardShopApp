import React, { useState } from 'react'
import AuthForm from '../../../Components/User/AuthForm';
import Navbar from '../../../Components/User/Navbar';
import Footer from '../../../Components/User/Footer';

const Login = () => {
  return (
    <>
      <Navbar />
        <div className="flex items-center justify-center min-h-screen p-6 relative z-10">
          <AuthForm />
        </div>      
    </> 
 )
}

export default Login