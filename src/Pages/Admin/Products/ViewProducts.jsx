import React from 'react'
import Navbar from '../../../Components/Admin/Navbar'
import { Link } from 'react-router-dom'

const ViewProducts = () => {
  return (
    <div>
        <Navbar />
        {/** need a complete product dashboard
         * shows all products with filters to see what has been sold
         * what is now out of stock
         * 
         * need button to go to page to add products
         * 
         * 
         *              components needed: 
         *    comp to be used for each individual product
         *    
         */}
         <Link
          to="/admin/AddProduct"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Product
        </Link>
    </div>
  )
}

export default ViewProducts