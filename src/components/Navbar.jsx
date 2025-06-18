// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/images/l2.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // মোবাইল মেনু খোলা থাকলে স্ক্রল বন্ধ রাখার জন্য
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const navLinks = [
    { name: "হোম", path: "/" },
    { name: "কমিটি", path: "/committee" },
    { name: "অনুদান", path: "/donation" },
    { name: "খরচ", path: "/expense" },
    { name: "যোগাযোগ", path: "/contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 shadow-md"
      style={{
        background: "linear-gradient(90deg, #0f172a, #15263b)", // subtle dark blue gradient
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* লোগো */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide select-none hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={logo}
              alt="মসজিদ লোগো"
              className="h-10 w-10 object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 font-semibold text-lg">
            {navLinks.map(({ name, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={name}
                  to={path}
                  className={`relative px-3 py-1 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "text-yellow-400 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-yellow-400"
                      : "text-white hover:text-yellow-300"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-3xl p-1 rounded text-white hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-max-height duration-300 ease-in-out ${
          menuOpen ? "max-h-screen bg-gradient-to-b from-[#0b1120] to-[#0f172a]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-4 pt-4 pb-6 space-y-3">
          {navLinks.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`block text-lg font-semibold py-2 px-3 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "text-yellow-400 bg-green-900"
                    : "text-white hover:text-yellow-300 hover:bg-green-900"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
