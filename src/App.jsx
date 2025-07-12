import { useContext, useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import './App.css'
import { DataContext } from './Context/DataContext'
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import AdminHome from './Pages/Admin/AdminHome/AdminHome';
import ViewProducts from './Pages/Admin/Products/ViewProducts';



function App() {
  const {loading, isAuthenticated, setIsAuthenticated} = useContext(DataContext);

  return (
  <>
  <Routes>
    {/** user routes */}
    <Route path='/' element={isAuthenticated ? <Home /> : <Login />} />
    <Route path='/login' element={<Login />} />


    {/* routes for admin */}
    <Route path='/admin/adminHome' element={<AdminHome />} />
    <Route path='/admin/viewProducts' element={<ViewProducts />} />
  </Routes>
   
  </>
  )
}

export default App
