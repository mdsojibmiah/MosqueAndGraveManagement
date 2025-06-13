import { useState, useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";

export default function ExpenseList() {
  // দুই ধরনের খরচ আলাদা আলাদা state এ রাখা
  const [mosqueExpenses, setMosqueExpenses] = useState([
    { id: 1, category: "বিদ্যুৎ বিল", amount: 1500, date: "2025-06-12", note: "মাসিক বিল" },
    { id: 2, category: "সাফাইকর্মীর বেতন", amount: 3000, date: "2025-06-10", note: "জুন মাস" },
  ]);
  const [graveyardExpenses, setGraveyardExpenses] = useState([
    { id: 1, category: "বাঁধাই খরচ", amount: 2500, date: "2025-06-11", note: "কবরসাজানোর খরচ" },
    { id: 2, category: "জলবাহী ব্যয়", amount: 1200, date: "2025-06-09", note: "সাফাইয়ের জন্য" },
  ]);

  // আলাদা ফিল্টার state দুই টার জন্য
  const [mosqueFilters, setMosqueFilters] = useState({
    date: "",
    category: "",
    minAmount: "",
    maxAmount: "",
  });
  const [graveyardFilters, setGraveyardFilters] = useState({
    date: "",
    category: "",
    minAmount: "",
    maxAmount: "",
  });

  // কোন ট্যাব একটিভ দেখাবো সেটার জন্য state
  const [activeTab, setActiveTab] = useState("mosque");

  // আলাদা আলাদা ref PDF জন্য
  const mosqueRef = useRef();
  const graveyardRef = useRef();

  // PDF ডাউনলোড হ্যান্ডলার (ট্যাব অনুযায়ী)
  const handlePrintMosque = useReactToPrint({
    content: () => mosqueRef.current,
    documentTitle: "Mosque Expense Report",
  });
  const handlePrintGraveyard = useReactToPrint({
    content: () => graveyardRef.current,
    documentTitle: "Graveyard Expense Report",
  });

  // ফিল্টার লজিক (প্যারামিটার হিসেবে খরচ আর ফিল্টার নেবে)
  const filterExpenses = (expenses, filters) => {
    return expenses.filter((expense) => {
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
  };

  // ফিল্টারড ডাটা
  const filteredMosqueExpenses = filterExpenses(mosqueExpenses, mosqueFilters);
  const filteredGraveyardExpenses = filterExpenses(graveyardExpenses, graveyardFilters);

  // মোট খরচ
  const totalMosqueExpense = filteredMosqueExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalGraveyardExpense = filteredGraveyardExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // UI

  return (
    <div className="max-w-7xl mx-auto p-4 mt-6 bg-white shadow-md rounded-lg">
      {/* Tab Buttons */}
      <div className="flex justify-center mb-6 gap-6">
        <button
          onClick={() => setActiveTab("mosque")}
          className={`px-6 py-2 rounded font-semibold ${
            activeTab === "mosque"
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-green-100"
          }`}
        >
          মসজিদের খরচ
        </button>
        <button
          onClick={() => setActiveTab("graveyard")}
          className={`px-6 py-2 rounded font-semibold ${
            activeTab === "graveyard"
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-green-100"
          }`}
        >
          কবরস্থানের খরচ
        </button>
      </div>

      {/* Mosque Expense Section */}
      {activeTab === "mosque" && (
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
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
            <input
              type="date"
              value={mosqueFilters.date}
              onChange={(e) =>
                setMosqueFilters({ ...mosqueFilters, date: e.target.value })
              }
              className="border p-2 rounded text-sm"
            />
            <input
              type="text"
              placeholder="ক্যাটাগরি লিখুন"
              value={mosqueFilters.category}
              onChange={(e) =>
                setMosqueFilters({ ...mosqueFilters, category: e.target.value })
              }
              className="border p-2 rounded text-sm"
            />
            <input
              type="number"
              placeholder="সর্বনিম্ন পরিমাণ"
              value={mosqueFilters.minAmount}
              onChange={(e) =>
                setMosqueFilters({ ...mosqueFilters, minAmount: e.target.value })
              }
              className="border p-2 rounded text-sm"
            />
            <input
              type="number"
              placeholder="সর্বোচ্চ পরিমাণ"
              value={mosqueFilters.maxAmount}
              onChange={(e) =>
                setMosqueFilters({ ...mosqueFilters, maxAmount: e.target.value })
              }
              className="border p-2 rounded text-sm"
            />
          </div>

          {/* Table */}
          <div ref={mosqueRef}>
            <div className="w-full flex justify-center">
            <div className="w-full">
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
                  {filteredMosqueExpenses.map((expense, index) => (
                    <tr key={expense.id} className="hover:bg-green-50 text-sm">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{expense.category}</td>
                      <td className="py-2 px-4 border">৳ {expense.amount}</td>
                      <td className="py-2 px-4 border">{expense.date}</td>
                      <td className="py-2 px-4 border">{expense.note}</td>
                    </tr>
                  ))}
                  {filteredMosqueExpenses.length === 0 && (
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
        </section>
      )}

      {/* Graveyard Expense Section */}
      {activeTab === "graveyard" && (
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
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
            <input
              type="date"
              value={graveyardFilters.date}
              onChange={(e) =>
                setGraveyardFilters({ ...graveyardFilters, date: e.target.value })
              }
              className="border p-2 rounded text-sm"
            />
            <input
              type="text"
              placeholder="ক্যাটাগরি লিখুন"
              value={graveyardFilters.category}
              onChange={(e) =>
                setGraveyardFilters({ ...graveyardFilters, category: e.target.value })
              }
              className="border p-2 rounded text-sm"
            />
            <input
              type="number"
              placeholder="সর্বনিম্ন পরিমাণ"
              value={graveyardFilters.minAmount}
              onChange={(e) =>
                setGraveyardFilters({ ...graveyardFilters, minAmount: e.target.value })
              }
              className="border p-2 rounded text-sm"
            />
            <input
              type="number"
              placeholder="সর্বোচ্চ পরিমাণ"
              value={graveyardFilters.maxAmount}
              onChange={(e) =>
                setGraveyardFilters({ ...graveyardFilters, maxAmount: e.target.value })
              }
              className="border p-2 rounded text-sm"
            />
          </div>

          {/* Table */}
          <div ref={graveyardRef}>
            <div className="w-full flex justify-center">
            <div className="w-full">
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
                  {filteredGraveyardExpenses.map((expense, index) => (
                    <tr key={expense.id} className="hover:bg-green-50 text-sm">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{expense.category}</td>
                      <td className="py-2 px-4 border">৳ {expense.amount}</td>
                      <td className="py-2 px-4 border">{expense.date}</td>
                      <td className="py-2 px-4 border">{expense.note}</td>
                    </tr>
                  ))}
                  {filteredGraveyardExpenses.length === 0 && (
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
        </section>
      )}
    </div>
  );
}
