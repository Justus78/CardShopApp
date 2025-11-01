import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const AdminDashboard = () => {
  return (
    <>
      <Navbar />

      {/* Dashboard start */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white py-12 px-6">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 drop-shadow-lg">
          ⚡ Admin Dashboard ⚡
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Dashboard cards */}
          {[
            { to: '/admin/viewProducts', label: 'View Products' },
            { to: '/admin/AddProduct', label: 'Add Product' },
            { to: '/admin/ViewOrders', label: 'Orders' },
            { to: '/admin/ViewUsers', label: 'Customers' },
          ].map((item, index) => (
            <Link key={index} to={item.to} className="block">
              <div className="relative group bg-gray-900 bg-opacity-60 border border-gray-800 rounded-2xl p-8 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-purple-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-lg transition duration-500"></div>
                <p className="text-xl font-semibold text-center text-purple-300 group-hover:text-cyan-300 drop-shadow-sm">
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Neon divider */}
        <div className="mt-16 text-center">
          <div className="w-48 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full shadow-lg shadow-cyan-400/30"></div>
          <p className="mt-4 text-gray-400 text-sm tracking-wide">
            Manage products, orders, and users with ease ⚙️
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
