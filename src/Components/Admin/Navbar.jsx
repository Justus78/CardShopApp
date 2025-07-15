import React, { useState, useContext } from "react";
import { Menu, X } from "lucide-react"; // Optional: replace with Heroicons or SVGs
import { DataContext } from "../../Context/DataContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { handleLogout } = useContext(DataContext);

  return (
    <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Logo/Title */}
      <div className="text-2xl font-bold text-blue-600">Admin Panel</div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <a href="#" className="hover:text-blue-600 transition">Dashboard</a>
        <a href="#" className="hover:text-blue-600 transition">Products</a>
        <a href="#" className="hover:text-blue-600 transition">Orders</a>
        <a href="#" className="hover:text-blue-600 transition">Customers</a>
      </div>

      {/* Profile Placeholder */}
      <div className="hidden md:block">
        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition">
          Admin
        </button>
        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition" onClick={handleLogout}>
          Logout
        </button>

      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col space-y-4 px-6 py-4 md:hidden z-50">
          <a href="#" className="hover:text-blue-600 transition">Dashboard</a>
          <a href="#" className="hover:text-blue-600 transition">Products</a>
          <a href="#" className="hover:text-blue-600 transition">Orders</a>
          <a href="#" className="hover:text-blue-600 transition">Customers</a>
          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition">
            Admin
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
