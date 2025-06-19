// src/components/admin/ExpenseForm.jsx
import { useState } from "react";

const initialForm = {
  type: "mosjid",
  category: "",
  amount: "",
  date: "",
  notes: "",
};

export default function ExpenseForm() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🧾 Expense submitted:", form);
    alert("✅ খরচ সফলভাবে যুক্ত হয়েছে!");
    setForm(initialForm);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          ➖ নতুন খরচ যুক্ত করুন
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* খরচের ধরন */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">খরচের ধরন</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="mosjid">মসজিদ</option>
              <option value="koborsthan">কবরস্থান</option>
            </select>
          </div>

          {/* ক্যাটাগরি */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">ক্যাটাগরি</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="যেমনঃ বিদ্যুৎ, পানি, রক্ষণাবেক্ষণ"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* পরিমাণ */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">পরিমাণ (৳)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="টাকার পরিমাণ লিখুন"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-green-500"
              min="1"
              required
            />
          </div>

          {/* তারিখ */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">তারিখ</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* মন্তব্য */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold text-gray-700">মন্তব্য (ঐচ্ছিক)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="প্রয়োজনে কিছু মন্তব্য লিখতে পারেন"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* সাবমিট বাটন */}
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-3 rounded-lg transition duration-300"
            >
              ✅ যুক্ত করুন
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
