import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

const dummyData = [
  {
    id: 1,
    type: "mosjid",
    category: "বিদ্যুৎ বিল",
    amount: 1200,
    date: "2025-06-10",
    notes: "মাসিক বিল",
  },
  {
    id: 2,
    type: "koborsthan",
    category: "পরিচ্ছন্নতা",
    amount: 800,
    date: "2025-06-12",
    notes: "কাজের লোক",
  },
];

export default function ExpenseList() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredData = dummyData.filter((expense) => {
    const matchesType = typeFilter === "all" || expense.type === typeFilter;
    const matchesDate = dateFilter === "" || expense.date === dateFilter;
    const matchesSearch =
      search === "" ||
      expense.category.toLowerCase().includes(search.toLowerCase()) ||
      expense.notes?.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesDate && matchesSearch;
  });

  return (
    <div className="w-full flex justify-center md:justify-end md:pr-10">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-4 md:p-6 space-y-6">

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-3 items-center">
            <FaFilter className="text-green-700 text-lg" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">সব</option>
              <option value="mosjid">মসজিদ</option>
              <option value="koborsthan">কবরস্থান</option>
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="সার্চ ক্যাটাগরি বা মন্তব্য..."
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-green-700 text-white text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">ধরন</th>
                <th className="p-3">ক্যাটাগরি</th>
                <th className="p-3">পরিমাণ</th>
                <th className="p-3">তারিখ</th>
                <th className="p-3">মন্তব্য</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((exp, i) => (
                  <tr
                    key={exp.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-3 align-top">{i + 1}</td>
                    <td className="p-3 align-top">
                      {exp.type === "mosjid" ? "মসজিদ" : "কবরস্থান"}
                    </td>
                    <td className="p-3 align-top">{exp.category}</td>
                    <td className="p-3 align-top">৳ {exp.amount}</td>
                    <td className="p-3 align-top">{exp.date}</td>
                    <td className="p-3 align-top">{exp.notes || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    কোনো খরচের তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((exp, i) => (
              <div key={exp.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">#{i + 1}</span>
                  <span className="text-green-700 font-semibold">
                    {exp.type === "mosjid" ? "মসজিদ" : "কবরস্থান"}
                  </span>
                </div>
                <div>
                  <p><span className="font-semibold">ক্যাটাগরি:</span> {exp.category}</p>
                  <p><span className="font-semibold">পরিমাণ:</span> ৳ {exp.amount}</p>
                  <p><span className="font-semibold">তারিখ:</span> {exp.date}</p>
                  <p><span className="font-semibold">মন্তব্য:</span> {exp.notes || "-"}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center p-4 text-gray-500">কোনো খরচের তথ্য পাওয়া যায়নি।</p>
          )}
        </div>

      </div>
    </div>
  );
}
