// src/components/admin/Sidebar.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-20 right-5 z-30 text-white bg-green-700 p-2 rounded shadow-md"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-green-800 text-white p-6 z-20 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-2">
          🕌 <span>Admin Panel</span>
        </h2>

        <nav className="space-y-4 text-lg font-medium">
          <Link to="/admin/dashboard" className="block hover:text-yellow-300 transition">
            🏠 ড্যাশবোর্ড
          </Link>
          <Link to="../../pages/admin/MosqueDonation.jsx" className="block hover:text-yellow-300 transition">
            ➕ অনুদান যুক্ত করুন
          </Link>
          <Link to="/admin/add-expense" className="block hover:text-yellow-300 transition">
            ➖ খরচ যুক্ত করুন
          </Link>
          <Link to="/admin/manage-committee" className="block hover:text-yellow-300 transition">
            👥 কমিটি ম্যানেজ
          </Link>
          <Link to="/" className="block hover:text-yellow-300 transition">
            🌐 ওয়েবসাইটে ফিরে যান
          </Link>
        </nav>
      </div>

      {/* Overlay (only for mobile when open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
