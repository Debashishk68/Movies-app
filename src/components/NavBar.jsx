import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FiMenu, FiX } from 'react-icons/fi';

import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleSearch = (query) => {
    console.log('Search query:', query);
    navigate(`/search/${query}`); 
    // TODO: Add your search logic here, e.g., navigate to results or filter items
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <FiMenu className="h-6 w-6" />
              </button>
            </div>

            {/* Brand */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">tMovies</h1>
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="/" className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="/movies" className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium">Movies</a>
              <a href="/tv-series" className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium">TV Series</a>
            </div>
          </div>

          {/* Right side controls: Search + Theme Toggle */}
          <div className="flex items-center space-x-4">
            <SearchBar onSearch={handleSearch} className="hidden md:flex w-64" />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile menu dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="md:hidden">
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button onClick={() => setIsOpen(false)} className="ml-1 flex items-center justify-center h-10 w-10 rounded-full">
                <FiX className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto px-2 space-y-1">
              <nav>
                <a href="/" className="text-gray-900 dark:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
                <a href="/movies" className="text-gray-900 dark:text-white block px-3 py-2 rounded-md text-base font-medium">Movies</a>
                <a href="/tv-series" className="text-gray-900 dark:text-white block px-3 py-2 rounded-md text-base font-medium">TV Series</a>
              </nav>
              {/* Mobile SearchBar inside menu */}
              <div className="mt-4">
                <SearchBar onSearch={handleSearch} />
              </div>
              {/* Mobile ThemeToggle can be added here if desired */}
            </div>
          </div>
        </div>
      </Dialog>
    </nav>
  );
};

export default Navbar;
