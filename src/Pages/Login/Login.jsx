import React, { useState } from 'react'
import AuthForm from '../../Components/AuthForm';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Navbar />
      <AuthForm />
      <Footer />
    </> 
 )
}

export default Login