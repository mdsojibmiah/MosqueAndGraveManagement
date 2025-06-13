import { useState, useRef } from "react";
import { FiDownload, FiSearch } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: "বিদ্যুৎ বিল",
      amount: 1500,
      date: "2025-06-12",
      note: "মাসিক বিল",
    },
    {
      id: 2,
      category: "সাফাইকর্মীর বেতন",
      amount: 3000,
      date: "2025-06-10",
      note: "জুন মাস",
    },
  ]);

  const [filters, setFilters] = useState({
    date: "",
    category: "",
    minAmount: "",
    maxAmount: "",
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Khorocher Talika",
  });

  const filteredExpenses = expenses.filter((expense) => {
    const matchDate = filters.date ? expense.date === filters.date : true;
    const matchCategory = filters.category
      ? expense.category.includes(filters.category)
      : true;
    const matchMin = filters.minAmount
      ? expense.amount >= parseFloat(filters.minAmount)
      : true;
    const matchMax = filters.maxAmount
      ? expense.amount <= parseFloat(filters.maxAmount)
      : true;

    return matchDate && matchCategory && matchMin && matchMax;
  });

  const totalExpense = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-green-700 text-center sm:text-left">
          📋 খরচের তালিকা
        </h2>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
        >
          <FiDownload />
          PDF ডাউনলোড
        </button>
      </div>

      {/* Summary */}
      <div className="text-right font-semibold text-gray-700 mb-4">
        মোট খরচ: <span className="text-green-800">৳ {totalExpense}</span>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="border p-2 rounded text-sm"
        />
        <input
          type="text"
          placeholder="ক্যাটাগরি লিখুন"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2 rounded text-sm"
        />
        <input
          type="number"
          placeholder="সর্বনিম্ন পরিমাণ"
          value={filters.minAmount}
          onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
          className="border p-2 rounded text-sm"
        />
        <input
          type="number"
          placeholder="সর্বোচ্চ পরিমাণ"
          value={filters.maxAmount}
          onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
          className="border p-2 rounded text-sm"
        />
      </div>

      {/* Table */}
      <div ref={componentRef}>
        <div className="w-full flex justify-center">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-green-100 text-left text-sm text-gray-700">
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">বিভাগ</th>
                <th className="py-2 px-4 border">পরিমাণ (৳)</th>
                <th className="py-2 px-4 border">তারিখ</th>
                <th className="py-2 px-4 border">নোট</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, index) => (
                <tr key={expense.id} className="hover:bg-green-50 text-sm">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{expense.category}</td>
                  <td className="py-2 px-4 border">৳ {expense.amount}</td>
                  <td className="py-2 px-4 border">{expense.date}</td>
                  <td className="py-2 px-4 border">{expense.note}</td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    কোনও খরচ পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
