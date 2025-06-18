import { useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";

export default function ExpenseList() {
  const [mosqueExpenses, setMosqueExpenses] = useState([
    { id: 1, category: "বিদ্যুৎ বিল", amount: 1500, date: "2025-06-12", note: "মাসিক বিল" },
    { id: 2, category: "সাফাইকর্মীর বেতন", amount: 3000, date: "2025-06-10", note: "জুন মাস" },
  ]);
  const [graveyardExpenses, setGraveyardExpenses] = useState([
    { id: 1, category: "বাঁধাই খরচ", amount: 2500, date: "2025-06-11", note: "কবরসাজানোর খরচ" },
    { id: 2, category: "জলবাহী ব্যয়", amount: 1200, date: "2025-06-09", note: "সাফাইয়ের জন্য" },
  ]);

  const [mosqueFilters, setMosqueFilters] = useState({ date: "", category: "", minAmount: "", maxAmount: "" });
  const [graveyardFilters, setGraveyardFilters] = useState({ date: "", category: "", minAmount: "", maxAmount: "" });
  const [activeTab, setActiveTab] = useState("mosque");

  const mosqueRef = useRef();
  const graveyardRef = useRef();

  const handlePrintMosque = useReactToPrint({
    content: () => mosqueRef.current,
    documentTitle: "Mosque Expense Report",
  });
  const handlePrintGraveyard = useReactToPrint({
    content: () => graveyardRef.current,
    documentTitle: "Graveyard Expense Report",
  });

  const filterExpenses = (expenses, filters) => {
    return expenses.filter((expense) => {
      const matchDate = filters.date ? expense.date === filters.date : true;
      const matchCategory = filters.category ? expense.category.includes(filters.category) : true;
      const matchMin = filters.minAmount ? expense.amount >= parseFloat(filters.minAmount) : true;
      const matchMax = filters.maxAmount ? expense.amount <= parseFloat(filters.maxAmount) : true;
      return matchDate && matchCategory && matchMin && matchMax;
    });
  };

  const filteredMosqueExpenses = filterExpenses(mosqueExpenses, mosqueFilters);
  const filteredGraveyardExpenses = filterExpenses(graveyardExpenses, graveyardFilters);

  const totalMosqueExpense = filteredMosqueExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalGraveyardExpense = filteredGraveyardExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // 👉 Reusable Table Component (no scroll, fully responsive)
  const ExpenseTable = ({ data, refProp }) => (
    <section className="w-full py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg mb-20">
    <div ref={refProp} className="w-full">
      <table className="w-full table-fixed border border-gray-300 text-sm sm:text-base">
        <thead className="bg-green-100 text-gray-700">
          <tr>
            <th className="border p-2 w-6 sm:w-12">#</th>
            <th className="border p-2">বিভাগ</th>
            <th className="border p-2">পরিমাণ (৳)</th>
            <th className="border p-2">তারিখ</th>
            <th className="border p-2">নোট</th>
          </tr>
        </thead>
        <tbody>
          {data.map((expense, index) => (
            <tr key={expense.id} className="hover:bg-green-50">
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{expense.category}</td>
              <td className="border p-2">৳ {expense.amount}</td>
              <td className="border p-2">{expense.date}</td>
              <td className="border p-2">{expense.note}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                কোনও খরচ পাওয়া যায়নি।
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </section>
  );

  return (
<div className="pt-24 sm:pt-32 md:pt-44 px-4 sm:px-8 md:px-16 min-h-screen bg-gradient-to-b from-[#ecfdf5] to-[#d1fae5]">

      {/* Tab Buttons */}
      <div className="flex justify-center mb-6 gap-4 flex-wrap">
        <button
          onClick={() => setActiveTab("mosque")}
          className={`px-6 py-2 rounded font-semibold ${
            activeTab === "mosque" ? "bg-green-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-green-100"
          }`}
        >
          মসজিদের খরচ
        </button>
        <button
          onClick={() => setActiveTab("graveyard")}
          className={`px-6 py-2 rounded font-semibold ${
            activeTab === "graveyard" ? "bg-green-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-green-100"
          }`}
        >
          কবরস্থানের খরচ
        </button>
      </div>

      {/* Mosque Expense */}
      {activeTab === "mosque" && (
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-green-700 text-center sm:text-left">
              📋 মসজিদের খরচের তালিকা
            </h2>
            <button
              onClick={handlePrintMosque}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
            >
              <FiDownload />
              PDF ডাউনলোড
            </button>
          </div>

          <div className="text-right font-semibold text-gray-700 mb-4">
            মোট খরচ: <span className="text-green-800">৳ {totalMosqueExpense}</span>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <input type="date" value={mosqueFilters.date} onChange={(e) => setMosqueFilters({ ...mosqueFilters, date: e.target.value })} className="border p-2 rounded text-sm" />
            <input type="text" placeholder="ক্যাটাগরি লিখুন" value={mosqueFilters.category} onChange={(e) => setMosqueFilters({ ...mosqueFilters, category: e.target.value })} className="border p-2 rounded text-sm" />
            <input type="number" placeholder="সর্বনিম্ন পরিমাণ" value={mosqueFilters.minAmount} onChange={(e) => setMosqueFilters({ ...mosqueFilters, minAmount: e.target.value })} className="border p-2 rounded text-sm" />
            <input type="number" placeholder="সর্বোচ্চ পরিমাণ" value={mosqueFilters.maxAmount} onChange={(e) => setMosqueFilters({ ...mosqueFilters, maxAmount: e.target.value })} className="border p-2 rounded text-sm" />
          </div>

          <ExpenseTable data={filteredMosqueExpenses} refProp={mosqueRef} />
        </section>
      )}

      {/* Graveyard Expense */}
      {activeTab === "graveyard" && (
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-green-700 text-center sm:text-left">
              📋 কবরস্থানের খরচের তালিকা
            </h2>
            <button
              onClick={handlePrintGraveyard}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
            >
              <FiDownload />
              PDF ডাউনলোড
            </button>
          </div>

          <div className="text-right font-semibold text-gray-700 mb-4">
            মোট খরচ: <span className="text-green-800">৳ {totalGraveyardExpense}</span>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <input type="date" value={graveyardFilters.date} onChange={(e) => setGraveyardFilters({ ...graveyardFilters, date: e.target.value })} className="border p-2 rounded text-sm" />
            <input type="text" placeholder="ক্যাটাগরি লিখুন" value={graveyardFilters.category} onChange={(e) => setGraveyardFilters({ ...graveyardFilters, category: e.target.value })} className="border p-2 rounded text-sm" />
            <input type="number" placeholder="সর্বনিম্ন পরিমাণ" value={graveyardFilters.minAmount} onChange={(e) => setGraveyardFilters({ ...graveyardFilters, minAmount: e.target.value })} className="border p-2 rounded text-sm" />
            <input type="number" placeholder="সর্বোচ্চ পরিমাণ" value={graveyardFilters.maxAmount} onChange={(e) => setGraveyardFilters({ ...graveyardFilters, maxAmount: e.target.value })} className="border p-2 rounded text-sm" />
          </div>

          <ExpenseTable data={filteredGraveyardExpenses} refProp={graveyardRef} />
        </section>
      )}
              {/* Footer */}
        <footer className="mt-20 border-t border-gray-700 pt-10 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} আমাদের মসজিদ ও কবরস্থান | সর্বস্বত্ব সংরক্ষিত</p>
        </footer>
    </div>
  );
}
