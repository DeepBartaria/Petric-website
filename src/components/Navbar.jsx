import { NavLink } from 'react-router-dom';
import { useState } from 'react';
// import logo from '../assets/logo.svg';
import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Pet Products', path: '/products' },
  { name: 'Our Story', path: '/story' },
  { name: 'About Us', path: '/about' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6">
      <nav className="w-full max-w-7xl bg-white/30 backdrop-blur-md rounded-full shadow-lg flex items-center px-6 sm:px-8 py-3">

        {/* Logo (Left, takes available space so center is truly centered) */}
        <div className="flex-1 flex items-center justify-start">
          <a href="/">
            <img src={logo} alt="logo" className="h-14 sm:h-16 xl:h-20 object-contain" />
          </a>
        </div>

        {/* Desktop Nav Links (Center) */}
        <ul className="hidden lg:flex items-center justify-center gap-8">
          {navLinks.map(link => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-base font-semibold px-2 py-1 transition-colors ${isActive ? 'text-black border-b-2 border-yellow-400' : 'text-gray-700 hover:text-black'}`
                }
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Action Buttons (Right) */}
        <div className="flex-1 hidden lg:flex items-center justify-end gap-3">
          <NavLink
            to="/contactus"
            className="bg-white hover:bg-gray-50 text-black px-6 py-2.5 rounded-full font-bold transition-all shadow-sm transform hover:scale-105"
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/download"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2.5 rounded-full font-bold transition-all shadow-sm transform hover:scale-105"
          >
            Download App
          </NavLink>
        </div>

        {/* Mobile Menu Button - Align right on mobile */}
        <div className="lg:hidden flex items-center justify-end flex-1">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full text-gray-700 hover:text-black hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-4 right-4 mt-3 bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden lg:hidden z-50">
            <ul className="flex flex-col py-3">
              {navLinks.map(link => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block text-base font-semibold px-8 py-3 transition-colors ${isActive ? 'text-black bg-yellow-50 border-l-4 border-yellow-400' : 'text-gray-800 hover:text-black hover:bg-gray-50'}`
                    }
                    end={link.path === '/'}
                    onClick={closeMobileMenu}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              <li className="px-6 pt-3 pb-2 mt-2 border-t border-white/30 flex flex-col gap-3">
                <NavLink
                  to="/contactus"
                  className="block text-center bg-white hover:bg-gray-50 text-black px-6 py-3 rounded-full font-bold transition-all shadow-sm"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </NavLink>
                <NavLink
                  to="/download"
                  className="block text-center bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-bold transition-all shadow-sm"
                  onClick={closeMobileMenu}
                >
                  Download App
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
} 