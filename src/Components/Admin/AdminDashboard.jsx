import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const AdminDashboard = () => {
  return (
    <>
      <Navbar />

      {/* Dashboard start */}
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Column one */}
          <div className="space-y-4">
           
            <Link to="/admin/viewProducts" className="block">
              <div className="bg-white p-6 rounded-2xl shadow hover:bg-gray-50 transition cursor-pointer">
                <p className="text-lg font-semibold text-gray-700">See Products</p>
              </div>
            </Link>

            <Link to="/admin/AddProduct" className="block">
              <div className="bg-white p-6 rounded-2xl shadow hover:bg-gray-50 transition cursor-pointer">
                <p className="text-lg font-semibold text-gray-700">Add Product</p>
              </div>
            </Link>

            <Link to="/admin/orders" className="block">
              <div className="bg-white p-6 rounded-2xl shadow hover:bg-gray-50 transition cursor-pointer">
                <p className="text-lg font-semibold text-gray-700">Orders</p>
              </div>
            </Link>

            <Link to="/admin/customers" className="block">
              <div className="bg-white p-6 rounded-2xl shadow hover:bg-gray-50 transition cursor-pointer">
                <p className="text-lg font-semibold text-gray-700">Customers</p>
              </div>
            </Link>
          </div>

          {/* Column two */}
          <div className="space-y-4">
           
            <Link to="/admin/products" className="block">
              <div className="bg-white p-6 rounded-2xl shadow hover:bg-gray-50 transition cursor-pointer">
                <p className="text-lg font-semibold text-gray-700">See Products</p>
              </div>
            </Link>

            <Link to="/admin/add-product" className="block">
              <div className="bg-white p-6 rounded-2xl shadow hover:bg-gray-50 transition cursor-pointer">
                <p className="text-lg font-semibold text-gray-700">Add Product</p>
              </div>
            </Link>

            <Link to="/admin/orders" className="block">
              <div className="bg-white p-6 rounded-2xl shadow hover:bg-gray-50 transition cursor-pointer">
                <p className="text-lg font-semibold text-gray-700">Orders</p>
              </div>
            </Link>

            <Link to="/admin/customers" className="block">
              <div className="bg-white p-6 rounded-2xl shadow hover:bg-gray-50 transition cursor-pointer">
                <p className="text-lg font-semibold text-gray-700">Customers</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
