import { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhone,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import members from "../data/committeeMembers.json";

export default function Committee() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full min-h-screen px-4 sm:px-8 md:px-16 py-16 pt-40 space-y-24 bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-[#0f172a] text-white">
      {/* Page Heading */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-500">
          মসজিদ কমিটির সদস্যগণ
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white leading-relaxed">
          এখানে মসজিদ কমিটির গুরুত্বপূর্ণ সদস্যদের পরিচয় ও যোগাযোগের তথ্য দেওয়া হলো।
        </p>
        <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-white">
          আমাদের মসজিদ কমিটি ২০২৫ সাল থেকে সক্রিয়ভাবে মসজিদ পরিচালনা, উন্নয়ন এবং সেবামূলক কাজ করে যাচ্ছে। কমিটির লক্ষ্য হলো ধর্মীয় পরিবেশ বজায় রাখা ও মুসল্লিদের সর্বোচ্চ সুবিধা নিশ্চিত করা।
        </p>
        <input
          type="text"
          placeholder="সদস্যের নাম দিয়ে খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-md bg-[#1e293b] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-full max-w-md mx-auto text-white placeholder:text-gray-300"
        />
      </div>

      {/* Committee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-gradient-to-b from-yellow-50 via-orange-100 to-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-t-4 border-green-600"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-4 object-cover border-4 border-green-500"
              loading="lazy"
            />
            <h2 className="text-xl sm:text-2xl font-semibold text-green-800 mb-1">
              {member.name}
            </h2>
            <p className="text-green-700 font-medium mb-1 text-sm sm:text-base">
              {member.position}
            </p>
            <p className="text-gray-600 text-xs sm:text-sm italic mb-3 leading-snug">
              {member.bio}
            </p>
            <a
              href={`tel:${member.phone}`}
              className="flex items-center gap-2 text-sm text-gray-800 mb-3 hover:text-green-600 transition"
            >
              <FaPhone /> {member.phone}
            </a>

            <div className="flex gap-3 text-green-600 text-lg sm:text-xl">
              <a href={member.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebookF className="hover:text-blue-600" />
              </a>
              <a href={`https://wa.me/88${member.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <FaWhatsapp className="hover:text-green-500" />
              </a>
              <a href={member.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                <FaTwitter className="hover:text-blue-400" />
              </a>
              <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn className="hover:text-blue-700" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Extra Section: Committee Vision */}
      <div className="bg-[#1e293b] rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl text-green-500 font-semibold mb-4">
          আমাদের লক্ষ্য ও উদ্দেশ্য
        </h2>
        <p className="text-white text-base sm:text-lg leading-relaxed">
          আমাদের মসজিদ কমিটি একটি ধর্মীয় ও সমাজসেবামূলক প্রতিষ্ঠান হিসেবে সব সময় মানুষের পাশে থাকার চেষ্টা করে। আমরা মসজিদ, কবরস্থান, মক্তব এবং গরিব-অসহায় মুসল্লিদের সহযোগিতায় কাজ করে যাচ্ছি।
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-700 pt-10 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} আমাদের মসজিদ ও কবরস্থান | সর্বস্বত্ব সংরক্ষিত</p>
      </footer>
    </section>
  );
}