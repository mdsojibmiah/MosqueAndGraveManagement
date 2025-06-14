// src/components/admin/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import {
  FaMosque,
  FaTachometerAlt,
  FaDonate,
  FaMoneyBillWave,
  FaUsersCog,
  FaMoneyCheckAlt,
  FaGlobe,
} from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const links = [
    { to: "/admin/dashboard", label: "ড্যাশবোর্ড", icon: <FaTachometerAlt /> },
    { to: "/admin/donation/add", label: "অনুদান যুক্ত করুন", icon: <FaDonate /> },
    { to: "/admin/expense/add", label: "খরচ যুক্ত করুন", icon: <FaMoneyBillWave /> },
    { to: "/admin/all-expenses", label: "খরচ তালিকা", icon: <FaMoneyCheckAlt /> },
    { to: "/admin/manage-committee", label: "কমিটি ম্যানেজ", icon: <FaUsersCog /> },
    { to: "/", label: "ওয়েবসাইটে ফিরে যান", icon: <FaGlobe /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        aria-label={isOpen ? "সাইডবার বন্ধ করুন" : "সাইডবার খুলুন"}
        className="md:hidden fixed top-2 right-5 z-30 bg-green-700 p-2 rounded shadow-md text-white hover:bg-green-600 transition"
      >
        {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-20 h-screen w-64 bg-green-800 p-6 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        aria-label="Admin Sidebar Navigation"
      >
        <div>
          <h2 className="mb-10 flex items-center gap-2 text-2xl font-bold select-none">
            <FaMosque className="text-white" /> <span>Admin Panel</span>
          </h2>

          <nav className="flex flex-col space-y-4 text-lg font-medium">
            {links.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2 rounded px-2 py-1 hover:text-yellow-300 transition"
                onClick={() => setIsOpen(false)} // Auto-close on mobile
              >
                {icon} {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded text-white mt-6"
        >
          Logout
        </button>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-30 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
