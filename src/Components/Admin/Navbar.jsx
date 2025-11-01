import React, { useState, useContext } from "react";
import { Menu, X } from "lucide-react";
import { DataContext } from "../../Context/DataContext";
import { Link } from "react-router-dom"; // ✅ import Link

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useContext(DataContext);

  return (
    <nav className="bg-gradient-to-r from-[#0a0022] to-[#010101] shadow-lg px-6 py-4 flex items-center justify-between border-b border-cyan-500/40">
      {/* Logo/Title */}
      <div className="text-2xl font-extrabold text-cyan-400 drop-shadow-[0_0_10px_#00ffff]">
        Admin Panel
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 text-cyan-300 font-medium">
        <Link to="/admin/adminHome" className="hover:text-cyan-600 transition duration-300">
          Dashboard
        </Link>
        <Link to="/admin/ViewProducts" className="hover:text-cyan-600 transition duration-300">
          Products
        </Link>
        <Link to="/admin/ViewOrders" className="hover:text-cyan-600 transition duration-300">
          Orders
        </Link>
        <Link to="/admin/ViewUsers" className="hover:text-cyan-600 transition duration-300">
          Customers
        </Link>
      </div>

      {/* Buttons */}
      <div className="hidden md:flex space-x-3">
        <button className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-xl hover:bg-cyan-500/30 transition duration-300">
          Admin
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/30 transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-cyan-400">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0a0022] border-t border-cyan-500/40 shadow-lg flex flex-col space-y-4 px-6 py-4 md:hidden z-50">
          <Link to="/admin/adminHome" className="hover:text-cyan-400 transition duration-300" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link to="/admin/ViewProducts" className="hover:text-cyan-400 transition duration-300" onClick={() => setIsOpen(false)}>
            Products
          </Link>
          <Link to="/admin/ViewOrders" className="hover:text-cyan-400 transition duration-300" onClick={() => setIsOpen(false)}>
            Orders
          </Link>
          <Link to="/admin/ViewUsers" className="hover:text-cyan-400 transition duration-300" onClick={() => setIsOpen(false)}>
            Customers
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/30 transition duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
