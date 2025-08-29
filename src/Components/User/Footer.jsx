import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand / Logo */}
        <div>
          <h2 className="text-xl font-bold text-white">CardVault</h2>
          <p className="mt-2 text-sm">
            Your trusted marketplace for Magic: The Gathering cards. 
            Buy, sell, and trade securely with collectors worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/sets" className="hover:text-white">Sets</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/shipping" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} CardVault. All rights reserved.</p>
        <p className="mt-1">Not affiliated with Wizards of the Coast or Hasbro.</p>
      </div>
    </footer>
  );
};

export default Footer;
