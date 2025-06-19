import React, { useState } from "react";

export default function MosqueDonation() {
  const [formData, setFormData] = useState({
    donorName: "",
    amount: "",
    date: "",
    phone: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // এখানে API কল করো, অথবা console.log করো
    console.log("মসজিদ অনুদানের ডাটা:", formData);

    // সাবমিট এর পর ফর্ম ক্লিয়ার করার জন্য
    setFormData({
      donorName: "",
      amount: "",
      date: "",
      phone: "",
      note: "",
    });

    alert("অনুদান সফলভাবে যুক্ত হয়েছে!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-green-700">মসজিদের অনুদান যোগ করুন</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block mb-1 font-semibold" htmlFor="donorName">অনুদানদাতার নাম</label>
          <input
            type="text"
            id="donorName"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="আপনার নাম লিখুন"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="amount">টাকার পরিমাণ</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="৳ টাকা লিখুন"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="date">তারিখ</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="phone">মোবাইল নম্বর</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{11}"
            maxLength="11"
            placeholder="০১xxxxxxxxx"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <small className="text-gray-500">১১ ডিজিটের মোবাইল নম্বর লিখুন</small>
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="note">নোট (ঐচ্ছিক)</label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="অতিরিক্ত তথ্য লিখুন"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200"
        >
          অনুদান জমা দিন
        </button>
      </form>
    </div>
  );
}
