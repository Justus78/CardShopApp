import React, { useState, useContext } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { DataContext } from "../../Context/DataContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mtgOpen, setMtgOpen] = useState(false);
  const { handleLogout, isAuthenticated, user } = useContext(DataContext);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#0b0130]/80 border-b border-cyan-500/20 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
      {/* --- TOP BAR --- */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_#0ff]">
          ⚡ Card Shop
        </h1>

        {/* Search + Auth + Cart */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="hidden sm:block w-48 px-4 py-2 rounded-lg bg-[#0f022c]/70 border border-cyan-600/40 text-cyan-100 placeholder-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
          />

          {/* Auth Display */}
          {isAuthenticated ? (
            <p className="text-cyan-300 font-semibold text-lg">
              Welcome,&nbsp;
              <span className="text-fuchsia-400">{user?.userName || "User"}</span>
            </p>
          ) : (
            <a
              href="/login"
              className="bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white px-4 py-2 rounded-lg hover:shadow-[0_0_15px_#0ff] transition-all duration-300"
            >
              Login
            </a>
          )}

          {/* Cart */}
          <a href="/userCart" className="relative">
            <ShoppingCart className="w-6 h-6 text-cyan-300 hover:text-fuchsia-400 transition" />
            <span className="absolute -top-2 -right-2 bg-fuchsia-500 text-white text-xs px-1 rounded-full">
              0
            </span>
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-cyan-300 hover:text-fuchsia-400 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* --- BOTTOM LINKS BAR --- */}
      <div className="hidden md:flex items-center justify-center gap-10 py-3 border-t border-cyan-600/20 bg-[#080024]/60">
        {/* Magic Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setMtgOpen(true)}
          onMouseLeave={() => setMtgOpen(false)}
        >
          <a href="user/viewProducts">
            <span className="cursor-pointer text-xl text-cyan-300 hover:text-fuchsia-400 transition-all">
              Magic: The Gathering
            </span>

            <div>
              {mtgOpen && (
                <div                
                  className="absolute left-0 mt-3 w-56 rounded-xl bg-[#0f022c]/90 border border-cyan-600/40 shadow-[0_0_20px_rgba(255,0,255,0.2)] backdrop-blur-lg"
                >
                  {["Singles", "Boosters", "Decks", "Accessories"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-5 py-2 text-cyan-200 hover:bg-gradient-to-r hover:from-cyan-700/30 hover:to-fuchsia-700/30 hover:text-fuchsia-300 transition-all duration-300"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </a>
        </div>

        <Link to="" className="text-xl text-cyan-300 hover:text-fuchsia-400 transition-all">
            <p>BestSellers</p>
        </Link>

        <Link to="" className="text-xl text-cyan-300 hover:text-fuchsia-400 transition-all">
            <p>My Orders</p>
        </Link>

        <a href='/userTrade' className="text-xl text-cyan-300 hover:text-fuchsia-400 transition-all">
            <p>Trade</p>
        </a>

        <Link to="" className="text-xl text-cyan-300 hover:text-fuchsia-400 transition-all">
            <p>About</p>
        </Link>

        

        {/* Logout */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white px-4 py-2 rounded-lg hover:shadow-[0_0_15px_#0ff] transition-all duration-300"
          >
            Logout
          </button>
        )}
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden flex flex-col space-y-3 px-6 py-4 border-t border-cyan-600/30 bg-[#0f022c]/90 backdrop-blur-xl text-cyan-200"
          >
            {["Magic: The Gathering", "Bestsellers", "My Orders", "About"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="hover:text-fuchsia-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </a>
              )
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="mt-2 bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white px-4 py-2 rounded-lg hover:shadow-[0_0_15px_#0ff] transition-all duration-300"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
