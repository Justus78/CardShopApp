import { useContext, useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import './App.css'
import { DataContext } from './Context/DataContext'
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import AdminHome from './Pages/Admin/AdminHome/AdminHome';



function App() {
  const {loading, isAuthenticated, setIsAuthenticated} = useContext(DataContext);

  return (
  <>
  <Routes>
    <Route path='/' element={isAuthenticated ? <Home /> : <Login />} />
    <Route path='/login' element={<Login />} />

    <Route path='/adminHome' element={<AdminHome />} />
  </Routes>
   
  </>
  )
}

export default App
