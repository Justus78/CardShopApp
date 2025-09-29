import React, { useState } from 'react'
import AuthForm from '../../../Components/User/AuthForm';
import Navbar from '../../../Components/User/Navbar';
import Footer from '../../../Components/User/Footer';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Navbar />
      <AuthForm />
      
    </> 
 )
}

export default Login