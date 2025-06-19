// src/components/admin/DonationForm.jsx
import { useState } from "react";

const donationTypes = [
  { id: "mosjid", label: "মসজিদ অনুদান" },
  { id: "koborsthan", label: "কবরস্থান অনুদান" },
];

const initialForm = {
  type: "mosjid",
  category: "",
  donorName: "",
  amount: "",
  date: "",
  remarks: "",
};

export default function DonationForm() {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📦 Donation Submitted:", formData);

    alert("✅ অনুদান সফলভাবে সংরক্ষিত হয়েছে!");

    setFormData(initialForm);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          ➕ নতুন অনুদান যুক্ত করুন
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ধরন নির্বাচন */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">অনুদানের ধরন</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
              required
            >
              {donationTypes.map((dt) => (
                <option key={dt.id} value={dt.id}>
                  {dt.label}
                </option>
              ))}
            </select>
          </div>

          {/* ক্যাটাগরি */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">ক্যাটাগরি</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="যেমনঃ ফান্ড, উন্নয়ন, ফিতরা"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* দাতার নাম */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">দাতার নাম</label>
            <input
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              placeholder="দাতার নাম লিখুন"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* পরিমাণ */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">পরিমাণ (৳)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="পরিমাণ লিখুন"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
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
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* মন্তব্য */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold text-gray-700">মন্তব্য (ঐচ্ছিক)</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="প্রয়োজনে কিছু মন্তব্য লিখতে পারেন"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
              rows={3}
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-lg transition duration-300"
            >
              ✅ সংরক্ষণ করুন
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
