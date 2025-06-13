// src/components/admin/Header.jsx
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <header className="w-full md:w-[calc(100%-16rem)] bg-white shadow-md py-4 px-6 fixed top-0 left-0 md:left-64 z-20 flex justify-between items-center">
      <div className="text-xl font-semibold text-green-800">
        Welcome Admin
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
      >
        Logout
      </button>
    </header>
  );
}
