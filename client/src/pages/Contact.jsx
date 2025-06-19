import { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhone,
  FaRegCommentDots,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে। আমরা দ্রুত যোগাযোগ করব।");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-[#0f172a] pt-20 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 md:p-12 grid md:grid-cols-2 gap-10">
        {/* Left Side Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-green-700 flex items-center gap-2">
            <FaRegCommentDots /> যোগাযোগ করুন
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            আপনার যেকোনো প্রশ্ন, অনুরোধ, কিংবা পরামর্শ থাকলে নিচের ফর্মের মাধ্যমে
            আমাদের জানাতে পারেন। আমরা দ্রুততম সময়ে উত্তর দেওয়ার চেষ্টা করব।
          </p>

          <div className="space-y-4 text-gray-700 text-sm">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-green-600 mt-1" />
              <p>মসজিদ সড়ক, বারাপুষা, নাগরপুর, টাঙ্গাইল ১৯৩৬</p>
            </div>
            <div className="flex items-start gap-3">
              <FaPhone className="text-green-600 mt-1" />
              <p>+৮৮০ ১২৩৪৫ ৬৭৮৯০</p>
            </div>
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-green-600 mt-1" />
              <p>info@masjidmanagement.org</p>
            </div>
          </div>

          {/* WhatsApp Contact Note */}
          <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg text-green-800 flex items-center gap-3 text-sm">
            <FaWhatsapp className="text-green-600 text-xl" />
            <p>
              যদি ইমেইল মাধ্যমে যোগাযোগ করা সম্ভব না হয়, তবে দয়া করে WhatsApp
              নম্বরে যোগাযোগ করুন:{" "}
              <a
                href="https://wa.me/8801234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                +৮৮০ ১২৩৪৫ ৬৭৮৯০
              </a>
              । আমরা দ্রুত সাড়া দেওয়ার চেষ্টা করব।
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-700 font-semibold flex items-center gap-2">
              <FaUser /> নাম
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="আপনার নাম"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-semibold flex items-center gap-2">
              <FaEnvelope /> ইমেইল
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="আপনার ইমেইল"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-semibold flex items-center gap-2">
              <FaRegCommentDots /> বার্তা
            </label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="আপনার বার্তা লিখুন"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              <FaPaperPlane /> পাঠান
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            আমরা সাধারণত ২৪ ঘণ্টার মধ্যে রিপ্লাই দিয়ে থাকি।
          </p>
        </form>
        
      </div>
      
    </div>
    
  );
}
