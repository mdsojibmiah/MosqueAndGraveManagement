import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Committee from "./pages/Committee";
import Donation from "./pages/Donation";
import Expense from "./pages/Expense";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AddDonation from "./pages/admin/AddDonation";
import AddExpense from "./pages/admin/AddExpense";
import ManageCommittee from "./pages/admin/ManageCommittee";
import AllExpenses from "./pages/admin/AllExpenses";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/admin/ProtectedRoute";

/**
 * Layout for public pages – includes Navbar and padding.
 */
function Layout() {
  return (
    <>
      <Navbar />
      <main className="pt-20 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

/**
 * Wrapper to conditionally render public or admin routes
 * based on current pathname.
 */
function AppContent() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
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
        <Route
          path="/admin/donation/add"
          element={
            <ProtectedRoute>
              <AddDonation />
            </ProtectedRoute>
          }
        />
        <Route
        path="/admin/expense/add"
        element={
          <ProtectedRoute>
            <AddExpense />
          </ProtectedRoute>
        }
      />
      <Route
      path="/admin/manage-committee"
      element={
        <ProtectedRoute>
          <ManageCommittee />
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin/all-expenses"
      element={
        <ProtectedRoute>
          <AllExpenses />
        </ProtectedRoute>
      }
    />
      </Routes>
    );
  }

  return <Layout />;
}

/**
 * Main App Entry
 */
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
