import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-customYellow p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or Brand Name */}
        <div className="text-gray-800 text-xl font-semibold">
          <Link to="/">MyApp</Link>
        </div>
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="text-gray-800 md:hidden focus:outline-none"
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
        {/* Navigation Links */}
        <ul
          className={`md:flex md:space-x-4 absolute md:relative top-0 right-0 mt-2 md:mt-0 bg-customYellow md:bg-transparent md:flex-row flex-col md:space-x-0 space-y-4 md:space-y-0 md:p-0 p-4 md:opacity-100 transition-transform duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <Link
              to="/"
              className="text-gray-800 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="text-gray-800 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="text-gray-800 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
