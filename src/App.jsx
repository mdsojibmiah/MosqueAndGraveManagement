import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Home from "./pages/Home";
import Committee from "./pages/Committee";
import Donation from "./pages/Donation";
import Expense from "./pages/Expense";
import Contact from "./pages/Contact";
import MosqueDonation from "./pages/admin/MosqueDonation";

// Navbar কে conditionally দেখানোর জন্য একটা Wrapper component
function Layout() {
  const location = useLocation();

  // যদি url path /admin দিয়ে শুরু হয় তাহলে Navbar দেখাবে না
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="pt-20 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/mosque-donation" element={<MosqueDonation />} />
          {/* ProtectedRoute আর AdminRoute গুলো এখানে রাখো না */}
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      {/* Layout component শুধু public পেজের জন্য */}
      <Layout />

      {/* Admin এর route গুলো আলাদা */}
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
