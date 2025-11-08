import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b0130]/80 backdrop-blur-lg border-t border-cyan-600/20 shadow-[0_0_25px_rgba(0,255,255,0.3)] text-cyan-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_#0ff]">
            ⚡ CardVault
          </h2>
          <p className="mt-2 text-sm text-cyan-200/80">
            Your trusted marketplace for Magic: The Gathering cards. 
            Buy, sell, and trade securely with collectors worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-cyan-400">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/shop" className="hover:text-fuchsia-400 transition-all">Shop</a></li>
            <li><a href="/sets" className="hover:text-fuchsia-400 transition-all">Sets</a></li>
            <li><a href="/about" className="hover:text-fuchsia-400 transition-all">About Us</a></li>
            <li><a href="/contact" className="hover:text-fuchsia-400 transition-all">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-cyan-400">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-fuchsia-400 transition-all">FAQ</a></li>
            <li><a href="/shipping" className="hover:text-fuchsia-400 transition-all">Shipping & Returns</a></li>
            <li><a href="/privacy" className="hover:text-fuchsia-400 transition-all">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-fuchsia-400 transition-all">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-cyan-400">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-fuchsia-400 transition-all"><FaFacebook /></a>
            <a href="#" className="hover:text-fuchsia-400 transition-all"><FaTwitter /></a>
            <a href="#" className="hover:text-fuchsia-400 transition-all"><FaInstagram /></a>
            <a href="#" className="hover:text-fuchsia-400 transition-all"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-cyan-600/20 mt-8 pt-4 text-center text-sm text-cyan-300/70 space-y-1">
        <p>&copy; {new Date().getFullYear()} CardVault. All rights reserved.</p>
        <p>
          Magic: The Gathering and its respective properties are © Wizards of the Coast LLC. 
          This website is unofficial fan content permitted under the Wizards Fan Content Policy. 
          Not approved/endorsed by Wizards.
        </p>
        <p>
          Card images courtesy of{" "}
          <a
            href="https://scryfall.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-fuchsia-400 transition-all"
          >
            Scryfall
          </a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
