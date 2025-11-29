import React from 'react'
import Navbar from '../../../Components/User/Navbar';
import Footer from '../../../Components/User/Footer'
import ScryfallSearch from '../../../Components/User/ScryfallSearch';

export const AddTradeIn = () => {
  return (
   <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white p-6">
        <Navbar />
        <ScryfallSearch />
      </div>
    </>
  )
}

export default AddTradeIn;
