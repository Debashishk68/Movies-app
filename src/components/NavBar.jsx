import { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'; // Added icons for hamburger menu and close button

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // State for managing the mobile menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-80 flex items-center justify-between px-6 py-4 z-50 shadow-lg transition-all">
      {/* Brand Name */}
      <a href="/" className="text-white text-2xl font-semibold hover:text-red-500 transition">
        PopKorn Explorer
      </a>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-white text-lg font-medium">
        <li><a href="/" className="hover:text-red-500 transition">Home</a></li>
        <li><a href="/about" className="hover:text-red-500 transition">About</a></li>
        <li><a href="/services" className="hover:text-red-500 transition">Services</a></li>
        <li><a href="/blog" className="hover:text-red-500 transition">Blog</a></li>
        <li><a href="/contact" className="hover:text-red-500 transition">Contact</a></li>
      </ul>

      {/* Search Box */}
      <div className="relative flex items-center">
        {showSearch ? (
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setShowSearch(false)}
            autoFocus
            className="px-4 py-2 text-white w-48 sm:w-64 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out"
          />
        ) : (
          <FaSearch
            size={24}
            className="text-white cursor-pointer hover:text-red-500 transition"
            onClick={() => setShowSearch(true)}
          />
        )}
      </div>

      {/* Mobile Hamburger Menu Icon */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-80 flex justify-center items-center ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="absolute top-4 right-4">
          <button onClick={toggleMenu} className="text-white text-2xl">
            <FaTimes />
          </button>
        </div>
        <ul className="space-y-6 text-white text-lg font-medium">
          <li><a href="/" className="hover:text-red-500 transition" onClick={toggleMenu}>Home</a></li>
          <li><a href="/about" className="hover:text-red-500 transition" onClick={toggleMenu}>About</a></li>
          <li><a href="/services" className="hover:text-red-500 transition" onClick={toggleMenu}>Services</a></li>
          <li><a href="/blog" className="hover:text-red-500 transition" onClick={toggleMenu}>Blog</a></li>
          <li><a href="/contact" className="hover:text-red-500 transition" onClick={toggleMenu}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
