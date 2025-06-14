import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "123456") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("❌ ভুল ইমেইল অথবা পাসওয়ার্ড!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-green-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-6">
          🛡️ অ্যাডমিন লগইন
        </h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded-md px-4 py-2 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ইমেইল
            </label>
            <div className="flex items-center px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-green-300">
              <FaEnvelope className="text-green-600 mr-2" />
              <input
                type="email"
                placeholder="admin@gmail.com"
                className="w-full bg-transparent outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              পাসওয়ার্ড
            </label>
            <div className="flex items-center px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-green-300">
              <FaLock className="text-green-600 mr-2" />
              <input
                type="password"
                placeholder="********"
                className="w-full bg-transparent outline-none text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            লগইন করুন
          </button>
        </form>
      </div>
    </div>
  );
}
