import React, { useState, useContext } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { DataContext } from "../../Context/DataContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useContext(DataContext);

  return (
    <nav className="shadow">
      {/* --- TOP BAR --- */}
      <div className="flex items-center justify-between px-6 py-3 border-b bg-blue-700">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">Card Shop</div>

        {/* Right Side: Search, Login, Cart */}
        <div className="flex items-center space-x-30">
          {/* Search placeholder */}
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-2xl px-5 py-1 text-md focus:outline-none focus:ring focus:ring-blue-300 bg-white"
          />

          {/* Login button placeholder */}
          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition">
            Login
          </button>

          {/* Cart icon */}
          <a href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-white hover:text-blue-600 transition" />
            {/* Example cart count badge */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              0
            </span>
          </a>
        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="px-6 py-3 flex items-center justify-between bg-blue-500">
        {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium relative">
        {/* Magic the Gathering with dropdown */}
        <div className="relative group">
          <a
            href="/User/viewProducts"
            className="text-white transition text-2xl"
          >
            Magic: The Gathering
          </a>
          {/* Dropdown menu */}
          <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-200 z-50">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Singles
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Boosters
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Decks
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Accessories
            </a>
          </div>
        </div>

  {/* Other Links */}
  <a href="#" className="text-white transition text-2xl">
    Bestsellers
  </a>
  <a href="#" className="text-white transition text-2xl">
    My Orders
  </a>
  <a href="#" className="text-white transition text-2xl">
    About
  </a>
</div>


        {/* Desktop Logout */}
        <div className="hidden md:block">
          <button
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {isOpen && (
        <div className="absolute top-[112px] left-0 w-full bg-white shadow-md flex flex-col space-y-4 px-6 py-4 md:hidden z-50">
          <a
            href="#"
            className="hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Magic: The Gathering
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Bestsellers
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            My Orders
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>

          <div className="md:block">
            <button
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition"
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
