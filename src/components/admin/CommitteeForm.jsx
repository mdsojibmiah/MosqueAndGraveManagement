// src/components/admin/CommitteeForm.jsx

import { useState } from "react";
import { FaUserTie } from "react-icons/fa";

export default function CommitteeForm() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("কমিটি মেম্বার ডেটা:", form);
    // TODO: Backend API call করো এখানে
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" p-6 max-w-2xl mx-auto space-y-4"
    >
      {/* নাম */}
      <div>
        <label className="block mb-1 font-semibold">নাম</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="কমিটি মেম্বারের নাম"
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* পদবি */}
      <div>
        <label className="block mb-1 font-semibold">পদবি</label>
        <input
          type="text"
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="যেমনঃ সভাপতি, সম্পাদক"
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* ফোন */}
      <div>
        <label className="block mb-1 font-semibold">মোবাইল নম্বর</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="১১ ডিজিটের মোবাইল নম্বর"
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* ইমেইল */}
      <div>
        <label className="block mb-1 font-semibold">ইমেইল (অপশনাল)</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="example@email.com"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* ঠিকানা */}
      <div>
        <label className="block mb-1 font-semibold">ঠিকানা</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="বর্তমান ঠিকানা লিখুন"
          rows={3}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* সাবমিট */}
      <button
        type="submit"
        className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
      >
        ✅ মেম্বার যুক্ত করুন
      </button>
    </form>
  );
}
