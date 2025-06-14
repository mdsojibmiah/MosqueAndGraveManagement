// src/pages/admin/AllExpenses.jsx

import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import ExpenseList from "../../components/admin/ExpenseList";
import { FaMoneyCheckAlt } from "react-icons/fa";

export default function AllExpenses() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

<main className="flex-1 flex items-center justify-center mx-auto px-4 py-8">
  <div className="w-full max-w-6xl">
    <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
      <FaMoneyCheckAlt className="text-green-700" />
      সকল খরচ তালিকা
    </h2>
    <ExpenseList />
  </div>
</main>

      </div>
    </div>
  );
}
