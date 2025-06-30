import { useContext, useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import './App.css'
import { DataContext } from './Context/DataContext'
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';



function App() {
  const {loading, isAuthenticated, setIsAuthenticated} = useContext(DataContext);

  return (
  <>
  <Routes>

    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
  </Routes>
   
  </>
  )
}

export default App
